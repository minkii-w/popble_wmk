
import { useEffect, useRef, useState } from "react";
import { API_SERVER_HOST, deleteOne, getOne, putOne } from "../../api/popupstoreApi";
import FetchingModal from "../common/FetchingModal";
import useCustomMove from "../../hooks/useCustomMove";
import ResultModal from "../common/ResultModal";

const host = API_SERVER_HOST

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
    deleted:false,
    uploadFileNames:[]
}
const ModifyComponent = ({id}) => {

    const [popupstore, setPopupstore] = useState(initState)

    const [result, setResult] = useState(null)

    const [fetching, setFetching] = useState(false)

    const {moveToList, moveToRead} = useCustomMove()

    const uploadRef = useRef()

    useEffect( () => {
        setFetching(true)

        getOne(id).then(data => {
            setPopupstore(data)
            setFetching(false)
        })
    },[id])

    const handleChangePopupstore = (e) => {

        popupstore[e.target.name] = e.target.value

        setPopupstore({...popupstore})
    }

    const deleteOldImages = (imageName) => {

        const resultFileNames = popupstore.uploadFileNames.filter( fileName => fileName !== imageName)

        popupstore.uploadFileNames = resultFileNames

        setPopupstore({...popupstore})

    }

    const handleClickModify = () => {

        const files = uploadRef.current.files
        const formData = new FormData()

        for(let i=0; i < files.length; i++){

            formData.append("files", files[i]);
        }

        formData.append("storeName", popupstore.storeName)
        formData.append("address", popupstore.address)
        formData.append("startDate", popupstore.startDate)
        formData.append("reservationTimes",JSON.stringify(popupstore.reservationTimes))
        formData.append("maxCount", popupstore.maxCount)
        formData.append("desc", popupstore.desc)
        formData.append("price", popupstore.price)
        formData.append("deleted", popupstore.deleted)

        for(let i=0; i<popupstore.uploadFileNames.length; i++){
            formData.append("uploadFileNames", popupstore.uploadFileNames[i])
        }
        setFetching(true)

        putOne(id, formData).then(data => {
            setResult('수정')
            setFetching(false)
        })
    }

    const closeModal = () => {
        if(result === '수정'){
            moveToRead(id)
        }else if(result === '삭제'){
            moveToList({page:1})
        }
            setResult(null)
    }

    const handleClickDelete = () => {
        setFetching(true)
        deleteOne(id).then(data => {
            setResult('삭제')
            setFetching(false)
        })
    }

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
        <div className="border-2 border-sky-200 mt-10 m-2 p-4">
            {fetching?<FetchingModal/>:<></>}
            {result?<ResultModal
            title={`${result}`}
            content={'정상적으로 처리되었습니다'}
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

            <div style={{display:"flex", gap:"1px", marginBottom:"10px"}}>AM_TIME
            {amTime.map((amTime, idx) => (
                <div key={idx} 
                style={{display:"flex"}}>
                    
                    <input className="border border-gray-400 rounded p-2 w-24" 
                    type="time"
                    value={popupstore.reservationTimes.am[idx]}
                    onChange={(e) => {
                        const newAm = [...popupstore.reservationTimes.am];
                        newAm[idx] = e.target.value;
                        setPopupstore({...popupstore, reservationTimes:{...popupstore.reservationTimes, am:newAm}})
                    }}
                    ></input>
                </div>
            ))}
            </div>
        
       
            <div style={{display:"flex", gap:"1px", marginBottom:"10px"}}>PM_TIME
            {pmTime.map((pmTime, idx) => (
                <div key={idx} 
                style={{display:"flex"}}>
                    
                    <input className="border border-gray-400 rounded p-2 w-24" 
                    type="time"
                    value={popupstore.reservationTimes.pm[idx]}
                    onChange={(e) => {
                        const newPm = [...popupstore.reservationTimes.pm];
                        newPm[idx] = e.target.value;
                        setPopupstore({...popupstore, reservationTimes:{...popupstore.reservationTimes, pm:newPm}})
                    }}
                    ></input>
                </div>
            ))}
            </div>

            <div className="flex justify-center">
                <div className="relative mb-4 flex w-full flex-wrap items-stretch">
                    <div className="w-1/5 p-6 text-right font-bold">입장가능인원수
                    <SelectBoxComponent value={popupstore.maxCount}
                    onChange={(val) => setPopupstore({...popupstore, maxCount:val})}/>
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

            <div className="flex justify-center">
                <div className="relative md-4 flex w-full flex-wrap items-stretch">
                    <div className="w-1/5 p-6 text-right font-bold">삭제</div>
                    <select name="deleted" value={popupstore.deleted}
                    onChange={handleChangePopupstore}
                    className="w-4/5 p-6 rouded-r border border-solid border-neutral-300 shadow-md">
                        <option value={false}>사용</option>
                        <option value={true}>삭제</option>
                    </select>
                </div>
            </div>  

            <div className="flex justify-center">
                <div className="relative mb-4 flex w-full flex-wrap items-stretch">
                    <div className="w-1/5 p-6 text-right font-bold">이미지첨부</div>
                    <input ref={uploadRef}
                    className="w-4/5 p-6 rounded-r border border-solid border-neutral-300 shadow-md"
                    type={'file'}
                    multiple={true}></input>
                </div>
            </div> 

            <div className="flex justify-center">
                <div className="relative mb-4 flex w-full flex-wrap items-stretch">
                    <div className="w-1/5 p-6 text-right font-bold">이미지</div>
                    <div className="w-4/5 justify-center flex flex-wrap items-start">
                    {popupstore.uploadFileNames.map((imgfile,i)=>
                    <div className="flex justify-center flex-col w-1/3"
                    key={i}>
                        <button className="bg-blue-500 text-3xl text-white"
                        onClick={ () => deleteOldImages(imgfile)}>이미지삭제</button>
                        <img alt="img" src={`${host}/api/popup/view/s_${imgfile}`}></img>
                    </div>
                    )}
                    </div>
                </div>
            </div>  

            <div className="flex justify-end">
                <button type="button" className="rounded p-4 m-2 w-32 bg-red-500 text-xl text-white"
                onClick={handleClickDelete}>삭제</button>
                <button type="button" className="rounded p-4 m-2 w-32 bg-red-300 text-xl text-white"
                onClick={handleClickModify}>수정</button>
                <button type="button" className="rounded p-4 m-2 w-32 bg-blue-300 text-xl text-white"
                onClick={moveToList}>목록</button>
            </div>       
        </div>
    )
}

