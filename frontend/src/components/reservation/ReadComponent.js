import { useEffect, useState } from "react";
import { API_SERVER_HOST, getReservation, postReservation } from "../../api/popupstoreApi";
import ReservaionDoComponent from "./ReservationDoComponent";
import { useNavigate } from "react-router-dom";


const initState = {
    id:0,
    storeName:'',
    address:'',
    startDate:'',
    endDate:'',
    reservationTimes:{am:['','','',''],pm:['','','','']},
    maxCount:null,
    desc:'',
    price:0,
    uploadFileNames:[]
}

const host = API_SERVER_HOST

const ReadComponent = ({id}) => {

    const navigate = useNavigate();

    const [popupstore, setPopupstore] = useState(initState)

    //날짜, 시간 선택
    const [selected, setSelected] = useState({date:null, time:null})

    //결과확인모달
    const [fetching, setFetching] = useState(false)


    const handleSelect = ({date, time, count}) => {
        setSelected({date, time, count})
    }

    const handleReservation = async () => {
        if(!selected.date || !selected.time){
            alert("날짜와 시간을 선택해주세요")
            return;
        }
        setFetching(true)
        try{
            const payload = {
                popupstoreId: popupstore.id,
                date: selected.date.toISOString().split('T')[0],
                time: selected.time
            }
            await postReservation(payload)
            alert("예약성공")
            setReservationModal(false)
        }catch(err){
            console.error(err)
            alert("예약실패")
        }finally{
            setFetching(false)
        }
    }

    useEffect( () => {
        console.log("reservation id :",id)

        getReservation(id).then(data => {

            const am = [];
            const pm = [];
            data.reservationTimes.forEach(rt => {
                const hour = parseInt(rt.startTime.split(":")[0])
                if(hour<12)am.push(rt.startTime)
                    else pm.push(rt.startTime)
            })

            console.log(data)
            setPopupstore({
                ...data,
                reservationTimes:{am,pm}
            })
        })
    },[id])

    return(
        <div>
            <div className="flex justify-center">
                <div className="mt-10 mb-10 w-4/5 border rounded-2xl border-gray-200">
                    <div className="text-sm m-1 p-2">id{popupstore.id}</div>
                    <div className="text-3xl m-1 p-2">{popupstore.storeName}</div>
                    {/* ------------사진가져오기----------- */}
                    {/* <div className="w-full justify-center flex flex-col m-auto items-center">
                    {popupstore.uploadFileNames.map((imgFile,i)=>
                    <img
                    key={i}
                    alt="popupStore"
                    className="p-4 w-1/2"
                    src={`${host}/api/popup/view/${imgFile}`}></img>
                    )}
                    </div> */}
                    <div className="text-xl p-2 w-1/5 m-5">일정&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{popupstore.startDate}</div>
                    <div className="text-xl p-2 w-1/5 m-5">인원&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{popupstore.maxCount}</div>
                    <div className="text-xl p-2 w-1/5 m-5">가격&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;

                    {/* -----------------------------가격 수정하기 -> 예약된 가격으로 */}
                    {popupstore.price > 0 ? `${popupstore.price*popupstore.maxCount}원`:'무 료'}</div>
                </div>
            </div>

            {/* --------------------------------예약된 정보의 데이터로 수정하기 */}

            <div className="justify-left">
                <div className="text-3xl m-3">예약자 정보</div><br/>
                <div className="text-2xl m-5">예약자 이름</div>
                <div className="flex items-center justify-between w-full p-2">
                    <span>연락처</span>
                    <button
                    type="button"
                    className="border border-gray-300 rounded px-3 mr-10 bg-backgroundColor">변경</button>
                </div>     
            </div>

                {/*-----------이전, 확인 버튼--------------*/}
                <div className="flex justify-between gap-10">
                        <button 
                        type="button"
                        className="border border-gray-300 rounded p-2 w-1/5 bg-backgroundColor text-xl text-black"
                        onClick={()=>navigate(-1)}>이 전
                        </button>

                        <button 
                        type="button"
                        className="rounded p-2 w-4/5 bg-primaryColor text-xl text-black"
                        onClick={ () => setReservationModal(true)}>
                        예약하기
                        </button>
                               
                        <div>
                            <ReservaionDoComponent
                            offDays={[0]}
                            reservationTimes={popupstore.reservationTimes || {am:[],pm:[]}}
                            onSelect={handleSelect}
                            maxCount={popupstore.maxCount}
                            price={popupstore.price}/>

                            <div className="flex justify-end"> 
                            <button
                            onClick={handleReservation}
                            className="py-2 w-2/5 bg-primaryColor text-xl rounded">다음</button>
                            </div>
                        </div>
                </div>
        </div>
                   
                        
                   

    )
}

export default ReadComponent;