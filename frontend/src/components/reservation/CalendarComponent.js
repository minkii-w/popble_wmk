import { ko } from "date-fns/locale";
import { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";



//offDays 공통 휴무일(ex>매주 토요일휴무) 
//[0] - 일요일
//[1~5] - 월~금요일
//[6] - 토요일
const CalendarComponent = ({offDays=[], reservationTimes={am:[], pm:[]}, onSelect}) => {
    
    //예약이 가능한 날짜 (현재날짜)
    const [startDate] = useState(new Date());

    //이용자가 선택하는 날짜
    const [selectDate, setSelectDate] = useState(new Date());
    
    //날짜 선택 후 시간선택옵션
    const [selectTime, setSelectTime] = useState("");
    
    const isoffDays = (date) => offDays.includes(date.getDay());

    useEffect( () => {
        setSelectTime("");
    },[selectDate]);

    const handleClickTime = (time) => {
        setSelectTime(time);
        if(onSelect) onSelect({date:selectDate,time})
    };

    return (
        //달력표시
        <div style={{textAlign:"center"}}>
            <DatePicker
                inline
                locale={ko}
                minDate={startDate}
                selected={(selectDate)}
                onChange={(date) => setSelectDate(date)}
                //공휴일
                filterDate={(date) => !isoffDays(date)}
            ></DatePicker>
            {/*시간표시*/}
            {selectDate &&(
            <div style={{margin:"10px"}}>
                <div>오전
                    {reservationTimes.am.length>0?(
                        reservationTimes.am.map((t,idx)=>(
                            <button
                            key={idx}
                            className={`m-1 p-1 border rounded ${selectTime===t?"bg-blue-300 text-white":""}`}
                            onClick={()=>handleClickTime(t)}>
                                {t}
                            </button> 
                            ))
                        ):(
                            <span>예약 불가</span>
                        )}
                </div>
                <div style={{marginTop:"5px"}}>
                    <div>오후</div>
                    {reservationTimes.pm.length>0?(
                        reservationTimes.pm.map((t, idx)=>(
                            <button
                            key={idx}
                            className={`m-1 p-1 border rounded ${selectTime===t?"bg-blue-300 text-white":""}`}
                            onClick={()=>handleClickTime(t)}>
                                {t}
                            </button>
                        ))
                    ):(
                        <span>예약 불가</span>
                    )}
                </div>
            </div>
            )}
            {/*선택 날짜,시간 띄우기 */}
            {selectDate && selectTime &&(
                <div className="flex justify-center">
                    <div className="text-right font-normal">
                        <p>선택날짜:{selectDate.toLocaleDateString()}</p>
                        <p>선택시간:{selectTime}</p>
                    </div>
                </div>
            )}
        </div>
        )
}

export default CalendarComponent;