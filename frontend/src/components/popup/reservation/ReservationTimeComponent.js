import { useState, useEffect } from 'react';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { ko } from "date-fns/locale";
import { registerTimeSlots } from '../../../api/reservationApi';

const getDatesInRange = (startDate, endDate) => {
    const dates = [];
    let currentDate = new Date(startDate);
    while (currentDate <= endDate) {
        dates.push(new Date(currentDate));
        currentDate.setDate(currentDate.getDate() + 1);
    }
    return dates;
};

const initialTimeSlot = {
    startTime: '',
    endTime: '',
    maxCount: 0,
};

const ReservationTimeComponent = ({ popupStoreIdFromParent, onSuccess }) => {
    const [popupStoreId, setPopupStoreId] = useState(popupStoreIdFromParent || '');
    const [timeSlots, setTimeSlots] = useState([initialTimeSlot]);
    const [message, setMessage] = useState('');

    // 날짜 범위 선택을 위한 상태
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(null);

    useEffect(() => {
        if (popupStoreIdFromParent) {
            setPopupStoreId(popupStoreIdFromParent);
        }
    }, [popupStoreIdFromParent]);

    const handleAddSlot = () => {
        setTimeSlots([...timeSlots, { ...initialTimeSlot }]);
    };

    const handleChangeSlot = (index, field, value) => {
        const newTimeSlots = [...timeSlots];
        newTimeSlots[index][field] = value;
        setTimeSlots(newTimeSlots);
    };

    const handleRemoveSlot = (index) => {
        const newTimeSlots = timeSlots.filter((_, i) => i !== index);
        setTimeSlots(newTimeSlots);
    };

    //달력에서 날짜다중선택
    const handleRangeChange = (dates) => {
        const [start, end] = dates;
        setStartDate(start);
        setEndDate(end);
    };
    
    const handleSubmit = async () => {
        if (!popupStoreId || !startDate || !endDate || timeSlots.length === 0) {
            setMessage('팝업스토어 ID, 날짜 범위, 최소 하나의 시간 슬롯을 입력하기');
            return;
        }

        // 선택된 날짜 범위의 모든 날짜 가져오기
        const selectedDates = getDatesInRange(startDate, endDate);
        
        const formattedTimeSlots = [];
        
        selectedDates.forEach(date => {
            const formattedDate = date.toISOString().slice(0, 10);
            timeSlots.forEach(slot => {
                formattedTimeSlots.push({
                    ...slot,
                    date: formattedDate,
                    popupStoreId: Number(popupStoreId),
                });
            });
        });

        try {
            await registerTimeSlots(formattedTimeSlots);
            setMessage('시간 슬롯 등록 성공');
            setStartDate(new Date());
            setEndDate(null);
            setTimeSlots([initialTimeSlot]);
            if (onSuccess) {
                onSuccess();
            }
        } catch (error) {
            setMessage('시간 슬롯 등록 실패)');
            console.error('Error:', error);
        }
    };

    return (
        <div className="container mx-auto p-4 max-w-2xl">
            <h2 className="text-2xl font-bold mb-4">예약 시간 일괄 등록</h2>
            
            <div className="bg-gray-100 p-6 rounded-lg shadow-md mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                    팝업스토어 ID
                </label>
                <input
                    type="number"
                    value={popupStoreId}
                    onChange={(e) => setPopupStoreId(e.target.value)}
                    className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="예: 1"
                />
            </div>
            
            <div className="bg-white p-4 rounded-lg shadow-md mb-4">
                <h3 className="text-xl font-semibold mb-2">1. 날짜 범위 선택</h3>
                <DatePicker
                    selected={startDate}
                    onChange={handleRangeChange}
                    startDate={startDate}
                    endDate={endDate}
                    selectsRange
                    inline
                    locale={ko}
                    dateFormat="yyyy-MM-dd"
                />
            </div>

            <div className="bg-white p-4 rounded-lg shadow-md mb-4">
                <h3 className="text-xl font-semibold mb-2">2. 공통 시간표 설정</h3>
                <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium text-gray-700">시간 슬롯</span>
                    <button
                        onClick={handleAddSlot}
                        className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition duration-300"
                    >
                        + 시간 추가
                    </button>
                </div>
                {timeSlots.map((slot, index) => (
                    <div key={index} className="flex gap-2 items-center mb-2">
                        <input
                            type="time"
                            value={slot.startTime}
                            onChange={(e) => handleChangeSlot(index, 'startTime', e.target.value)}
                            className="w-1/4 px-2 py-1 border rounded-md"
                        />
                        <input
                            type="time"
                            value={slot.endTime}
                            onChange={(e) => handleChangeSlot(index, 'endTime', e.target.value)}
                            className="w-1/4 px-2 py-1 border rounded-md"
                        />
                        <input
                            type="number"
                            value={slot.maxCount}
                            onChange={(e) => handleChangeSlot(index, 'maxCount', Number(e.target.value))}
                            className="w-1/4 px-2 py-1 border rounded-md"
                            placeholder="최대 인원"
                        />
                        <button
                            onClick={() => handleRemoveSlot(index)}
                            className="bg-red-500 text-white px-3 py-1 rounded-md"
                        >
                            -
                        </button>
                    </div>
                ))}
            </div>

            <div className="mt-6">
                <button
                    onClick={handleSubmit}
                    className="w-full bg-blue-500 text-white font-bold py-3 rounded-md hover:bg-blue-600 transition duration-300"
                >
                    등록하기
                </button>
            </div>

            {message && (
                <div className="mt-4 p-4 text-center text-sm font-semibold text-gray-700 bg-yellow-100 rounded-md">
                    {message}
                </div>
            )}
        </div>
    );
};

export default ReservationTimeComponent;