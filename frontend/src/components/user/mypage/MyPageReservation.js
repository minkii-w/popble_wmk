import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { getReservationsByUserProfileId } from "../../../api/userProfileApi";
import { getUserProfileById } from "../../../api/userProfileApi";
import { cancelReservation } from "../../../api/reservationApi";

const MyPageReservation = () => {
  const navigate = useNavigate();

  const userProfileId = 1; // 테스트

  const [reservations, setReservations] = useState([]);
  const [userProfile, setUserProfile] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const [screen, setScreen] = useState({
    name: "MyPageReservation",
    params: null,
  });

  const [modal, setModal] = useState({
    isOpen: false,
    title: "",
    message: "",
    onConfirm: () => setModal({ ...modal, isOpen: false }),
    onCancel: null,
    confirmText: "확인",
  });

  const fetchReservations = useCallback(async () => {
    setIsLoading(true);
    try {
      const reservationItems = await getReservationsByUserProfileId(
        userProfileId
      );
      setReservations(reservationItems);
    } catch (error) {
      console.error("예약 리스트 불러오기 실패", error);
      setModal({
        isOpen: true,
        title: "오류",
        message: "예약 목록을 불러올 수 없습니다.",
        onConfirm: () => setModal({ ...modal, isOpen: false }),
        onCancel: null,
      });
    } finally {
      setIsLoading(false);
    }
  }, [userProfileId]);

  const fetchUserProfile = useCallback(async () => {
    try {
      const profileData = await getUserProfileById(userProfileId);
      console.log("유저 프로필 정보", profileData);
      setUserProfile(profileData);
    } catch (error) {
      console.error("유저 프로필 불러오기 실패", error);
    }
  }, [userProfileId]);

  useEffect(() => {
    if (userProfileId) {
      fetchReservations();
      fetchUserProfile();
    }
  }, [userProfileId, fetchReservations, fetchUserProfile]);

  // 예약 취소 핸들러 함수
  const cancelHandler = (id) => {
    setModal({
      isOpen: true,
      title: "예약 취소 확인",
      message: `예약 번호 ${id}번을 정말로 취소하시겠습니까?`,
      onConfirm: async () => {
        setModal({ ...modal, isOpen: false });
        try {
          await cancelReservation(id);
          setModal({
            isOpen: true,
            title: "취소 완료",
            message: "예약이 성공적으로 취소되었습니다.",
            onConfirm: () => {
              setModal({ ...modal, isOpen: false });
              fetchReservations();
            },
            onCancel: null,
          });
        } catch (error) {
          console.error("예약 취소 실패:", error);
          setModal({
            isOpen: true,
            title: "취소 실패",
            message: "예약 취소에 실패했습니다.",
            onConfirm: () => setModal({ ...modal, isOpen: false }),
            onCancel: null,
          });
        }
      },
      onCancel: () => setModal({ ...modal, isOpen: false }),
      confirmText: "예약 취소",
    });
  };

  //후기 작성 핸들러
  const reviewHandler = async (reservationId, popupStoreId) => {
    navigate(`/popup/review/${reservationId}`, {
      state: { popupStoreId, reservationId },
    });
  };

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
                  onClick={() =>
                    reviewHandler(item.reservationId, item.popupStoreId)
                  }
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
