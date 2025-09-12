
import { useEffect, useState } from "react";
import { API_SERVER_HOST, getReservation, postReservation } from "../../api/popupstoreApi";
import { useNavigate } from "react-router-dom";
import ReservaionDoComponent from "../../components/reservation/ReservationDoComponent"

const ReservationPage = ({id}) => {

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

const hdst = API_SERVER_HOST

const navigate = useNavigate();

    const [popupstore, setPopupstore] = useState(initState)

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


      return (
    <div>
      <h2 className="text-xl font-bold mb-2">예약</h2>
      <div>
                            <ReservaionDoComponent
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
      
    </div>
  );
  
}

export default ReservationPage;
