

import { useState, useEffect } from "react";

import { useNavigate } from "react-router-dom";
import { postReservation } from "../../../api/popupstoreApi"; 
import ReservationSuccessModal from "./ReservationSuccessModal";
import TossPayment from "../reservation/TossPayment";
import axios from "axios";

const ReservationCheckComponent = ({popupStore, selected, userProfileId}) => {
    console.log("reservationCheckComponenet userProfileID: ", userProfileId)
    console.log("popupstore :", popupStore)
    console.log("selected :", selected)
    
    const [userName, setUserName] = useState("");

    const [phonenumber, setPhonenumber] = useState("");

    const [success, setSuccess] = useState(false)

    // 토스로 넘길 예약성공 데이터 id
    const [reservationId, setReservationId] = useState(null);
    
    

    const totalPrice = Number(popupStore?.price)* Number(selected.count)

    const navigate = useNavigate();


    useEffect( () => {
        if(!userProfileId) return;
        console.log("useEffect 실행됨, userID:", userProfileId)
        axios.get(`http://localhost:8080/api/userProfile/${userProfileId}`)
        .then(res => {
            console.log("유저프로필데이터:",res.data)
            const userData = res.data;
            setUserName(userData.username)
            setPhonenumber(userData.phonenumber)
        })
        .catch(err=> {
            console.error("유저정보가져오기실패", err)
        })
    },[userProfileId])



    const handleReservationSuccess = async() => {
        console.log("select확인 :", selected)

        if(!selected.date || !selected.time || !selected.count){

            console.log(selected.date, selected.time, selected.count)

            alert("날짜, 시간, 인원을 모두 선택해 주세요.")
            return;
        }
        try{
            const dateStr = selected.date.toISOString().split('T')[0]; 
            const timeStr = selected.time.padStart(5,'0');
            const reservationTime = `${dateStr}T${timeStr}`;

            // 임의로 넣은 데이터 수정할것
            const payload ={
            popupStoreId:popupStore.id,
            userProfileId:userProfileId,
            userName: userName,
            phonenumber:phonenumber,
            reservationCount: Number(selected.count),
            reservationTime: reservationTime
        }
        console.log("팝업스토어id타입확인: ",typeof popupStore.id, popupStore.id)
        console.log("userProfileID타입확인 :", typeof userProfileId, userProfileId)
        console.log("전송할 payload :" , JSON.stringify(payload, null, 2))

        const res = await postReservation(payload);
        setReservationId(res.id);
        setSuccess(true);

    }catch(err){
        console.error(err);
        alert("예약실패 : " + err.message);
    }
}

    return(
        <div className="border-2 border-sky-200 mt-10 m-2 p-4">
            {success && <ReservationSuccessModal popupStoreId={popupStore}/>}
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
                    {popupStore?.price > 0 ? `${popupStore.price*selected.count}원`:'무 료'}</div>
                </div>
            </div>

            {/* --------------------------------예약된 정보의 데이터로 수정하기 */}

            <div className="justify-left">
                <div className="text-3xl m-3">예약자 정보</div><br/>
                <div className="text-2xl m-5">예약자 이름{userName}</div>
                <div className="flex items-center justify-between w-full p-2">
                    <span>연락처{phonenumber}</span>
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