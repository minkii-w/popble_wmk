import { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { ko } from "date-fns/locale";
import SelectBoxComponent from "../../common/SelectBoxComponent";
import "./Calendar.css";

// props를 명확하게 받습니다.
const ReservationDoComponent2 = ({ popupStore, selected, setSelected, onNext }) => {
  const [amTimes, setAmTimes] = useState([]);
  const [pmTimes, setPmTimes] = useState([]);
  const [isDataLoaded, setIsDataLoaded] = useState(false);

  const isOffDays = (date) => (popupStore.offDays || []).includes(date.getDay());

  useEffect(() => {
    if (!popupStore) return;

    const filteredTimes = popupStore.reservationTimes || [];
    const am = [];
    const pm = [];
    filteredTimes.forEach((t) => {
      const hour = parseInt(t.startTime.split(":")[0], 10);
      if (hour < 12) am.push(t.startTime);
      else pm.push(t.startTime);
    });

    setAmTimes(am);
    setPmTimes(pm);
    setIsDataLoaded(true);
  }, [popupStore]);

  if (!isDataLoaded) return <p>로딩중...</p>;

  return (
    <div className="flex">
      <div className="calendar-container">
        <DatePicker
          inline
          locale={ko}
          selected={selected.date}
          onChange={(date) => {
            setSelected(prev => ({ ...prev, date, time: null }));
          }}
          minDate={popupStore.startDate ? new Date(popupStore.startDate) : null}
          maxDate={popupStore.endDate ? new Date(popupStore.endDate) : null}
          dateFormat="yyyy-MM-dd"
          filterDate={(date) =>
            !isOffDays(date) &&
            popupStore.startDate &&
            popupStore.endDate &&
            new Date(popupStore.startDate) <= date &&
            date <= new Date(popupStore.endDate)
          }
        />
      </div>

      <div className="reservation-info ml-10">
        {selected.date && (
          <>
            <div className="text-3xl mb-4">예약 시간</div>
            <div className="text-2xl mb-2">오전</div>
            <div>
              {amTimes.length > 0
                ? amTimes.map((t, idx) => (
                    <button
                      key={idx}
                      className={`inline-flex items-center px-3 py-1 m-1 border rounded-full ${
                        selected.time === t ? "bg-primaryColor" : "bg-subSecondColor"
                      }`}
                      onClick={() => setSelected(prev => ({ ...prev, time: t }))}
                    >
                      {t.slice(0, 5)}
                    </button>
                  ))
                : "예약 불가"}
            </div>

            <div className="text-2xl mt-4 mb-2">오후</div>
            <div>
              {pmTimes.length > 0
                ? pmTimes.map((t, idx) => (
                    <button
                      key={idx}
                      className={`inline-flex items-center px-3 py-1 m-1 border rounded-full ${
                        selected.time === t ? "bg-primaryColor" : "bg-subSecondColor"
                      }`}
                      onClick={() => setSelected(prev => ({ ...prev, time: t }))}
                    >
                      {t.slice(0, 5)}
                    </button>
                  ))
                : "예약 불가"}
            </div>

            {popupStore.maxCount > 0 && (
              <div className="text-xl mt-4">
                인원수
                <SelectBoxComponent max={popupStore.maxCount} value={selected.count} onChange={(val) => setSelected(prev => ({ ...prev, count: val }))} />
              </div>
            )}

            {selected.count > 0 && (
              <div className="text-xl mt-2">
                총 가격: {popupStore.price > 0 ? `${popupStore.price * selected.count} 원` : "무료"}
              </div>
            )}

            <div className="flex justify-end mt-4">
              <button
                className="py-2 px-4 bg-primaryColor text-xl rounded"
                onClick={onNext}
                disabled={!selected.date || !selected.time || selected.count === 0}
              >
                다음
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ReservationDoComponent2;