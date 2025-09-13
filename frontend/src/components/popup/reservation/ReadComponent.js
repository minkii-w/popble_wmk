import { useEffect, useState } from "react";
import { API_SERVER_HOST, getReservation } from "../../../api/popupstoreApi";
import ReservationModal from "../reservation/ReservationModal";
import CalendarComponent from "../reservation/CalendarComponent";
import useCustomMove from "../../../hooks/useCustomMove";

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

const host = API_SERVER_HOST;

const ReadComponent = ({ id }) => {
  const [popupstore, setPopupstore] = useState(initState);

  const { moveToList, moveToModify } = useCustomMove();

  const [reservationModal, setReservationModal] = useState(false);

  useEffect(() => {
    getReservation(id).then((data) => {
      console.log(data);
      setPopupstore(data);
    });
  }, [id]);

  return (
    <div className="border-2 border-sky-200 mt-10 m-2 ml-2">
      <div className="flex flex-wrap mx-auto p-6">
        <div className="relative mb-4 flex w-full flex-wrap items-stretch">
          <div className="text-sm m-1 p-2 w-1/5">id{popupstore.id}</div>
          <div className="text-sm m-1 p-2 w-1/5">
            팝업스토어이름{popupstore.storeName}
          </div>
          <div className="w-full justify-center flex flex-col m-auto items-center">
            {popupstore.uploadFileNames.map((imgFile, i) => (
              <img
                key={i}
                alt="popupStore"
                className="p-4 w-1/2"
                src={`${host}/api/popup/view/${imgFile}`}
              ></img>
            ))}
          </div>
          <div className="text-sm m-1 p-2 w-1/5">주소{popupstore.address}</div>
          <div className="text-sm m-1 p-2 w-1/5">가격{popupstore.price}</div>

          <div className="flex justify-end">
            <div className="relative mb-4 flex p-4 flex-wrap items-stretch">
              <button
                type="button"
                className="rounder p-4 w-36 bg-blue-300 text-xl text-white"
                onClick={() => setReservationModal(true)}
              >
                예약하기
              </button>
              {reservationModal && (
                <ReservationModal
                  title="reservation"
                  content={
                    <div>
                      <p>{popupstore.name}예약페이지입니다</p>
                      <CalendarComponent offDays={[0]} />
                    </div>
                  }
                  callbackFn={() => setReservationModal(false)}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReadComponent;
