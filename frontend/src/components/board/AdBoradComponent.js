import { useState, useRef } from "react";
import useCustomMove from "../../hooks/useCustomMove"
import ResultModal from "../common/ResultModal";
import { postAdd } from "../../api/popupstoreApi";
import SelectBoxComponent from "./SelectBoxComponent";


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
    files:[]

}



const AdBoardComponent = () => {

    const [popupstore, setPopupstore] = useState({...initState})

    const [result, setResult] = useState(null)

    const { moveToList } = useCustomMove()

    const uploadRef = useRef()

    const handleChangePopupstore = (e) => {
        popupstore[e.target.name] = e.target.value

        setPopupstore({...popupstore})
    }

    const handleClickRegister = (e) => {
      
        const files = uploadRef.current.files
        const formData = new FormData()

        for(let i = 0; i<files.length; i++){
            formData.append("files",files[i]);
        }

        formData.append("storeName", popupstore.storeName)
        formData.append("address", popupstore.address)
        formData.append("startDate", popupstore.startDate)
        formData.append("amTime", popupstore.amTime)
        formData.append("pmTime", popupstore.pmTime)
        formData.append("maxCount", popupstore.maxCount)
        formData.append("desc", popupstore.desc)
        formData.append("price", popupstore.price)

        postAdd(formData)
    }

    const closeModal = () => {
        setResult(null)
        moveToList();
    }

     /* 오전,오후 시간 입력 칸 */
    const amTime = [
    {name:"amTime1", type:"text"},
    {name:"amTime2", type:"text"},
    {name:"amTime3", type:"text"},
    {name:"amTime4", type:"text"}
    ]

    const pmTime = [
    {name:"pmTime1", type:"text"},
    {name:"pmTime2", type:"text"},
    {name:"pmTime3", type:"text"},
    {name:"pmTime4", type:"text"}
    ]


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
                type={'Date'}
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
                type={'Date'}
                value={popupstore.endDate}
                onChange={handleChangePopupstore}>
                </input>
            </div>
        </div>
        {/* -------------------am,pm 입력 폼 만드는 코드 시작---------------- */}
            <div style={{display:"flex", gap:"1px", marginBottom:"10px"}}>AM_TIME
            {amTime.map((amTime, idx) => (
                <div key={idx} 
                style={{display:"flex"}}>
                    
                    <input className="border border-gray-400 rounded p-2 w-24" 
                    type={amTime.type} name={amTime.name}></input>
                </div>
            ))}
            </div>
        
       
            <div style={{display:"flex", gap:"1px", marginBottom:"10px"}}>PM_TIME
            {pmTime.map((pmTime, idx) => (
                <div key={idx} 
                style={{display:"flex"}}>
                    
                    <input className="border border-gray-400 rounded p-2 w-24" 
                    type={pmTime.type} name={pmTime.name}></input>
                </div>
            ))}
            </div>
            {/* -------------------am,pm 입력 폼 만드는 코드 끝---------------- */}

        
            <div className="flex justify-center">
                <div className="relative mb-4 flex w-full flex-wrap items-stretch">
                    <div className="w-1/5 p-6 text-right font-bold">입장가능인원수
                    <SelectBoxComponent/>
                    </div>
                </div>
            </div>


    
             <div className="flex justify-center">
            <div className="relative mb-4 flex w-full flex-wrap items-stretch">
                <div className="w-1/5 p-6 text-right font-bold">행사입장가격</div>
                <input className="rounded-r border border-solid border-neutral-500 shadow-md"
                name="price"
                type={'text'}
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
            <div className="relative mb-4 flex w-full flex-erap items-stretch">
                <div className="w-1/5 p-6 text-right font-bold">이미지첨부</div>
                <input ref={uploadRef} className="w-4/5 p-6 rounded-r border border-solid border-neutral-300 shadow-md"
                name="files"
                type={'file'}
                multiple={true}>
                </input>
            </div>
        </div>



        <div className="flex justify-center">
            <div className="relative mb-4 flex p-4 flex-erap items-stretch">
                <button type="button"
                className="rounder p-4 w-36 bg-blue-300 text-xl text-white"
                onClick={handleClickRegister}>등록하기</button>
            </div>
        </div>

        </div>
        </form>
    );

}

export default AdBoardComponent;
