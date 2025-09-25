import { useState, useRef } from "react";
import { postAdd } from "../../../api/popupstoreApi";

const initState = {
  storeName: '',
  address: '',
  startDate: '',
  endDate: '',
  desc: '',
  price: 0,
  parking: false,
  files: []
};

const AdBoardComponent = ({onRegisterSuccess}) => {
  const [popupstore, setPopupstore] = useState({ ...initState });
  const uploadRef = useRef();
  
  const handleChangePopupstore = (e) => {
    const {name, value, type, checked} = e.target;

    const parkingCheck = type === 'checkbox'?checked:value;

    setPopupstore({
      ...popupstore,
      [name]:parkingCheck
    });
  };

  const handleClickRegister = async () => {
    if (!popupstore.startDate || !popupstore.endDate) {
      alert("날짜를 모두 선택해 주세요");
      return;
    }
    
    const files = uploadRef.current.files;
    const formData = new FormData();

    for (let i = 0; i < files.length; i++) {
      formData.append("files", files[i]);
    }

    const popupstoreData = {
      storeName: popupstore.storeName,
      address: popupstore.address,
      startDate: popupstore.startDate,
      endDate: popupstore.endDate,
      desc: popupstore.desc,
      price: popupstore.price,
      parking: popupstore.parking,
    };
    formData.append("dto", JSON.stringify(popupstoreData));

    for (let pair of formData.entries()) {
      console.log(pair[0], pair[1]);
    }

    try {
      const result = await postAdd(formData);
      onRegisterSuccess(result.id);
    } catch (err) {
      alert("등록실패: " + err.message);
    }
  };


  return (
    <div>
      <div className="border-2 border-sky-200 mt-10 m-2 p-4">
        <div className="flex justify-center">
          <div className="relative mb-4 flex w-full flex-wrap items-stretch">
            <div className="w-1/5 p-6 text-right font-bold">팝업스토어이름</div>
            <input
              className="rounded-r border border-solid border-neutral-500 shadow-md"
              name="storeName"
              type={'text'}
              value={popupstore.storeName}
              onChange={handleChangePopupstore}
            ></input>
          </div>
        </div>

        <div className="flex justify-center">
          <div className="relative mb-4 flex w-full flex-wrap items-stretch">
            <div className="w-1/5 p-6 text-right font-bold">주소</div>
            <input
              className="w-4/5 p-6 rounded-r border border-solid border-neutral-500 shadow-md"
              name="address"
              type={'text'}
              value={popupstore.address}
              onChange={handleChangePopupstore}
            ></input>
          </div>
        </div>

        <div className="flex justify-center">
          <div className="relative mb-4 flex w-full flex-wrap items-stretch">
            <div className="w-1/5 p-6 text-right font-bold">행사시작일</div>
            <input
              className="rounded-r border border-solid border-neutral-500 shadow-md"
              name="startDate"
              type={'date'}
              value={popupstore.startDate}
              onChange={handleChangePopupstore}
            ></input>
          </div>
        </div>

        <div className="flex justify-center">
          <div className="relative mb-4 flex w-full flex-wrap items-stretch">
            <div className="w-1/5 p-6 text-right font-bold">행사종료일</div>
            <input
              className="rounded-r border border-solid border-neutral-500 shadow-md"
              name="endDate"
              type={'date'}
              value={popupstore.endDate}
              onChange={handleChangePopupstore}
            ></input>
          </div>
        </div>

        <div className="flex justify-center">
          <div className="relative mb-4 flex w-full flex-wrap items-stretch">
            <div className="w-1/5 p-6 text-right font-bold">행사입장가격</div>
            <input
              className="rounded-r border border-solid border-neutral-500 shadow-md"
              name="price"
              type={'number'}
              value={popupstore.price}
              onChange={handleChangePopupstore}
            ></input>
          </div>
        </div>

        <div className="flex justify-center">
          <div className="relative mb-4 flex w-full flex-wrap items-stretch">
            <div className="w-1/5 p-6 text-right font-bold">행사정보</div>
            <input
              className="rounded-r border border-solid border-neutral-500 shadow-md"
              name="desc"
              type={'text'}
              value={popupstore.desc}
              onChange={handleChangePopupstore}
            ></input>
          </div>
        </div>

        <div className="flex justify-center">
          <div className="relative mb-4 flex w-full flex-wrap items-stretch">
            <div className="w-1/5 p-6 text-right font-bold">주차여부</div>
            <input
              className="rounded-r border border-solid border-neutral-500 shadow-md"
              type='checkbox'
              name="parking"
              value={popupstore.parking}
              onChange={handleChangePopupstore}>
            </input>
                <label className="ml-2 text-sm font-medium text-gray-900">주차 가능</label>
          </div>
        </div>

        <div className="flex justify-center">
          <div className="relative mb-4 flex w-full flex-wrap items-stretch">
            <div className="w-1/5 p-6 text-right font-bold">이미지첨부</div>
            <input
              ref={uploadRef}
              className="w-4/5 p-6 rounded-r border border-solid border-neutral-300 shadow-md"
              type={'file'}
              multiple={true}
            ></input>
          </div>
        </div>

        <div className="flex justify-center">
          <div className="relative mb-4 flex p-4 flex-erap items-stretch">
            <button
              type="button"
              className="rounded p-4 w-36 bg-blue-300 text-xl text-white"
              onClick={handleClickRegister}
            >
              등록하기
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdBoardComponent;