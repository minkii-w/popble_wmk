

import { useState, useEffect } from "react";

import { useNavigate } from "react-router-dom";
import { postReservation } from "../../../api/popupstoreApi"; 
import ReservationSuccessModal from "./ReservationSuccessModal";
import TossPayment from "../reservation/TossPayment";

const ReservationCheckComponent = ({popupStore, selected}) => {
    
    const [userName, setUserName] = useState("");

    const [phonenumber, setPhonenumber] = useState("");

    const [success, setSuccess] = useState(false)

    // 토스로 넘길 예약성공 데이터 id
    const [reservationId, setReservationId] = useState(null);
    
    

    const totalPrice = Number(popupStore.price)* Number(selected.count)

    const navigate = useNavigate();



    const handleReservationSuccess = async() => {
        console.log("select확인 :", selected)

        if(!selected.date || !selected.time || !selected.count){

            console.log(selected.date, selected.time, selected.count)

            alert("날짜, 시간, 인원을 모두 선택해 주세요.")
            return;
        }
        try{

            // 임의로 넣은 데이터 수정할것
            const payload ={
            popupStoreId:popupStore?.id,
            userId:1,
            userName: userName || "우민경",
            phonenumber:phonenumber || "010-1111-1111",
            reservationCount: selected?.count,
            reservationTime: selected?.time?selected.time.slice(0,5) :"12:00"
        }

        console.log("전송할 payload :" , JSON.stringify(payload, null, 2))

        const res = await postReservation(payload);
        setReservationId(res.id);
        setSuccess(true);

    }catch(err){
        console.error(err);
        alert("예약실패 : " + err.message);
    }
}

useEffect (() => {
    if(success){
        console.log("토스위젯준비완료",totalPrice)
    }
},[success,totalPrice])

    return(
        <div className="border-2 border-sky-200 mt-10 m-2 p-4">
            {success && <ReservationSuccessModal popupStore={popupStore}/>}
            <div className="flex justify-center">
                <div className="mt-10 mb-10 w-4/5 border rounded-2xl border-gray-200">
                    <div className="text-sm m-1 p-2">id{popupStore.id}</div>
                    <div className="text-3xl m-1 p-2">{popupStore.storeName}</div>
                    {/* ------------사진가져오기----------- */}
                    {/* <div className="w-full justify-center flex flex-col m-auto items-center">
                    {popupstore.uploadFileNames.map((imgFile,i)=>
                    <img
                    key={i}
                    alt="popupStore"
                    className="p-4 w-1/2"
                    src={`${host}/api/popup/view/${imgFile}`}></img>
                    )}
                    </div> */}
                    <div className="text-xl p-2 w-1/5 m-5">일정&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{selected.date?.toLocaleDateString()}</div>
                    <div className="text-xl p-2 w-1/5 m-5">인원&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{selected.count}</div>
                    <div className="text-xl p-2 w-1/5 m-5">가격&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    {popupStore.price > 0 ? `${popupStore.price*selected.count}원`:'무 료'}</div>
                </div>
            </div>

            {/* --------------------------------예약된 정보의 데이터로 수정하기 */}

            <div className="justify-left">
                <div className="text-3xl m-3">예약자 정보</div><br/>
                <div className="text-2xl m-5">예약자 이름{userName || "우민경"}</div>
                <div className="flex items-center justify-between w-full p-2">
                    <span>연락처{phonenumber || "010-1111-1111"}</span>
                    <button
                    type="button"
                    className="border border-gray-300 rounded px-3 mr-10 bg-backgroundColor">
                    변경</button>
                </div>     
            </div>

                {/*-----------이전, 확인 버튼--------------*/}
                <div className="flex justify-between gap-10">
                        <button 
                        type="button"
                        className="border border-gray-300 rounded p-2 w-1/5 bg-backgroundColor text-xl text-black"
                        onClick={()=>navigate(-1)}>이 전
                        </button>

                        {!success?(
                            <button 
                            type="button"
                            className="rounded p-2 w-4/5 bg-primaryColor text-xl text-black"
                            onClick={handleReservationSuccess}>
                        예약하기
                        </button>

                        ):(
                            //예약 성공하면 토스 위젯 띄우기
                            <div className="w-full mt-4">
                                <TossPayment
                                price = {Number(popupStore.price)*Number(selected.count)}
                                ordername={popupStore.storeName}></TossPayment>
                            </div>
                        )}
                </div>
        </div>

    );
}

export default ReservationCheckComponent;