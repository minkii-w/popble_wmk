// import { useEffect, useState } from "react";
// import { FcCalendar } from "react-icons/fc";
// import { Link } from "react-router-dom";
// import { getReservation } from "../../../api/popupstoreApi";

// //Todo : 예약이 있으면 불러오고 예약이 없으면 불러오지 말아야함
// const MyPageReservation = ({ userId }) => {
//   const [reservations, setReservations] = useState([]);

//   useEffect(() => {
//     const fetchReservation = async () => {
//       try {
//         const data = await getReservation(userId);
//         const reservationItems = Array.isArray(data)
//           ? data
//           : data.content || [];
//         console.log("예약 리스트", reservationItems);
//         setReservations(reservationItems);
//       } catch (error) {
//         console.error(
//           "예약 리스트 불러오기 실패",
//           error.response?.status,
//           error.response?.data || error.message
//         );
//       }
//     };
//     fetchReservation();
//   }, [userId]);
//   return (
//     <div className="flex flex-col w-[700px]">
//       {/* 헤더 */}
//       <div className="text-2xl flex flex-row items-center mb-4">
//         <FcCalendar size={25} className="m-2" />
//         <p className="m-2 text-2xl">예약내역 확인/취소</p>
//       </div>
//       <hr className="border-subSecondColor border-2 m-4"></hr>

//       {/* 예약 카드 시작*/}
//       <div className="flex flex-row overflow-x-auto space-x-4 p-2">
//         {reservations.length > 0 ? (
//           reservations.map((item) => (
//             <div
//               key={item.id}
//               className="flex flex-row shrink-0 p-4 m-5  rounded-3xl
//       bg-white border-subFirstColor border-2 w-[420px] h-[260px]"
//             >
//               {/* 예약정보 */}
//               <div className="text-sm">
//                 <div className="font-semibold mb-2">
//                   예약 번호 {item.reservationNumber}
//                 </div>
//                 {/* 줄 */}
//                 <hr className="border-2 border-secondaryColor mb-3"></hr>
//                 {/* 팝업정보 */}
//                 <Link to={`/popup/reservation/${item.id}`}>
//                   <div className="mb-2 text-gray-600">
//                     <span>팝업명 | </span>
//                     {item.popupId?.storeName}
//                   </div>
//                   <div className="mb-2 text-gray-600">
//                     <span>장소 | </span>
//                     {item.address}
//                   </div>
//                   <div className="mb-2 text-gray-600">
//                     <span>일시 | </span>
//                     {item.reservationDate} {item.reservationTime}
//                   </div>
//                   <div className="mb-2 text-gray-600">
//                     <span>인원수 | </span>
//                     {item.maxCount}
//                   </div>
//                   <div className="mb-2 text-gray-600">
//                     <span>가격 | </span>
//                     {item.amount}
//                   </div>
//                 </Link>
//               </div>
//               {/* 예약 정보 끝 */}
//               {/* 버튼시작 */}
//               <div className="flex flex-row justify-end items-end space-x-3">
//                 <button
//                   className="py-1 px-2 m-1 rounded-2xl shadow-md border-gray-400 border-2 text-sm"
//                   // Todo: 할수 있으면 길찾기로 연결
//                   onClick={() => {}}
//                 >
//                   길찾기
//                 </button>
//                 <button
//                   className="py-1 px-2 m-1 rounded-2xl shadow-md border-gray-400 border-2 text-sm bg-subButtonAccentColor"
//                   // Todo: 예약 취소로 연결
//                   onClick={() => {}}
//                 >
//                   예약취소
//                 </button>
//                 <button
//                   className="py-1 px-2 m-1 rounded-2xl shadow-md border-gray-400 border-2 text-sm bg-primaryColor"
//                   // Todo:reviewboard로 연결
//                   onClick={() => {}}
//                 >
//                   후기작성
//                 </button>
//               </div>
//               {/* 버튼 끝 */}
//             </div>
//           ))
//         ) : (
//           <div className="flex items-center justify-center h-full">
//             <p className="text-2xl font-semibold">예약 리스트가 없습니다.</p>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default MyPageReservation;


import { useEffect, useState } from "react";
import { FcCalendar } from "react-icons/fc";
import { Link } from "react-router-dom";
import { getReservationsByUserProfileId } from "../../../api/userProfileApi2";
import { getUserProfileById } from "../../../api/userProfileApi2";
import { cancelReservation } from "../../../api/reservationApi"; // Import the cancel API function

