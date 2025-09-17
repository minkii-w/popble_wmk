import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import { IoIosArrowForward } from "react-icons/io";
import { IoIosClose } from "react-icons/io";
import { useNavigate } from "react-router-dom";

const ReservationSuccessModal = ({popupStore={}, callbackFn}) => {

    const navigate = useNavigate();


    return(
       <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center">
           {/* 전체 모달박스*/}
           <div className="bg-hashTagColor p-1 rounded-lg relative">
            <button
                className="absolute top-5 right-5 text-black hover:text-black text-5xl"
                onClick={() => {
                    //경로다시 설정하기->현재 예약하려던 팝업스토어 상세보기로
                  navigate(`/popup/detail`);
                }}
                ><IoIosClose></IoIosClose>
            </button>
            {/* 안쪽 박스 */}
            <div className="bg-gradient-to-b from-white to-primaryColor rounded-lg p-16 w-[600px] flex flex-col items-center">
            <IoMdCheckmarkCircleOutline className="text-7xl text-black mb-4" />
            <p className="text-4xl font-bold mb-2 text-center">예약이 확정되었습니다!</p>
            <button className="flex items-center mb-4"
            onClick={ () => {
               navigate(`/mypage`)
            }}>내 예약 확인하기 <IoIosArrowForward/>
            </button>
                <div className="border w-[500px] h-32 flex flex-col justify-center items-center bg-white rounded-xl">
                    <p className="text-2xl font-bold">{popupStore?.storeName} 입장 신청</p>
                    <p className="text-subButtonAccentColor text-xl mt-2">..월..일 오후</p>
                </div>
            </div>
        </div>
    </div>
    );
}

export default ReservationSuccessModal;