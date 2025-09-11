import { Link } from "react-router-dom";

//Todo : 예약이 있으면 불러오고 예약이 없으면 불러오지 말아야함
const MyPageReservation = ({ ...item }) => {
  return (
    <div
      className="realative flex-row flex-0 shirink p-4 m-5  rounded-3xl
      bg-white border-subFirstColor border-2 w-[420px] h-[260px]"
    >
      {/* 예약정보 */}

      <div className="text-sm">
        <div className="font-semibold mb-2">
          예약 번호 {item.reservationNumber}
        </div>
        {/* 줄 */}
        <hr className="border-2 border-secondaryColor mb-3"></hr>
        {/* 팝업정보 */}
        <Link to={`/popup/reservation/${item.id}`}>
          <div className="mb-2 text-gray-600">
            <span>팝업명 | </span>
            {item.popupId?.storeName}
          </div>
          <div className="mb-2 text-gray-600">
            <span>장소 | </span>
            {item.address}
          </div>
          <div className="mb-2 text-gray-600">
            <span>일시 | </span>
            {item.reservationDate} {item.reservationTime}
          </div>
          <div className="mb-2 text-gray-600">
            <span>인원수 | </span>
            {item.maxCount}
          </div>
          <div className="mb-2 text-gray-600">
            <span>가격 | </span>
            {item.amount}
          </div>
        </Link>
      </div>

      {/* 예약 정보 끝 */}
      {/* 버튼시작 */}
      <div className="flex flex-row justify-end items-end space-x-3">
        <button
          className="py-1 px-2 m-1 rounded-2xl shadow-md border-gray-400 border-2 text-sm"
          // Todo: 할수 있으면 길찾기로 연결
          onClick={() => {}}
        >
          길찾기
        </button>
        <button
          className="py-1 px-2 m-1 rounded-2xl shadow-md border-gray-400 border-2 text-sm bg-subButtonAccentColor"
          // Todo: 예약 취소로 연결
          onClick={() => {}}
        >
          예약취소
        </button>
        <button
          className="py-1 px-2 m-1 rounded-2xl shadow-md border-gray-400 border-2 text-sm bg-primaryColor"
          // Todo:reviewboard로 연결
          onClick={() => {}}
        >
          후기작성
        </button>
      </div>
      {/* 버튼 끝 */}
    </div>
  );
};

export default MyPageReservation;
