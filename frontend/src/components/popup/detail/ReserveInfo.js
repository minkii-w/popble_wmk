
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getOne } from "../../../api/popupstoreApi";
import { getUserById } from "../../../api/userApi";
import ReservationDoComponent from "../reservation/ReservationDoComponent";
import ReservationCheckComponent from "../../popup/reservation/ReservationCheckComponent"

const ReserveInfo = () => {

const {id} = useParams;

  const currentUserId = 1;

  const [popupStore, setPopupStore] = useState(null);
  const [userProfile, setUserProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  
  const [selected, setSelected] = useState({
    date: null,
    time: null,
    count: 0
  });

  const [showCheckPage, setShowCheckPage] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const popupStoreData = await getOne(id);
        setPopupStore(popupStoreData);

        const userProfileData = await getUserById(currentUserId);
        setUserProfile(userProfileData);
      } catch (err) {
        console.error("데이터 조회 실패:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id, currentUserId]); 

  if (loading) return <p>로딩중...</p>;
  if (!popupStore || !userProfile) {
    return <p>필요한 데이터를 불러올 수 없습니다.</p>;
  }

  const handleNextClick = () => {
    setShowCheckPage(true);
  };

  const handleBackClick = () => {
    setShowCheckPage(false);
  };

  if (showCheckPage) {
    return (
      <ReservationCheckComponent
        popupStore={popupStore}
        selected={selected}
        userProfileId={userProfile.id}
        onBack={handleBackClick}
      />
    );
  }

  return (
    <div className="flex justify-center min-h-screen p-5">
      <div className="w-full max-w-2xl">
        <ReservationDoComponent
          popupStore={popupStore}
          selected={selected}
          setSelected={setSelected}
          onNext={handleNextClick}
        />
      </div>
    </div>
  );
};

export default ReserveInfo;