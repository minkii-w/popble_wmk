import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import { IoIosArrowForward } from "react-icons/io";

const ReservationSuccessModal = ({popupstore}) => {


    return(
          <div className="flex justify-center">
            <div><IoMdCheckmarkCircleOutline></IoMdCheckmarkCircleOutline></div>
            <p>예약이 확정되었습니다</p>
            <div className="text-sm">내 예약 확인하기<IoIosArrowForward></IoIosArrowForward></div>
            <div className="relative mb-4 flex w-full flex-wrap items-stretch">
                <div>{`${popupstore.storeName}입장 신청`}</div>
                <div></div>
            </div>
        </div>
    );
}

export default ReservationSuccessModal;