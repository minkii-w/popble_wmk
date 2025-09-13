import ReservaionDoComponent from "../reservation/ReservationDoComponent"

const ReserveInfo = () => {
  return (
    <div>
      <h2 className="text-xl font-bold mb-2">예약</h2>
      <p>예약 관련 안내 및 예약 버튼</p>
      <ReservaionDoComponent></ReservaionDoComponent>
      <button className="mt-4 px-6 py-2 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600">
        예약하기
      </button>
    </div>
  );
};

export default ReserveInfo;