const MyPageReservation = () => {
    const userProfileId = 1; // 테스트

    const [reservations, setReservations] = useState([]);
    const [userProfile, setUserProfile] = useState(null);

    const fetchReservations = async () => {
        try {
            const reservationItems = await getReservationsByUserProfileId(userProfileId);
            console.log("예약 리스트", reservationItems);
            setReservations(reservationItems);
        } catch (error) {
            console.error(
                "예약 리스트 불러오기 실패",
                error.response?.status,
                error.response?.data || error.message
            );
        }
    };

    const fetchUserProfile = async () => {
        try {
            const profileData = await getUserProfileById(userProfileId);
            console.log("유저 프로필 정보", profileData);
            setUserProfile(profileData);
        } catch (error) {
            console.error(
                "유저 프로필 불러오기 실패",
                error.response?.status,
                error.response?.data || error.message
            );
        }
    };

    // 예약 취소 핸들러 함수
    const cancelHandler = async (id) => {
        if (window.confirm("정말로 예약을 취소하시겠습니까?")) {
            try {
                // API 호출
                await cancelReservation(id);
                alert("예약이 성공적으로 취소되었습니다.");
                // 예약 목록을 새로고침
                fetchReservations();
            } catch (error) {
                console.error(
                    "예약 취소 실패",
                    error.response?.status,
                    error.response?.data || error.message
                );
                alert("예약 취소에 실패했습니다.");
            }
        }
    };

    useEffect(() => {
        console.log("userProfileId:", userProfileId);
        if (userProfileId) {
            fetchReservations();
            fetchUserProfile();
        }
    }, [userProfileId]);

    return (
        <div className="flex flex-col w-[700px]">
            <div className="flex flex-row overflow-x-auto space-x-4 p-2">
                {reservations.length > 0 ? (
                    reservations.map((item) => (
                        <div
                            key={item.reservationId} // Changed key to a more specific ID
                            className="flex flex-row shrink-0 p-4 m-5 rounded-3xl bg-white border-subFirstColor border-2 w-[420px] h-[260px]"
                        >
                            {/* 예약정보 */}
                            <div className="text-sm">
                                <div className="font-semibold mb-2">
                                    예약 번호 {item.reservationId}
                                </div>
                                {/* 줄 */}
                                <hr className="border-2 border-secondaryColor mb-3"></hr>
                                {/* 팝업정보 */}
                                <Link to={`/popup/reservation/${item.popupStoreId}`}>
                                    <div className="mb-2 text-gray-600">
                                        <span>팝업명 | </span>
                                        {item.popupStoreName}
                                    </div>
                                    <div className="mb-2 text-gray-600">
                                        <span>장소 | </span>
                                        {item.address}
                                    </div>
                                    <div className="mb-2 text-gray-600">
                                        <span>일시 | </span>
                                        {item.reservationDate} {item.startTime}
                                    </div>
                                    <div className="mb-2 text-gray-600">
                                        <span>인원수 | </span>
                                        {item.reservationCount}
                                    </div>
                                    <div className="mb-2 text-gray-600">
                                        <span>가격 | </span>
                                        {item.price}
                                    </div>
                                </Link>
                            </div>
                            {/* 예약 정보 끝 */}
                            {/* 버튼시작 */}
                            <div className="flex flex-row justify-end items-end space-x-3">
                                <button
                                    className="py-1 px-2 m-1 rounded-2xl shadow-md border-gray-400 border-2 text-sm"
                                    onClick={() => {}}
                                >
                                    길찾기
                                </button>
                                <button
                                    className="py-1 px-2 m-1 rounded-2xl shadow-md border-gray-400 border-2 text-sm bg-subButtonAccentColor"
                                    onClick={() => cancelHandler(item.reservationId)} // Modified onClick handler
                                >
                                    예약취소
                                </button>
                                <button
                                    className="py-1 px-2 m-1 rounded-2xl shadow-md border-gray-400 border-2 text-sm bg-primaryColor"
                                    onClick={() => {}}
                                >
                                    후기작성
                                </button>
                            </div>
                            {/* 버튼 끝 */}
                        </div>
                    ))
                ) : (
                    <div className="flex items-center justify-center h-full">
                        <p className="text-2xl font-semibold">예약 리스트가 없습니다.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default MyPageReservation;