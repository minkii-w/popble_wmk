import { useEffect, useState } from "react";
import { API_SERVER_HOST, getReservation, postReservation } from "../../api/popupstoreApi";
import ReservationModal from "../reservation/ReservationModal";
import CalendarComponent from "../reservation/CalendarComponent";


const initState = {
    id:0,
    storeName:'',
    address:'',
    startDate:'',
    endDate:'',
    reservationTimes:{am:['','','',''],pm:['','','','']},
    maxCount:null,
    desc:'',
    price:0,
    uploadFileNames:[]

}

const host = API_SERVER_HOST

const ReadComponent = ({id}) => {

    const [popupstore, setPopupstore] = useState(initState)

    const [reservationModal, setReservationModal] = useState(false)

    //날짜, 시간 선택
    const [selected, setSelected] = useState({date:null, time:null})

    //결과확인모달
    const [fetching, setFetching] = useState(false)


    const handleSelect = ({date, time, count}) => {
        setSelected({date, time, count})
    }

    const handleReservation = async () => {
        if(!selected.date || !selected.time){
            alert("날짜와 시간을 선택해주세요")
            return;
        }
        setFetching(true)
        try{
            const payload = {
                popupstoreId: popupstore.id,
                date: selected.date.toISOString().split('T')[0],
                time: selected.time
            }
            await postReservation(payload)
            alert("예약성공")
            setReservationModal(false)
        }catch(err){
            console.error(err)
            alert("예약실패")
        }finally{
            setFetching(false)
        }
    }

    useEffect( () => {
        console.log("reservation id :",id)

        getReservation(id).then(data => {

            const am = [];
            const pm = [];
            data.reservationTimes.forEach(rt => {
                const hour = parseInt(rt.startTime.split(":")[0])
                if(hour<12)am.push(rt.startTime)
                    else pm.push(rt.startTime)
            })

            console.log(data)
            setPopupstore({
                ...data,
                reservationTimes:{am,pm}
            })
        })
    },[id])

    return(
        <div className="border-2 border-sky-200 mt-10 m-2 ml-2">
                <div className="flex flex-wrap mx-auto p-6">
                    <div className="relative mb-4 flex w-full flexe-wrap items-stretch">
                        <div className="text-sm m-1 p-2 w-1/5">id{popupstore.id}</div>
                        <div className="text-sm m-1 p-2 w-1/5">팝업스토어이름{popupstore.storeName}</div>
                        <div className="w-full justify-center flex flex-col m-auto items-center">
                            {popupstore.uploadFileNames.map((imgFile,i)=>
                            <img
                            key={i}
                            alt="popupStore"
                            className="p-4 w-1/2"
                            src={`${host}/api/popup/view/${imgFile}`}></img>
                            )}
                        </div>
                        <div className="text-sm m-1 p-2 w-1/5">주소{popupstore.address}</div>
                        <div className="text-sm m-1 p-2 w-1/5">가격{popupstore.price}</div>
                        
                       
                        

                        <div className="flex justify-end">
                            <div className="relative mb-4 flex p-4 flex-wrap items-stretch">
                                <button 
                                type="button"
                                className="rounded p-4 w-36 bg-primaryColor text-xl text-white"
                                onClick={ () => setReservationModal(true)}>
                                예약하기
                                </button>

                               {reservationModal && (
                                    <ReservationModal
                                    title={`${popupstore.storeName}예약`}
                                    content={
                                        <div>
                                        <CalendarComponent 
                                            offDays={[0]}
                                            reservationTimes={popupstore.reservationTimes || {am:[],pm:[]}}
                                            onSelect={handleSelect}
                                            maxCount={popupstore.maxCount}
                                            price={popupstore.price}/>
                                     <div className="flex justify-end"> 
                                    <button
                                        onClick={handleReservation}
                                       
                                        className="py-2 w-2/5 bg-primaryColor text-xl rounded">다음</button>
                                        </div>
                                        </div>
                                    }
                                    callbackFn={()=> setReservationModal(false)}/>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            
        </div>

    )
}

export default ReadComponent;