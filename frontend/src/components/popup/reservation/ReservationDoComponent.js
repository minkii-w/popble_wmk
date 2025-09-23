
import { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { ko } from "date-fns/locale";
import { SelectBoxComponent } from "../../common/SelectBoxComponent";
import "./Calendar.css";
import { getAvailableTimesByDate } from "../../../api/reservationApi";


const ReservationDoComponent = ({ popupStore, selected, setSelected, onNext }) => {
    const [amTimes, setAmTimes] = useState([]);
    const [pmTimes, setPmTimes] = useState([]);
    const [isTimesLoading, setIsTimesLoading] = useState(false); 

    const isOffDays = (date) => (popupStore.offDays || []).includes(date.getDay());

    useEffect(() => {
        if (!popupStore || !selected.date) {
            setAmTimes([]);
            setPmTimes([]);
            return;
        }

        setIsTimesLoading(true);

        const fetchAvailableTimes = async () => {
            try {
                const formattedDate = selected.date.toISOString().slice(0, 10);

                const times = await getAvailableTimesByDate(popupStore.id, formattedDate)

                const am = [];
                const pm = [];

                times.forEach((t) => {
                    const hour = parseInt(t.startTime.split(":")[0], 10);
                    if (hour < 12) {
                        am.push(t);
                    } else {
                        pm.push(t);
                    }
                });

                setAmTimes(am);
                setPmTimes(pm);

            } catch (error) {
                console.error("Failed to fetch available times:", error);
                setAmTimes([]);
                setPmTimes([]);
            } finally {
                setIsTimesLoading(false); 
            }
        };

        fetchAvailableTimes();
    }, [popupStore.id, selected.date]); 



    return (
        <div className="flex">
            <div className="calendar-container">
                <DatePicker
                    inline
                    locale={ko}
                    selected={selected.date}
                    onChange={(date) => {
                        setSelected(prev => ({ ...prev, date, time: null, count: 0 }));
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
                        
                        {isTimesLoading ? (
                            <p>시간 정보 불러오는 중...</p>
                        ) : (
                            <>
                                <div className="text-2xl mb-2">오전</div>
                                <div>
                                    {amTimes.length > 0
                                        ? amTimes.map((t) => (
                                              <button
                                                  key={t.id}
                                                  className={`inline-flex items-center px-3 py-1 m-1 border rounded-full ${
                                                      selected.time && selected.time.id === t.id ? "bg-primaryColor text-white" : "bg-subSecondColor"
                                                  } ${t.remainingSeats <= 0 ? "opacity-50 cursor-not-allowed" : ""}`}
                                                  onClick={() => setSelected(prev => ({ ...prev, time: t }))}
                                                  disabled={t.remainingSeats <= 0}
                                              >
                                                  {`${t.startTime.slice(0, 5)} - ${t.endTime.slice(0, 5)} (${t.remainingSeats}석)`}
                                              </button>
                                          ))
                                        : <p>오전 예약 불가</p>}
                                </div>
                                <div className="text-2xl mt-4 mb-2">오후</div>
                                <div>
                                    {pmTimes.length > 0
                                        ? pmTimes.map((t) => (
                                              <button
                                                  key={t.id}
                                                  className={`inline-flex items-center px-3 py-1 m-1 border rounded-full ${
                                                      selected.time && selected.time.id === t.id ? "bg-primaryColor text-white" : "bg-subSecondColor"
                                                  } ${t.remainingSeats <= 0 ? "opacity-50 cursor-not-allowed" : ""}`}
                                                  onClick={() => setSelected(prev => ({ ...prev, time: t }))}
                                                  disabled={t.remainingSeats <= 0}
                                              >
                                                  {`${t.startTime.slice(0, 5)} - ${t.endTime.slice(0, 5)} (${t.remainingSeats}석)`}
                                              </button>
                                          ))
                                        : <p>오후 예약 불가</p>}
                                </div>
                            </>
                        )}
                        
                        {/* 선택시간에 자리가 있을때 슬롯 생성시작 */}
                        {selected.time && (
                            <>
                                <div className="text-xl mt-4">
                                    인원수
                                    <SelectBoxComponent max={selected.time.maxCount} value={selected.count} onChange={(val) => setSelected(prev => ({ ...prev, count: val }))} />
                                </div>
                                <div className="text-xl mt-2">
                                    총 가격: {popupStore.price > 0 ? `${popupStore.price * selected.count} 원` : "무료"}
                                </div>
                                <div className="flex justify-end mt-4">
                                    <button
                                        className="py-2 px-4 bg-primaryColor text-xl rounded text-white"
                                        onClick={onNext}
                                        disabled={!selected.date || !selected.time || selected.count === 0}
                                    >
                                        다음
                                    </button>
                                </div>
                            </>
                        )}
                    </>
                )}
            </div>
        </div>
    );
};

export default ReservationDoComponent;