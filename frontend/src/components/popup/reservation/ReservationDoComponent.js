// import { ko } from "date-fns/locale";
// import { useEffect, useMemo, useState } from "react";
// import DatePicker from "react-datepicker";
// import SelectBoxComponent from "../../common/SelectBoxComponent";
// import "react-datepicker/dist/react-datepicker.css";
// import "./Calendar.css";
// import ReservationCheckComponent from "./ReservationCheckComponent";
// import { getReservation } from "../../../api/reservationApi"; 

// const ReservationDoComponent = ({
//   id, 
//   offDays = [],
//   reservationTimes = [],
//   onSelect,
//   maxCount,
//   price,
//   userProfileId,
//   startDate: popupStartDate,
//   endDate: popupEndDate,
// }) => {

//     console.log("reservationCOmponent 렌더링, id : ",id)
  

//   // 선택 상태
//   const [clickNext, setClickNext] = useState(false);
//   const [selectDate, setSelectDate] = useState(null);
//   const [selectTime, setSelectTime] = useState(null);
//   const [count, setCount] = useState(null);
  
//   useEffect(()=>{
//       if(!id)return;
      
//       getReservation(id).then(res => {
//           console.log("API 응답 : ",res.data);
//         })
//         .catch(err => console.error(err))
//     },[id])



//     // 예약 가능 날짜 (오늘부터)
//   const today = new Date();

//   // offDays (휴일)
//   const isoffDays = (date) => offDays.includes(date.getDay());
      
//       // 오전/오후 분리

//       const { amTimes, pmTimes } = useMemo(()=>{

//       const am = [];
//       const pm = [];




//       reservationTimes.forEach((t) => {
//         const hour = parseInt(t.startTime.split(":")[0], 10);
//         if (hour < 12) {
//           am.push(t.startTime);
//         } else {
//           pm.push(t.startTime);
//         }
//       });
//       return {amTimes: am, pmTimes: pm};
//     },[reservationTimes]);



//   // 시간 선택 핸들러
//   const handleClickTime = (time) => {
//     console.log("선택된 시간:", time, "날짜 :",selectDate)
//     setSelectTime(time);
//     if (onSelect) onSelect({ date: selectDate, time, count });
//   };


//   // 인원수 선택 핸들러
//   const handleCountChange = (val) => {
//     setCount(val);
//     if (onSelect) onSelect({ date: selectDate, time: selectTime, count: val });
//   };


//   return !clickNext ? (
//     <div className="flex">
//       <div className="calendar-container">
//         <DatePicker
//           inline
//           locale={ko}
//           minDate={today}
//           selected={selectDate}
//           onChange={(date) => setSelectDate(date)}
//           filterDate={(date) => 
//             !isoffDays(date)&&
//             new Date(popupStartDate) <= date &&
//         date <= new Date(popupEndDate)}
//         />
//       </div>

//       <div className="reservation-info ml-10">
//         {selectDate && (
//           <div className="text-3xl">
//             예약 시간
//             <div style={{ margin: "5px" }}>
//               <div className="text-2xl">오전</div>
//               <div>
//                 {amTimes.length > 0
//                   ? amTimes.map((t, idx) => (
//                       <button
//                         key={idx}
//                         className={`inline-flex items-center px-3 py-1 m-1 border rounded-full mb-5 ${
//                           selectTime === t
//                             ? "bg-primaryColor text-black"
//                             : "bg-subSecondColor text-black"
//                         }`}
//                         onClick={() => handleClickTime(t)}
//                       >
//                         {t.slice(0, 5)}
//                       </button>
//                     ))
//                   : <span>예약 불가</span>}
//               </div>
//             </div>

//             <div style={{ marginTop: "5px" }}>
//               <div className="text-2xl mb-5">오후</div>
//               <div>
//                 {pmTimes.length > 0
//                   ? pmTimes.map((t, idx) => (
//                       <button
//                         key={idx}
//                         className={`inline-flex items-center px-3 py-1 m-1 border rounded-full mb-5 ${
//                           selectTime === t
//                             ? "bg-primaryColor text-black"
//                             : "bg-subSecondColor text-black"
//                         }`}
//                         onClick={() => handleClickTime(t)}
//                       >
//                         {t.slice(0, 5)}
//                       </button>
//                     ))
//                   : <span>예약 불가</span>}
//               </div>
//             </div>
//           </div>
//         )}

//         {selectDate && selectTime && (
//           <div className="text-left font-normal">
//             <div className="relative mb-4 flex w-full flex-wrap items-stretch">
//               <div className="text-xl">
//                 인원수
//                 <SelectBoxComponent
//                   max={maxCount}
//                   value={count}
//                   onChange={handleCountChange}
//                 />
//               </div>
//             </div>

//             {count > 0 && (
//               <div className="text-xl">
//                 <p>총 가격</p>
//                 <div className="inline-flex items-center px-3 py-1 border rounded-full bg-subSecondColor">
//                   {price > 0 ? `${price * count} 원` : "무료"}
//                 </div>
//               </div>
//             )}

//             <div className="flex justify-end">
//               <button
//                 className="mr-5 py-2 w-2/5 bg-primaryColor text-xl rounded"
//                 onClick={() => setClickNext(true)}
//                 disabled={!selectDate || !selectTime || !count}
//               >
//                 다음
//               </button>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   ) : (
//     <ReservationCheckComponent
//       popupStore={{id, maxCount, price}}
//       selected={{ date: selectDate, time: selectTime, count }}
//       userProfileId={userProfileId}
//     />
//   );
// };

// export default ReservationDoComponent;