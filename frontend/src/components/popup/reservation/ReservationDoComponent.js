import { ko } from "date-fns/locale";
import { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import SelectBoxComponent from "../../common/SelectBoxComponent"
import "react-datepicker/dist/react-datepicker.css";
import "./Calendar.css";
import { useParams } from "react-router-dom";
import { getReservation } from "../../../api/popupstoreApi";
import ReservationCheckComponent from "./ReservationCheckComponent";


// const ReservaionDoComponent = ({offDays=[], reservationTimes={am:[], pm:[]}, onSelect, maxCount=10, price=0, userId}) => {
    const ReservaionDoComponent = ({ offDays=[], reservationTimes, onSelect, maxCount, price, userProfileId }) => {

    const {id} = useParams();
    

    const initState = {
    id:0,
    storeName:'',
    address:'',
    startDate:'',
    endDate:'',
    reservationTimes:{am:[],pm:[]},
    maxCount:null,
    desc:'',
    price:0,
    uploadFileNames:[]
    }
    
    //다음버튼 누르면 화면이동
    const [clickNext, setClickNext] = useState(false);

    const [popupStore, setPopupStore] = useState(initState)

    // const [selected, setSelected] = useState({date:null, time:null})
    const [selected, setSelected] = useState({ date: null, time: null, count: null });

    //예약이 가능한 날짜 (현재날짜)
    const [startDate] = useState(new Date());
    
    //이용자가 선택하는 날짜
    const [selectDate, setSelectDate] = useState(null);
    
    //날짜 선택 후 시간선택옵션
    const [selectTime, setSelectTime] = useState("");
    
    //입장인원옵션
    const [count, setCount] = useState(null)
    
    //오전,오후 시간
    const {am=[],pm=[]} = popupStore.reservationTimes;

    const handleSelect = ({date, time, count}) => {
        setSelected({date, time, count})
    }
    
    
    //offDays 공통 휴무일(ex>매주 토요일휴무) 
    //[0] - 일요일
    //[1~5] - 월~금요일
    //[6] - 토요일
    const isoffDays = (date) => offDays.includes(date.getDay());

    const handleClickNext = () => {
        setClickNext(true);
    }



    useEffect( () => {

         if (!id) return;

    getReservation(id).then(data => {
        console.log("응답데이터", data);

        // 전체 시간 배열을 그대로 저장
        const reservationTimesRaw = data.reservationTimes || [];

        // 초기 선택 날짜 없으면 전체 시간 처리
        const am = [];
        const pm = [];

        // 날짜 선택이 있으면 필터링
        reservationTimesRaw.forEach(rt => {
                    const hour = parseInt(rt.startTime.split(":")[0], 10);
                    if (hour < 12) am.push(rt.startTime);
                    else pm.push(rt.startTime);
                });
        setPopupStore({
            ...data,
            reservationTimesRaw,
            reservationTimes: { am, pm }
        });
    });
}, [id]);

    const handleClickTime = (time) => {
        setSelectTime(time);
        if(onSelect) onSelect({date:selectDate,time,count})
    };

    const handleCountChange = (val) => {
        setCount(val)
        if(onSelect) onSelect({date:selectDate,time:selectTime,count:val})
    }

    //-------------------------------------------------------------------------------

    return !clickNext?(

        
        //달력표시
        <div className="flex">
        <div className="calendar-container">
            <DatePicker
                inline
                locale={ko}
                minDate={startDate}
                selected={selectDate}
                onChange={(date) => setSelectDate(date)}
                //공휴일
                filterDate={(date) => !isoffDays(date)}
            ></DatePicker>
            </div>
        
        

    {/*----------------선택 날짜,시간 띄우기 ---------------*/}
        <div className="reservation-info ml-10">
            {/*시간표시*/}
            {selectDate &&(
                <div className="text-3xl">예약 시간
                <div style={{margin:"5px"}}>
                    <div className="text-2xl">오전</div>
                    <div>
                        {am.length>0?(
                        am.map((t,idx)=>(
                            <button
                            key={idx}
                            className={`inline-flex items-center px-3 py-1 m-1 border rounded-full mb-5 ${selectTime===t?"bg-primaryColor text-black":"bg-subSecondColor text-black"}`}
                            onClick={()=>handleClickTime(t)}>
                                {t.slice(0,5)}
                            </button> 
                            ))
                        ):<span>예약 불가</span>
                        }
                </div>
                </div>

                <div style={{marginTop:"5px"}}>
                    <div className="text-2xl mb-5">오후</div>
                    <div>
                    {pm.length>0?(
                        pm.map((t, idx)=>(
                            <button
                            key={idx}
                            className={`inline-flex items-center px-3 py-1 m-1 border rounded-full mb-5 ${selectTime===t?"bg-primaryColor text-black":"bg-subSecondColor text-black"}`}
                            onClick={()=>handleClickTime(t)}>
                                {t.slice(0,5)}
                            </button>
                        ))
                    ):<span>예약 불가</span>
                    }
                </div>
                </div>
            </div>
            )}
            {/* ------------날짜, 시간을 선택해야 인원수 선택 가능------------------- */}
            {selectDate&&selectTime !== null &&!clickNext&&(
                
                    <div className="text-left font-normal">
                            <div className="relative mb-4 flex w-full flex-wrap items-stretch">
                                <div className="text-xl">인원수
                                    <SelectBoxComponent 
                                    max={popupStore.maxCount || 10}
                                    value={count}
                                    onChange={handleCountChange}/>
                                </div>
                            </div>
                        {count > 0 && (
                            <div className="text-xl">
                            <p>총 가격</p>
                            <div className="inline-flex items-center px-3 py-1 border rounded-full bg-subSecondColor">
                               {popupStore.price > 0 ? `${popupStore.price*count} 원`:'무  료'}
                                </div>
                            </div>
                        )}
                        <div className="flex justify-end"> 
                <button
                className="mr-5 py-2 w-2/5 bg-primaryColor text-xl rounded"
                onClick={ () => setClickNext(true)}>다음</button>
            </div>
            </div>
                    )}
                    </div>
                    </div>
                ):(
                    
                    <ReservationCheckComponent
                    popupStore={popupStore}
                    selected={{date:selectDate, time:selectTime, count}}
                    userProfileId={userProfileId}/>
        
        )
}

export default ReservaionDoComponent;