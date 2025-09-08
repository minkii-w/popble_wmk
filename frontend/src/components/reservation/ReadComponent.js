import { useEffect, useState } from "react";
import { getReservation } from "../../api/popupstoreApi";
import ReservationModal from "../reservation/ReservationModal";
import CalendarComponent from "../reservation/CalendarComponent";


const initState = {
    id:0,
    name:'',
    address:'',
    startdate:'',
    enddate:'',
    amtime:['','','',''],
    pmtime:['','','',''],
    maxcount:null,
    desc:'',
    price:0,
    files:[]

}


const ReadComponent = ({id}) => {

    const [popupstore, setPopupstore] = useState(initState)

    const [reservationModal, setReservationModal] = useState(false)

    useEffect( () => {
        getReservation(id).then(data => {
            console.log(data)
            setPopupstore(data)
        })
    },[id])

    return(
        <div className="border-2 border-sky-200mt-10 m-2 p-4">
            <div className="flex flex-wrap mx-auto justify-center p-6">
                <div className="m-auto rounded-md w-60">
                    <div className="row">
                        <div className="text-sm m-1 p-2 w-1/5">id{popupstore.id}</div>
                        <div className="text-sm m-1 p-2 w-1/5">팝업스토어이름{popupstore.name}</div>
                        <div className="text-sm m-1 p-2 w-1/5">주소{popupstore.address}</div>
                        <div className="text-sm m-1 p-2 w-1/5">가격{popupstore.price}</div>
                       
                        

                        <div className="flex justify-end">
                            <div className="relative mb-4 flex p-4 flex-wrap items-stretch">
                                <button 
                                type="button"
                                className="rounder p-4 w-36 bg-blue-300 text-xl text-white"
                                onClick={ () => setReservationModal(true)}>
                                예약하기
                                </button>
                                {reservationModal &&(
                                    <ReservationModal
                                    title='reservation'
                                    content={
                                        <div>
                                            <p>{popupstore.name}예약페이지입니다</p>
                                            <CalendarComponent offDays={[0]}/>
                                        </div> 
                                        }
                                        callbackFn={() => setReservationModal(false)}/>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default ReadComponent;