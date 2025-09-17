// import { ko } from "date-fns/locale";
// import { useEffect, useState } from "react";
// import DatePicker from "react-datepicker";
// import "react-datepicker/dist/react-datepicker.css";
// import SelectBoxComponent from "../common/SelectBoxComponent";
// import "./Calendar.css";


// //ReservationOptionComponent 로 이름변경해야함
// const CalendarComponent = ({offDays=[], reservationTimes={am:[], pm:[]}, onSelect, maxCount=10, price=0}) => {
    
//     //예약이 가능한 날짜 (현재날짜)
//     const [startDate] = useState(new Date());
    
//     //이용자가 선택하는 날짜
//     const [selectDate, setSelectDate] = useState(null);
    
//     //날짜 선택 후 시간선택옵션
//     const [selectTime, setSelectTime] = useState("");
    
//     //입장인원옵션
//     const [count, setCount] = useState(null)
    
//     //오전,오후 시간
//     const {am=[],pm=[]} = reservationTimes;
    
    
//     //offDays 공통 휴무일(ex>매주 토요일휴무) 
//     //[0] - 일요일
//     //[1~5] - 월~금요일
//     //[6] - 토요일
//     const isoffDays = (date) => offDays.includes(date.getDay());



//     useEffect( () => {
//         setSelectTime("")
//         setCount(null)
//     },[selectDate]);

//     const handleClickTime = (time) => {
//         setSelectTime(time);
//         if(onSelect) onSelect({date:selectDate,time,count})
//     };

//     const handleCountChange = (val) => {
//         setCount(val)
//         if(onSelect) onSelect({date:selectDate,time:selectTime, count:val})
//     }

//     //-------------------------------------------------------------------------------

//     return (
//         //달력표시
//         <div className="calendar-container">
//         <div style={{textAlign:"center"}}>
//             <DatePicker
//                 inline
//                 locale={ko}
//                 minDate={startDate}
//                 selected={selectDate}
//                 onChange={(date) => setSelectDate(date)}
//                 //공휴일
//                 filterDate={(date) => !isoffDays(date)}
//             ></DatePicker>
//         </div>
        

//     {/*----------------선택 날짜,시간 띄우기 ---------------*/}
//         <div className="reservation-info">
//             {/*시간표시*/}
//             {selectDate &&(
//                 <div className="text-xl">예약 시간
//                 <div style={{margin:"5px"}}>
//                     <div>오전</div>
//                     <div>
//                         {am.length>0?(
//                         am.map((t,idx)=>(
//                             <button
//                             key={idx}
//                             className={`inline-flex items-center px-3 py-1 m-1 border rounded-full ${selectTime===t?"bg-primaryColor text-black":"bg-subSecondColor text-black"}`}
//                             onClick={()=>handleClickTime(t)}>
//                                 {t}
//                             </button> 
//                             ))
//                         ):(
//                             <span>예약 불가</span>
//                         )}
//                 </div>
//                 </div>
//                 <div style={{marginTop:"5px"}}>
//                     <div>오후</div>
//                     <div>
//                     {pm.length>0?(
//                         pm.map((t, idx)=>(
//                             <button
//                             key={idx}
//                             className={`inline-flex items-center px-3 py-1 m-1 border rounded-full ${selectTime===t?"bg-primaryColor text-black":"bg-subSecondColor text-black"}`}
//                             onClick={()=>handleClickTime(t)}>
//                                 {t}
//                             </button>
//                         ))
//                     ):(
//                         <span>예약 불가</span>
//                     )}
//                 </div>
//                 </div>
//             </div>
//             )}
//             {selectDate && selectTime &&(
                
//                     <div className="text-left font-normal">
//                             <div className="relative mb-4 flex w-full flex-wrap items-stretch">
//                                 <div className="text-xl">인원수
//                                     <SelectBoxComponent 
//                                     max={maxCount}
//                                     value={count}
//                                     onChange={handleCountChange}/>
//                                 </div>
//                             </div>
//                         {count && (
//                             <div className="text-xl">
//                             <p>총 가격</p>
//                             <div className="inline-flex items-center px-3 py-1 border rounded-full bg-subSecondColor">
//                                {price > 0 ? `${price*count}원`:'무  료'}
//                                 </div>
//                             </div>
//                         )}
//                     </div>
                
//             )}
//         </div>
//         </div>
        
        
//         )
// }

// export default CalendarComponent;