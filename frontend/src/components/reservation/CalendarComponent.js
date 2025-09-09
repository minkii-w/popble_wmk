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
        if(onSelect) onSelect({date:selectDate,time});
    }

    return (
        <></>
    );

    
 

    

    
    
    

    //둘 다 입력 받지 않을 시 띄울 alert(메세지)
    const handleReservationDo = () => {
        if(!selectDate || !selectTime){
             alert("날짜와 시간을 모두 선택해주세요")
        }
    }

    const handleoptionsTime = (time) => {
        return time.getHours()>6?"text-success":"text-error";
    }

    return(
        <div style={{textAlign:"center"}}>
            <DatePicker
                inline
                showDateSelect
                showTimeSelect
                locale={ko}
                minDate={startDate}
                selected={(selectDate)}
                onChange={(date) => setSelectDate(date)}
                //공휴일
                filterDate={(date) => !isoffDays(date)}
            ></DatePicker>

        <div>
            {selectDate &&(
            <DatePicker
                showTimeSelect
                locale={ko}
                selected={(selectTime)}
                onChange={(time) => setSelectTime(time)}
            ></DatePicker>
            )}
        </div>

            <div className="flex justify-center">
                <div className="text-right font-normal">선택날짜
                <input className="justify-center rounded-r border border-solid"
                value={selectDate.toLocaleDateString()}>
                </input>
                </div>
            </div>
            <div className="flex justify-center">
                <div className="text-right font-normal">선택시간
                    <input className="justify-center rounded-r border border-solid"
                    value={selectTime.toLocaleTimeString()}>
                    </input>
                </div>
            
            </div>

            <button onClick={handleReservationDo} style={{marginTop:"10px"}}>
            </button>
        </div>

    )
}

export default CalendarComponent;