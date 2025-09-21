// import { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import { getOne } from "../../api/popupstoreApi"; // getOne is likely the intended function
// import { getUserById } from "../../api/userApi"; // getUserById is likely the intended function
// import ReservationDoComponent2 from "../../components/popup/reservation/ReservationDoComponent2";

// const ReservationPage = () => {
//   const { id } = useParams();
  
//   // Use meaningful state variable names
//   const [popupStore, setPopupStore] = useState(null);
//   const [userProfile, setUserProfile] = useState(null);
//   const [loading, setLoading] = useState(true);

//   // A constant for the user's ID
//   const currentUserId = 1; // Assuming a constant for now, should be dynamic

//   useEffect(() => {
//     // If id isn't available, stop the process
//     if (!id) {
//       setLoading(false);
//       return;
//     }

//     const fetchData = async () => {
//       setLoading(true);
//       try {
//         // Fetch popup store data using the imported 'getOne' function
//         const popupStoreData = await getOne(id);
//         setPopupStore(popupStoreData);

//         // Fetch user profile data using the imported 'getUserById' function
//         const userProfileData = await getUserById(currentUserId);
//         setUserProfile(userProfileData);

//       } catch (err) {
//         console.error("데이터 조회 실패:", err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, [id, currentUserId]); // Add currentUserId to dependency array

//   if (loading) return <p>로딩중...</p>;
//   if (!popupStore) return <p>팝업스토어 데이터를 불러올 수 없습니다.</p>;
//   if (!userProfile) return <p>사용자 정보를 불러올 수 없습니다.</p>;

//   return (
//     <div className="p-5">
//       <h2 className="text-2xl font-bold mb-4">{popupStore.storeName} 예약</h2>
//       <ReservationDoComponent2
//         id={id}
//         offDays={[0]}
//         reservationTimes={popupStore.reservationTimes}
//         maxCount={popupStore.maxCount}
//         price={popupStore.price}
//         userProfileId={userProfile?.id} // Correctly passing the user's ID
//       />
//     </div>
//   );
// };

// export default ReservationPage;