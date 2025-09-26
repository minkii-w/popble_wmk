import { useState, useRef } from "react";
import { postAddWithImages } from "../../../api/BoardApi"; // ✅ 이미지 포함 API
import ResultModal from "./ResultModal";

const BOARD_TYPES = [
  { value: "GENERAL", label: "자유게시판" },
  { value: "NOTICE", label: "공지게시판" },
  { value: "QNA", label: "질문게시판" },
];

const initState = {
  id: null,
  type: "",
  title: "",
  content: "",
  writerId: "",
  popupStoreId: "",
};

// 공통 Row 컴포넌트 (좌측 정렬)
const FormRow = ({ label, children }) => (
  <div className="flex justify-center">
    <div className="relative mb-4 w-full flex items-center">
      <div className="w-1/5 p-3 font-bold text-left">{label}</div>
      <div className="w-4/5">{children}</div>
    </div>
  </div>
);

const WriteForm = () => {
  const [board, setBoard] = useState({ ...initState });
  const [files, setFiles] = useState([]);
  const [previews, setPreviews] = useState([]);
  const [thumbnailIdx, setThumbnailIdx] = useState(0); // ✅ 대표 이미지 인덱스
  const [result, setResult] = useState(null); // ✅ 등록 결과
  const fileRef = useRef(null);

  // 입력 변경
  const handleChange = (e) => {
    const { name, value } = e.target;
    setBoard((prev) => ({ ...prev, [name]: value }));
  };

  // 파일 선택
  const handleFileChange = (e) => {
    const selected = Array.from(e.target.files);
    setFiles(selected);

    // 미리보기
    const previewList = selected.map((file) =>
      URL.createObjectURL(file)
    );
    setPreviews(previewList);

    // 새로 선택하면 첫 번째 파일을 대표로 지정
    setThumbnailIdx(0);
  };

  // 등록 버튼
  const handleClickAdd = async () => {
    if (!board.type) {
      alert("게시판을 선택하세요.");
      return;
    }
    if (!board.title.trim()) {
      alert("제목을 입력하세요.");
      return;
    }
    if (!board.content.trim()) {
      alert("내용을 입력하세요.");
      return;
    }
    if (!board.writerId) {
      alert("작성자 ID를 입력하세요.");
      return;
    }

    try {
      const formData = new FormData();
      formData.append(
        "board",
        new Blob(
          [
            JSON.stringify({
              type: board.type,
              title: board.title,
              content: board.content,
              writerId: Number(board.writerId),
              thumbnailIndex: thumbnailIdx, // ✅ 대표 이미지 인덱스 같이 전달
            }),
          ],
          { type: "application/json" }
        )
      );

      files.forEach((file) => formData.append("images", file));

      const res = await postAddWithImages(formData);
      const createId =
        typeof res === "number"
          ? res
          : res?.id ?? res?.boardId ?? res?.tno ?? null;

      // 모달 표시
      setResult({ id: createId, title: board.title });

      // 1.5초 뒤 자동 이동
      setTimeout(() => {
        window.location.href = "/popble/boards/all";
      }, 1500);

      // 초기화
      setBoard((prev) => ({ ...initState, type: prev.type }));
      setFiles([]);
      setPreviews([]);
      setThumbnailIdx(0);
      if (fileRef.current) fileRef.current.value = "";
    } catch (e) {
      console.error(e);
      alert("등록 중 오류 발생");
    }
  };

  // 이미지 삭제
  const handleRemoveImage = (idx) => {
    const newFiles = files.filter((_, i) => i !== idx);
    const newPreviews = previews.filter((_, i) => i !== idx);

    setFiles(newFiles);
    setPreviews(newPreviews);

    if (fileRef.current) {
      fileRef.current.value = "";

      // 남은 파일 다시 세팅
      const dataTransfer = new DataTransfer();
      newFiles.forEach((file) => dataTransfer.items.add(file));
      fileRef.current.files = dataTransfer.files;
    }

    // ✅ 삭제 후 대표 이미지 인덱스 보정
    if (thumbnailIdx === idx) {
      setThumbnailIdx(0); // 대표 지워지면 0번으로 변경
    } else if (thumbnailIdx > idx) {
      setThumbnailIdx((prev) => prev - 1); // 뒤쪽 인덱스 당겨오기
    }
  };

  return (
    <div className="border-2 border-sky-200 mt-10 p-4 rounded">
      {/* 등록 성공 모달 */}
      {result && (
        <ResultModal
          title="글 등록"
          content={`[${result.id}]번 글 '${result.title}'이 등록되었습니다.`}
          callbackFn={() => {}} // 자동 이동되므로 클릭 콜백 불필요
        />
      )}

      {/* 게시판 선택 */}
      <FormRow label="게시판">
        <select
          className="w-full p-3 rounded border border-neutral-500 shadow-md"
          name="type"
          value={board.type}
          onChange={handleChange}
        >
          <option value="">게시판을 선택하세요.</option>
          {BOARD_TYPES.map((t) => (
            <option key={t.value} value={t.value}>
              {t.label}
            </option>
          ))}
        </select>
      </FormRow>

      {/* 제목 */}
      <FormRow label="제목">
        <input
          className="w-full p-3 rounded border border-neutral-500 shadow-md"
          name="title"
          type="text"
          value={board.title}
          onChange={handleChange}
          maxLength={200}
        />
      </FormRow>

      {/* 내용 */}
      <FormRow label="내용">
        <textarea
          className="w-full p-3 rounded border border-neutral-500 shadow-md h-64"
          name="content"
          value={board.content}
          onChange={handleChange}
          placeholder="내용을 입력하세요."
        />
      </FormRow>

      {/* 작성자 ID */}
      <FormRow label="작성자 ID">
        <input
          className="w-full p-3 rounded border border-neutral-500 shadow-md"
          name="writerId"
          type="number"
          value={board.writerId}
          onChange={handleChange}
          placeholder="작성자 UserProfile ID"
        />
      </FormRow>

      {/* 이미지 업로드 + 미리보기 */}
      <FormRow label="이미지 첨부">
        <div className="flex flex-col gap-4 w-full">
          {/* 파일 선택 버튼 */}
          <input
            type="file"
            multiple
            accept="image/*"
            ref={fileRef}
            onChange={handleFileChange}
            className="w-48"
          />

          {/* 이미지 미리보기 */}
          {previews.length > 0 && (
            <div className="flex gap-4 flex-wrap border-b border-gray-300 pb-4">
              {previews.map((src, idx) => (
                <div
                  key={idx}
                  className="relative cursor-pointer"
                  onClick={() => setThumbnailIdx(idx)} // ✅ 클릭으로 대표 변경
                >
                  <img
                    src={src}
                    alt={`preview-${idx}`}
                    className={`w-32 h-32 object-cover border rounded ${
                      idx === thumbnailIdx ? "ring-4 ring-blue-500" : ""
                    }`}
                  />
                  {/* 대표 이미지 표시 */}
                  {idx === thumbnailIdx && (
                    <span className="absolute top-1 left-1 bg-blue-600 text-white text-xs px-2 py-0.5 rounded">
                      대표
                    </span>
                  )}
                  {/* 제거 버튼 */}
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation(); // 삭제 클릭 시 대표 변경 막음
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
          onClick={handleClickAdd}
        >
          등록
        </button>
      </div>
    </div>
  );
};

export default WriteForm;
