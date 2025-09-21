import { useEffect, useState } from "react";
import ReservationSuccessModal from "./ReservationSuccessModal";
import TossPayment from "./TossPayment";
import LoadingComponent from "../../common/LoadingComponent";
import axios from "axios";
import { getRemaining } from "../../../api/reservationApi"; 

// props를 명확하게 받습니다. onBack prop 추가
const ReservationCheckComponent = ({ popupStore, selected, userProfileId, onBack }) => {
  const [userName, setUserName] = useState("우민경");
  const [phonenumber, setPhonenumber] = useState("010-1111-1111");
  const [reservationId, setReservationId] = useState(null);

  const [showLoadingPayment, setShowLoadingPayment] = useState(false);
  const [showPayment, setShowPayment] = useState(false);
  const [tossCompleted, setTossCompleted] = useState(false);

  const [editMode, setEditMode] = useState(false);
  const [editedName, setEditedName] = useState("");
  const [editedPhone, setEditedPhone] = useState("");

  const [remainingSeats, setRemainingSeats] = useState(null);
  const [isBookingAvailable, setIsBookingAvailable] = useState(false);

  const fetchRemainingSeats = async () => {
    if (!selected.date || !selected.time) {
      setRemainingSeats(null);
      setIsBookingAvailable(false);
      return;
    }

    try {
      const formattedDate = selected.date instanceof Date 
                          ? selected.date.toISOString().split("T")[0] 
                          : selected.date;
      const formattedTime = selected.time.padStart(5, "0");

      const data = await getRemaining(
        popupStore.id,
        formattedDate,
        formattedTime,
        formattedTime 
      );
      setRemainingSeats(data);
    } catch (error) {
      console.error("잔여 인원 조회 실패:", error);
      setRemainingSeats(0);
    }
  };

  useEffect(() => {
    fetchRemainingSeats();
  }, [selected.date, selected.time, popupStore.id]);

  useEffect(() => {
    if (remainingSeats !== null && selected.count) {
      setIsBookingAvailable(selected.count <= remainingSeats);
    } else {
      setIsBookingAvailable(false);
    }
  }, [remainingSeats, selected.count]);


  const formatPhone = (value) => {
    const digits = value.replace(/\D/g, "");
    if (digits.length < 4) return digits;
    if (digits.length < 8) return `${digits.slice(0, 3)}-${digits.slice(3)}`;
    return `${digits.slice(0, 3)}-${digits.slice(3, 7)}-${digits.slice(7, 11)}`;
  };

  const handleReservation = async () => {
    if (!selected.date || !selected.time || !selected.count) {
      alert("날짜, 시간, 인원을 모두 선택해주세요.");
      return;
    }
    
    if (remainingSeats === null) {
      alert("잔여 인원 정보를 불러오는 중입니다. 잠시 후 다시 시도해주세요.");
      return;
    }
    if (selected.count > remainingSeats) {
      alert(`예약 가능한 인원은 ${remainingSeats}명입니다. 인원수를 다시 확인해주세요.`);
      return;
    }
    if (selected.count <= 0) {
      alert("예약 인원은 최소 1명 이상이어야 합니다.");
      return;
    }

    try {
      setShowLoadingPayment(true);
      setTimeout(() => {
        setShowLoadingPayment(false);
        setShowPayment(true);
      }, 200);
    } catch (err) {
      console.error(err);
      alert("예약 준비 중 오류가 발생했습니다: " + err.message);
    }
  };

  const handleTossComplete = async () => {
    try {
      const payload = {
          popupStoreId: popupStore.id,
          userProfileId,
          userName, 
          phonenumber: phonenumber.replace(/\D/g, ""),
          reservationCount: Number(selected.count),
          reservationDate: selected.date instanceof Date 
                          ? selected.date.toISOString().split("T")[0] 
                          : selected.date,
          startTime: selected.time.padStart(5, "0"),
          endTime: selected.time.padStart(5, "0"),
      };
      
      const res = await axios.post("http://localhost:8080/api/popup/reservation", payload); 
      setReservationId(res.data.id);

      setShowPayment(false);
      setShowLoadingPayment(false);
      setTossCompleted(true);
      
    } catch (err) {
      console.error("예약 확정 중 오류 발생:", err);
      alert("예약 확정 중 오류가 발생했습니다. 고객센터에 문의해주세요.");
      setShowPayment(false);
      setShowLoadingPayment(false);
      setTossCompleted(false);
      // onBack 함수를 호출하여 이전 페이지로 돌아갑니다.
      onBack();
    }
  };

  const handleTossFail = () => {
    alert("결제 실패! 예약 화면으로 돌아갑니다.");
    setShowPayment(false);
    setShowLoadingPayment(false);
    setReservationId(null);
    setTossCompleted(false);
    // onBack 함수를 호출하여 이전 페이지로 돌아갑니다.
    onBack();
  };

  return (
    <div>
      {showLoadingPayment && <LoadingComponent />}
      {showPayment && !tossCompleted && (
        <TossPayment
          price={popupStore.price * selected.count}
          ordername={popupStore.storeName}
          onSuccess={handleTossComplete}
          onFail={handleTossFail}
        />
      )}
      {tossCompleted && (
        <ReservationSuccessModal
          popupStore={popupStore}
          reservationDate={selected.date}
          reservationTime={selected.time}
        />
      )}

      {!showPayment && !showLoadingPayment && !tossCompleted && (
        <div className="flex flex-col items-center">
          <div className="mt-10 mb-10 w-4/5 border rounded-2xl border-gray-200 p-4">
            <div className="text-sm">id: {popupStore.id}</div>
            <div className="text-3xl">{popupStore.storeName}</div>
            <div className="text-xl mt-2">
              <span>일정</span>
              <span style={{ marginLeft: "30px" }}>
                {selected.date?.toLocaleDateString()}
              </span>
            </div>
            <div className="text-xl mt-2">
              <span>인원</span>
              <span style={{ marginLeft: "30px" }}>{selected.count}</span>
              {remainingSeats !== null && (
                <span className="ml-4 text-gray-500 text-base">
                  (잔여: {remainingSeats}명)
                </span>
              )}
            </div>
            <div className="text-xl mt-2">
              <span>가격</span>
              <span style={{ marginLeft: "30px" }}>
                {popupStore.price > 0
                  ? `${popupStore.price * selected.count}원`
                  : "무료"}
              </span>
            </div>
          </div>

          <div className="w-4/5 border rounded-2xl border-gray-200 p-4">
            <div className="flex items-center justify-between mb-4">
              <div className="text-3xl">예약자 정보</div>
              {!editMode && (
                <button
                  className="border border-gray-300 rounded px-3 bg-backgroundColor"
                  onClick={() => {
                    setEditedName(userName);
                    setEditedPhone(phonenumber.replace(/\D/g, ""));
                    setEditMode(true);
                  }}
                >
                  변경
                </button>
              )}
            </div>

            {!editMode ? (
              <>
                <div className="text-2xl mb-2">이름: {userName}</div>
                <div className="text-2xl mb-2">
                  연락처: {formatPhone(phonenumber)}
                </div>
              </>
            ) : (
              <>
                <div className="mb-2">
                  <label className="block text-xl">이름</label>
                  <input
                    type="text"
                    value={editedName}
                    onChange={(e) => setEditedName(e.target.value)}
                    className="border p-1 rounded w-full"
                  />
                </div>
                <div className="mb-2">
                  <label className="block text-xl">연락처</label>
                  <input
                    type="text"
                    value={formatPhone(editedPhone)}
                    onChange={(e) =>
                      setEditedPhone(e.target.value.replace(/\D/g, ""))
                    }
                    className="border p-1 rounded w-full"
                  />
                </div>
                <div className="flex gap-2">
                  <button
                    className="border rounded px-3 bg-green-200"
                    onClick={async () => {
                      try {
                        const res = await axios.patch(
                          `http://localhost:8080/api/userProfile/${userProfileId}`,
                          {
                            name: editedName,
                            phonenumber: editedPhone,
                          }
                        );
                        setUserName(res.data.name);
                        setPhonenumber(res.data.phonenumber);
                        setEditMode(false);
                      } catch (err) {
                        console.error(err);
                        alert("변경에 실패했습니다");
                      }
                    }}
                  >
                    저장
                  </button>
                  <button
                    className="border rounded px-3 bg-red-200"
                    onClick={() => setEditMode(false)}
                  >
                    취소
                  </button>
                </div>
              </>
            )}
          </div>

          <div className="flex justify-between w-4/5 mt-4 gap-4">
            <button
              className="border border-gray-300 rounded p-2 w-1/5 bg-backgroundColor text-xl text-black"
              onClick={onBack}
            >
              이전
            </button>
            <button
              className={`rounded p-2 w-4/5 text-xl text-black 
                ${!selected.date || !selected.time || selected.count === 0 || remainingSeats === null || !isBookingAvailable
                  ? "bg-gray-400 cursor-not-allowed" 
                  : "bg-primaryColor hover:bg-primaryColor-dark" 
                }`}
              onClick={handleReservation}
              disabled={
                !selected.date ||
                !selected.time ||
                selected.count === 0 ||
                remainingSeats === null || 
                !isBookingAvailable
              }
            >
              예약하기
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ReservationCheckComponent;