// components/board/ModifyComponent.jsx
import { useEffect, useState } from "react";
import { getOne, patchOne } from "../../api/BoardApi"; // ✅ 실제 API 연결

const ModifyComponent = ({ id }) => {
  const [form, setForm] = useState({ title: "", content: "" });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError("");
        const data = await getOne(id);
        // ⚠️ 여기서 data 구조 확인 필요
        // 예: { id, title, content, writer, createTime ... }
        setForm({
          title: data.title,
          content: data.content,
        });
      } catch (err) {
        console.error("게시글 불러오기 실패:", err);
        setError("게시글을 불러오지 못했습니다.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  const onChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const onSubmit = async () => {
    try {
      await patchOne(id, form);
      alert("수정되었습니다.");
      // 필요하면 수정 후 상세 페이지로 이동:
      // navigate(`/boards/general/${id}`);
    } catch (err) {
      console.error("수정 실패:", err);
      alert("수정에 실패했습니다. 잠시 후 다시 시도해 주세요.");
    }
  };

  if (loading) return <div>로딩중…</div>;

  return (
    <div className="mt-6 space-y-4">
      {error && (
        <div className="p-3 rounded bg-red-50 text-red-600 text-sm">{error}</div>
      )}

      <input
        className="w-full p-3 border rounded"
        name="title"
        value={form.title}
        onChange={onChange}
        placeholder="제목"
      />
      <textarea
        className="w-full p-3 border rounded h-40"
        name="content"
        value={form.content}
        onChange={onChange}
        placeholder="내용"
      />
      <button
        onClick={onSubmit}
        className="px-4 py-2 bg-blue-500 text-white rounded"
      >
        저장
      </button>
    </div>
  );
};


export default ModifyComponent;
