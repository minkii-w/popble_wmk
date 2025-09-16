import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getReservation } from "../../api/popupstoreApi";
import ReservationDoComponent from "../../components/popup/reservation/ReservationDoComponent"
import { getUserById } from "../../api/userApi";


const API_SERVER_HOST = "http://localhost:8080";
const host = `${API_SERVER_HOST}/api/userProfile`;

const ReservationPage = () => {

  const {id} = useParams();
  const userProfileId = 1;
  
  const initState = {
    id: 0,
    storeName: "",
    address: "",
    startDate: "",
    endDate: "",
    reservationTimes: { am: ["", "", "", ""], pm: ["", "", "", ""] },
    maxCount: null,
    desc: "",
    price: 0,
    uploadFileNames: [],
  };


  const [user, setUser] = useState(null);

  const [popupstore, setPopupstore] = useState(initState);

  //날짜, 시간 선택
  const [selected, setSelected] = useState({ date: null, time: null });



  const handleSelect = ({ date, time, count }) => {
    setSelected({ date, time, count });
  };

  useEffect(() => {

    getReservation(id).then((data) => {
      const am = [];
      const pm = [];
      data.reservationTimes.forEach((rt) => {
        const hour = parseInt(rt.startTime.split(":")[0]);
        if (hour < 12) am.push(rt.startTime);
        else pm.push(rt.startTime);
      });

      setPopupstore({
        ...data,
        reservationTimes: { am, pm },
      });
    });

    console.log("호출URL:", `${host}/${userProfileId}`)
    getUserById(userProfileId).then((userData) => {
      console.log("유저데이터:",userData)
      setUser(userData)
    })
  }, []);

  return (
    <div>
      <h2 className="text-xl font-bold mb-2">예약</h2>
      
        {user&&(
        <ReservationDoComponent
          offDays={[0]}
          reservationTimes={popupstore.reservationTimes || { am: [], pm: [] }}
          onSelect={handleSelect}
          maxCount={popupstore.maxCount}
          price={popupstore.price}
          userProfileId={user?.userProfile.id}
        />
        )}
    </div>
  );
};

export default ReservationPage;
