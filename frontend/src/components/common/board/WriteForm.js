// src/pages/boards/common/WriteForm.jsx
import { useEffect, useRef, useState } from "react";
import { postAddWithImages } from "../../../api/BoardApi"; // ← 이미지 포함 등록 함수 사용
import useCustomMove from "../../../hooks/useCustomMove";
import ResultModal from "./ResultModal";

const initState = {
  id: null,
  type: "GENERAL", // 기본 게시판 설정
  title: "",
  content: "",
  writerId: "",
  popupStoreId: "", // 리뷰 게시판용
};

const BOARD_TYPES = ["GENERAL", "QNA", "REVIEW", "NOTICE", "AD"];

const WriteForm = () => {
  const [board, setBoard] = useState({ ...initState });
  const [result, setResult] = useState(null); // 게시글 ID 생성
  const [files, setFiles] = useState([]); // 🔹 이미지 파일 상태
  const [previews, setPreviews] = useState([]); // 🔹 미리보기 URL들
  const fileInputRef = useRef(null);
  const { moveToList } = useCustomMove();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBoard((prev) => ({ ...prev, [name]: value }));
  };

  // 🔹 파일 선택 핸들러 + 미리보기 생성
  const handleFileChange = (e) => {
    const sel = Array.from(e.target.files || []);
    setFiles(sel);
  };

  // 🔹 파일 변경 시 미리보기 URL 생성/정리
  useEffect(() => {
    // 이전 URL revoke
    previews.forEach((u) => URL.revokeObjectURL(u));
    const urls = files.map((f) => URL.createObjectURL(f));
    setPreviews(urls);
    // 언마운트 시에도 revoke
    return () => urls.forEach((u) => URL.revokeObjectURL(u));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [files]);

  const handleClickAdd = async () => {
    if (!board.title.trim()) return alert("제목을 입력하세요.");
    if (!board.content.trim()) return alert("내용을 입력하세요.");
    if (!board.writerId) return alert("작성자 ID를 입력하세요.");
    if (board.type === "REVIEW" && !board.popupStoreId)
      return alert("리뷰 게시판은 popupStoreId가 필요합니다.");

    try {
      const payload = {
        type: board.type,
        title: board.title,
        content: board.content,
        writerId: board.writerId ? Number(board.writerId) : null,
        ...(board.type === "REVIEW" && board.popupStoreId
          ? { popupStoreId: Number(board.popupStoreId) }
          : {}),
      };

      const res = await postAddWithImages(payload, files);
      const createId =
        typeof res === "number" ? res : res?.id ?? res?.boardId ?? res?.tno ?? null;

      setResult(createId);

      setBoard((prev) => ({ ...initState, type: prev.type }));
      setFiles([]);
      if (fileInputRef.current) fileInputRef.current.value = null;
    } catch (e) {
      console.error(e);
      alert("등록 중 오류 발생");
    }
  };

  const closeModal = () => {
    setResult(null);
    moveToList();
  };

  return (
    <div className="border-2 border-sky-200 mt-10 p-4 rounded">
      {/* 등록 성공 모달 */}
      {result && (
        <ResultModal
          title={"글 등록"}
          content={`${result}번 글 등록`}
          callbackFn={closeModal}
        ></ResultModal>
      )}

      {/* TYPE */}
      <div className="flex justify-center">
        <div className="relative mb-4 w-full flex-wrap items-stretch">
          <div className="w-1/5 p-6 text-right font-bold">TYPE</div>
          <select
            className="w-4/5 p-6 rounded border border-neutral-500 shadow-md"
            name="type"
            value={board.type}
            onChange={handleChange}
          >
            {BOARD_TYPES.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* REVIEW 전용 입력 */}
      {board.type === "REVIEW" && (
        <div className="flex justify-center">
          <div className="relative mb-4 w-full flex-wrap items-stretch">
            <div className="w-1/5 p-6 text-right font-bold">POPUP STORE ID</div>
            <input
              className="w-4/5 p-6 rounded border border-neutral-500 shadow-md"
              name="popupStoreId"
              type="number"
              value={board.popupStoreId}
              onChange={handleChange}
              placeholder="리뷰 대상 팝업스토어 ID"
            ></input>
          </div>
        </div>
      )}

      {/* TITLE */}
      <div className="flex justify-center">
        <div className="relative mb-4 w-full flex-wrap items-stretch">
          <div className="w-1/5 p-6 text-right font-bold">TITLE</div>
          <input
            className="w-4/5 p-6 rounded border border-neutral-500 shadow-md"
            name="title"
            type="text"
            value={board.title}
            onChange={handleChange}
            maxLength={200}
          ></input>
        </div>
      </div>

      {/* CONTENT */}
      <div className="flex justify-center">
        <div className="relative mb-4 w-full flex-wrap items-stretch">
          <div className="w-1/5 p-6 text-right font-bold">CONTENT</div>
          <textarea
            className="w-4/5 p-6 rounded border border-neutral-500 shadow-md h-64"
            name="content"
            value={board.content}
            onChange={handleChange}
            placeholder="내용을 입력하세요."
          ></textarea>
        </div>
      </div>

      {/* WRITER ID */}
      <div className="flex justify-center">
        <div className="relative mb-4 w-full flex-wrap items-stretch">
          <div className="w-1/5 p-6 text-right font-bold">WRITER ID</div>
          <input
            className="w-4/5 p-6 rounded border border-neutral-500 shadow-md"
            name="writerId"
            type="number"
            value={board.writerId}
            onChange={handleChange}
            placeholder="작성자 UserProfile ID"
          ></input>
        </div>
      </div>

      {/* 🔹 IMAGES + 미리보기 */}
      <div className="flex justify-center">
        <div className="relative mb-4 w-full flex-wrap items-stretch">
          <div className="w-1/5 p-6 text-right font-bold">IMAGES</div>
          <div className="w-4/5">
            <input
              ref={fileInputRef}
              className="w-full p-6 rounded border border-neutral-500 shadow-md"
              type="file"
              accept="image/*"
              multiple
              onChange={handleFileChange}
            />
            {files.length > 0 && (
              <>
                <div className="mt-2 text-sm text-neutral-600">
                  {files.length}개 선택됨: {files.map((f) => f.name).join(", ")}
                </div>
                <div className="flex flex-col gap-4 mt-3 items-start">
                  {previews.map((src, i) => (
                    <img
                      key={i}
                      src={src}
                      alt=""
                      className="w-full max-w-[600px] h-auto rounded"
                    />
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      {/* ADD 버튼 */}
      <div className="flex justify-end">
        <div className="relative mb-4 flex p-4 flex-wrap items-stretch">
          <button
            type="button"
            className="rounded p-4 w-36 bg-blue-500 text-xl text-white"
            onClick={handleClickAdd}
          >
            ADD
          </button>
        </div>
      </div>
    </div>
  );
};

export default WriteForm;
