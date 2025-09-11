import { useState, useRef } from "react";
import useCustomMove from "../../hooks/useCustomMove"
import ResultModal from "../common/ResultModal";
import { postAdd } from "../../api/popupstoreApi";
import SelectBoxComponent from "../common/SelectBoxComponent"
import { popoverClasses } from "@mui/material/Popover";


const initState = {
    id:0,
    storeName:'',
    address:'',
    startDate:'',
    endDate:'',
    reservationTimes:[],
    maxCount:null,
    desc:'',
    price:0,
    files:[]

}



const AdBoardComponent = () => {

    const [popupstore, setPopupstore] = useState({...initState})

    const [result, setResult] = useState(null)

    const { moveToList } = useCustomMove()

    const uploadRef = useRef()

    const handleTimeChange = (e, amPm, index) => {

        const newTimes = [...popupstore.reservationTimes];

        newTimes[index] = {
            amPm,
            time:e.target.value
        }

        setPopupstore({...popupstore, reservationTimes:newTimes})
    }


    const handleChangePopupstore = (e) => {
        console.log(e.target.name, e.target.value);

        setPopupstore({
            ...popupstore,
            [e.target.name]:e.target.value
        })
    }

    

    const handleClickRegister = async() => {

        if(!popupstore.startDate || !popupstore.endDate){
            alert("날짜를 모두 선택해 주세요");
            return;
        }
      
        const files = uploadRef.current.files;
        const formData = new FormData()

        for(let i = 0; i<files.length; i++){
            formData.append("file",files[i]);
        }

        formData.append("storeName", popupstore.storeName)
        formData.append("address", popupstore.address)
        formData.append("startDate", popupstore.startDate)
        formData.append("endDate", popupstore.endDate)
        formData.append("reservationTimes",JSON.stringify(popupstore.reservationTimes))
        formData.append("maxCount", popupstore.maxCount)
        formData.append("desc", popupstore.desc)
        formData.append("price", popupstore.price)

        for(let pair of formData.entries()){
            console.log(pair[0],pair[1])
        }


        try{
            const result = await postAdd(formData);
            setResult(result.id);
        }catch(err){
            alert("등록실패:" + err.message);
        }
    }

    const closeModal = () => {
        setResult(null)
        moveToList();
    }

    return(
         <form>
            <div className="border-2 border-sky-200 mt-10 m-2 p-4">
                {result?<ResultModal title={`팝업스토어등록`} content={`${result}번 팝업스토어등록`}
                callbackFn={closeModal}></ResultModal>:<></>}
            
    
        <div className="flex justify-center">
            <div className="relative mb-4 flex w-full flex-wrap items-stretch">
                <div className="w-1/5 p-6 text-right font-bold">팝업스토어이름</div>
                <input className="rounded-r border border-solid border-neutral-500 shadow-md"
                name="storeName"
                type={'text'}
                value={popupstore.storeName}
                onChange={handleChangePopupstore}>
                </input>
            </div>
        </div>

         
        <div className="flex justify-center">
            <div className="relative mb-4 flex w-full flex-wrap items-stretch">
                <div className="w-1/5 p-6 text-right font-bold">주소</div>
                <input className="w-4/5 p-6 rounded-r border border-solid border-neutral-500 shadow-md"
                name="address"
                type={'text'}
                value={popupstore.address}
                onChange={handleChangePopupstore}>
                </input>
            </div>
        </div>

         
        <div className="flex justify-center">
            <div className="relative mb-4 flex w-full flex-wrap items-stretch">
                <div className="w-1/5 p-6 text-right font-bold">행사시작일</div>
                <input className="rounded-r border border-solid border-neutral-500 shadow-md"
                name="startDate"
                type={'date'}
                value={popupstore.startDate}
                onChange={handleChangePopupstore}>
                </input>
            </div>
        </div>

           <div className="flex justify-center">
            <div className="relative mb-4 flex w-full flex-wrap items-stretch">
                <div className="w-1/5 p-6 text-right font-bold">행사종료일</div>
                <input className="rounded-r border border-solid border-neutral-500 shadow-md"
                name="endDate"
                type={'date'}
                value={popupstore.endDate}
                onChange={handleChangePopupstore}>
                </input>
            </div>
        </div>
        {/* -------------------am,pm 입력 폼 만드는 코드 시작---------------- */}
            <div style={{display:"flex", gap:"1px", marginBottom:"10px"}}>AM_TIME
           {[0,1,2,3].map((i)=>(
            <input
            key={`am-${i}`}
            type="time"
            onChange={(e) => handleTimeChange(e, "AM", i)}></input>
           ))}
            </div>
        
       
            <div style={{display:"flex", gap:"1px", marginBottom:"10px"}}>PM_TIME
                {[0,1,2,3].map((i)=> (
                    <input
                    key={`pm-${i}`}
                    type="time"
                    onChange={(e) => handleTimeChange(e, "PM", i)}></input>
                ))}
            </div>
            {/* -------------------am,pm 입력 폼 만드는 코드 끝---------------- */}

        
            <div className="flex justify-center">
                <div className="relative mb-4 flex w-full flex-wrap items-stretch">
                    <div className="w-1/5 p-6 text-right font-bold">입장가능인원수
                    <SelectBoxComponent value={popupstore.maxCount}
                    onChange={(val)=> setPopupstore({...popupstore, maxCount:val})}/>
                    </div>
                </div>
            </div>


    
             <div className="flex justify-center">
            <div className="relative mb-4 flex w-full flex-wrap items-stretch">
                <div className="w-1/5 p-6 text-right font-bold">행사입장가격</div>
                <input className="rounded-r border border-solid border-neutral-500 shadow-md"
                name="price"
                type={'number'}
                value={popupstore.price}
                onChange={handleChangePopupstore}>{/* 폼에 '천원단위로 입력' or 입력뒤에'원'글자 항상 뜨게? */}
                </input>
            </div>
        </div>

            
        <div className="flex justify-center">
            <div className="relative mb-4 flex w-full flex-wrap items-stretch">
                <div className="w-1/5 p-6 text-right font-bold">행사정보</div>
                <input className="rounded-r border border-solid border-neutral-500 shadow-md"
                name="desc"
                type={'text'}
                value={popupstore.desc}
                onChange={handleChangePopupstore}>{/* 폼에 '행사 정보를 입력해주세요' */}
                </input>
            </div>
        </div>

        {/*--------------------이미지첨부---------------- */}
        <div className="flex justify-center">
            <div className="relative mb-4 flex w-full flex-wrap items-stretch">
                <div className="w-1/5 p-6 text-right font-bold">이미지첨부</div>
                <input ref={uploadRef} className="w-4/5 p-6 rounded-r border border-solid border-neutral-300 shadow-md"
                type={'file'}
                multiple={true}>
                </input>
            </div>
        </div>



        <div className="flex justify-center">
            <div className="relative mb-4 flex p-4 flex-erap items-stretch">
                <button type="button"
                className="rounded p-4 w-36 bg-blue-300 text-xl text-white"
                onClick={handleClickRegister}>등록하기</button>
            </div>
        </div>

        </div>
        </form>
    );

}

export default AdBoardComponent;
