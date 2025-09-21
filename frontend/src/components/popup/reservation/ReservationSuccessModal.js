import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import { IoIosArrowForward, IoIosClose } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { format, parseISO, isDate } from "date-fns";
import { ko } from "date-fns/locale";

const ReservationSuccessModal = ({ popupStore = {}, reservationDate, reservationTime }) => {
  const navigate = useNavigate();

  // 시간을 오전/오후 + 12시간으로 안전하게 포맷
  const formatReservationTime = (timeString) => {
    if (!timeString || typeof timeString !== "string") return "";
    const [hours, minutes] = timeString.split(":").map(Number);
    if (isNaN(hours) || isNaN(minutes)) return "";
    const date = new Date();
    date.setHours(hours, minutes, 0, 0);
    return format(date, "aa hh:mm",{locale: ko}); // ex: 오전 10:30, 오후 02:30
  };

  // 날짜 안전 포맷
  const formatReservationDate = (dateValue) => {
    if (!dateValue) return "";
    const dateObj = isDate(dateValue) ? dateValue : parseISO(dateValue);
    return format(dateObj, "M월 d일", {locale:ko}); // ex: 9월 20일
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center">
      <div className="bg-hashTagColor p-1 rounded-lg relative">
        <button
          className="absolute top-5 right-5 text-black hover:text-black text-5xl"
          onClick={() => navigate(`/popup/detail`)}
        >
          <IoIosClose />
        </button>

        <div className="bg-gradient-to-b from-white to-primaryColor rounded-lg p-16 w-[600px] flex flex-col items-center">
          <IoMdCheckmarkCircleOutline className="text-7xl text-black mb-4" />
          <p className="text-4xl font-bold mb-2 text-center">
            예약이 확정되었습니다!
          </p>
          <button
            className="flex items-center mb-4"
            onClick={() => navigate(`/user/mypage/reservation`)}
          >
            내 예약 확인하기 <IoIosArrowForward />
          </button>

          <div className="border w-[500px] h-32 flex flex-col justify-center items-center bg-white rounded-xl">
            <p className="text-2xl font-bold">{popupStore?.storeName} 입장 신청</p>
            <p className="text-subButtonAccentColor text-xl mt-2">
              {formatReservationDate(reservationDate)}{" "}
              {formatReservationTime(reservationTime)}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReservationSuccessModal;