import { useState, useRef, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { createAdWithImages } from "../../../api/AdBoardApi";

const initState = {
  storeName: "",
  address: "",
  startDate: "",
  endDate: "",
  desc: "",
  price: 0,
  files: [],
};

const FormRow = ({ label, children }) => (
  <div className="flex justify-center">
    <div className="relative mb-4 w-full flex items-center">
      <div className="w-1/5 p-3 font-bold text-left">{label}</div>
      <div className="w-4/5">{children}</div>
    </div>
  </div>
);

const AdBoardComponent = () => {
  const [adBoard, setAdBoard] = useState({ ...initState });
  const [files, setFiles] = useState([]);
  const [previews, setPreviews] = useState([]);
  const [thumbnailIdx, setThumbnailIdx] = useState(0);
  const [popupStoreId, setPopupStoreId] = useState(null);

  const fileRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();

  // ✅ PopupStore 등록에서 넘어온 ID 받기
  useEffect(() => {
    if (location.state?.popupStoreId) {
      console.log("받은 popupStoreId:", location.state.popupStoreId);
      setPopupStoreId(location.state.popupStoreId);
    }
  }, [location.state]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAdBoard((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const selected = Array.from(e.target.files);
    setFiles(selected);
    setPreviews(selected.map((file) => URL.createObjectURL(file)));
    setThumbnailIdx(0);
  };

  const handleRemoveImage = (idx) => {
    const newFiles = files.filter((_, i) => i !== idx);
    const newPreviews = previews.filter((_, i) => i !== idx);
    setFiles(newFiles);
    setPreviews(newPreviews);

    if (fileRef.current) {
      fileRef.current.value = "";
      const dataTransfer = new DataTransfer();
      newFiles.forEach((file) => dataTransfer.items.add(file));
      fileRef.current.files = dataTransfer.files;
    }

    if (thumbnailIdx === idx) {
      setThumbnailIdx(0);
    } else if (thumbnailIdx > idx) {
      setThumbnailIdx((prev) => prev - 1);
    }
  };

  // ✅ 등록
  const handleClickRegister = async () => {
    if (!adBoard.storeName.trim()) {
      alert("제목을 입력하세요.");
      return;
    }
    if (!adBoard.desc.trim()) {
      alert("내용을 입력하세요.");
      return;
    }
    if (!popupStoreId) {
      alert("팝업스토어 ID가 없습니다. 먼저 팝업스토어를 등록하세요.");
      return;
    }

    try {
      const adData = {
        title: adBoard.storeName,
        content: adBoard.desc,
        contact: "010-0000-0000",
        externalUrl: adBoard.address,
        writerId: 1,
        publishStartDate: adBoard.startDate,
        publishEndDate: adBoard.endDate,
        price: adBoard.price,
        thumbnailIndex: thumbnailIdx,
        popupStoreId, // ✅ 연동
      };

      const result = await createAdWithImages(adData, files);

      if (result) {
        alert("홍보글 등록 성공!");
        navigate(`/boards/ad/${result}/reservation`);
      } else {
        alert("등록은 됐지만 ID를 찾을 수 없습니다.");
        navigate("/boards/ad");
      }
    } catch (e) {
      console.error(e);
      alert("등록 실패");
    }
  };

  return (
    <div className="border-2 border-sky-200 mt-10 p-4 rounded">
      {/* 제목 */}
      <FormRow label="제목">
        <input
          className="w-full p-3 rounded border border-neutral-500 shadow-md"
          name="storeName"
          type="text"
          value={adBoard.storeName}
          onChange={handleChange}
          placeholder="제목을 입력하세요"
        />
      </FormRow>

      {/* 주소 */}
      <FormRow label="주소">
        <input
          className="w-full p-3 rounded border border-neutral-500 shadow-md"
          name="address"
          type="text"
          value={adBoard.address}
          onChange={handleChange}
          placeholder="주소를 입력하세요"
        />
      </FormRow>

      {/* 행사 시작일 */}
      <FormRow label="행사 시작일">
        <input
          className="w-full p-3 rounded border border-neutral-500 shadow-md"
          name="startDate"
          type="date"
          value={adBoard.startDate}
          onChange={handleChange}
        />
      </FormRow>

      {/* 행사 종료일 */}
      <FormRow label="행사 종료일">
        <input
          className="w-full p-3 rounded border border-neutral-500 shadow-md"
          name="endDate"
          type="date"
          value={adBoard.endDate}
          onChange={handleChange}
        />
      </FormRow>

      {/* 가격 */}
      <FormRow label="입장 가격">
        <input
          className="w-full p-3 rounded border border-neutral-500 shadow-md"
          name="price"
          type="number"
          value={adBoard.price}
          onChange={handleChange}
        />
      </FormRow>

      {/* 내용 */}
      <FormRow label="내용">
        <textarea
          className="w-full p-3 rounded border border-neutral-500 shadow-md h-64"
          name="desc"
          value={adBoard.desc}
          onChange={handleChange}
          placeholder="내용을 입력하세요."
        />
      </FormRow>

      {/* 이미지 업로드 */}
      <FormRow label="이미지 첨부">
        <div className="flex flex-col gap-4 w-full">
          <input
            type="file"
            multiple
            accept="image/*"
            ref={fileRef}
            onChange={handleFileChange}
            className="w-48"
          />

          {previews.length > 0 && (
            <div className="flex gap-4 flex-wrap border-b border-gray-300 pb-4">
              {previews.map((src, idx) => (
                <div
                  key={idx}
                  className="relative cursor-pointer"
                  onClick={() => setThumbnailIdx(idx)}
                >
                  <img
                    src={src}
                    alt={`preview-${idx}`}
                    className={`w-32 h-32 object-cover border rounded ${
                      idx === thumbnailIdx ? "ring-4 ring-blue-500" : ""
                    }`}
                  />
                  {idx === thumbnailIdx && (
                    <span className="absolute top-1 left-1 bg-blue-600 text-white text-xs px-2 py-0.5 rounded">
                      대표
                    </span>
                  )}
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleRemoveImage(idx);
                    }}
                    className="absolute top-1 right-1 bg-gray-700 text-white text-xs px-1 rounded hover:bg-black"
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </FormRow>

      {/* 등록 버튼 */}
      <div className="flex justify-end">
        <button
          type="button"
          className="rounded p-4 w-36 bg-blue-500 text-xl text-white hover:bg-blue-600"
          onClick={handleClickRegister}
        >
          등록
        </button>
      </div>
    </div>
  );
};

export default AdBoardComponent;
