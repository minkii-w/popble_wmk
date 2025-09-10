import { useState } from "react";
import { postAdd } from "../../../api/BoardApi";
import useCustomMove from "../../../hooks/useCustomMove";
import ResultModal from "./ResultModal";

const initState = {
    id: null,
    type : "GENERAL",           //기본 게시판 설정
    title: "",
    content: "",
    writerId: "",
    popupStoreId: ""            //리뷰 게시판용
}

const BOARD_TYPES = ["GENERAL", "QNA", "REVIEW", "NOTICE", "AD"]

const WriteForm = () => {
    
    const [board, setBoard] = useState({...initState})
    const [result, setResult] = useState(null)            //게시글 ID 생성
    const { moveToList } = useCustomMove()

    const handleChange = (e) => {
        const { name, value } = e.target
        setBoard(prev => ({ ...prev, [name]: value}))
    }

    const handleClickAdd = async () => {
        // 필수값 간단 검증
        if (!board.title.trim()) {
            alert("제목을 입력하세요.")
            return
        }
        if (!board.content.trim()) {
            alert("내용을 입력하세요.")
            return
        }
        if (!board.writerId) {
            alert("작성자 ID를 입력하세요.")
            return
        }
        if (board.type === "REVIEW" && !board.popupStoreId) {
            alert("리뷰 게시판은 popupStoreId가 필요합니다.")
            return
        }

        try{
            const payload = {
                type: board.type,
                title: board.title,
                content: board.content,
                writerId: board.writerId ? Number(board.writerId) : null,
                ...(board.type === "REVIEW" && board.popupStoreId
                    ? { popupStoreId: Number(board.popupStoreId) }
                    : {})
            }

            const res = await postAdd(payload)
            const createId = typeof res === "number" ? res : (res?.id ?? res?.boardId ?? res?.tno ?? null)

            setResult(createId)

            // 타입은 유지하면서 나머지 초기화
            setBoard(prev => ({...initState, type: prev.type}))
        }catch (e) {
            console.error(e)
            alert("등록 중 오류 발생")
        }
    }

    const closeModal = () => {
        setResult(null)
        moveToList()
    }

    return (
        <div className="border-2 border-sky-200 mt-10 p-4 rounded">

            {/*등록 성공 모달 */}
            {result && (
                <ResultModal
                    title={"글 등록"}
                    content={`${result}번 글 등록`}
                    callbackFn={closeModal}
                ></ResultModal>
            )}

            {/* 타입 선택 */}
            <div className="flex justify-center">
                <div className="relative mb-4 w-full flex-wrap items-stretch">
                    <div className="w-1/5 p-6 text-right font-bold">TYPE</div>
                    <select
                        className="w-4/5 p-6 rounded border border-neutral-500 shadow-md"
                        name="type"
                        value={board.type}
                        onChange={handleChange}
                    >
                        {BOARD_TYPES.map(t => (
                            <option key={t} value={t}>{t}</option> 
                        ))}
                    </select> 
                </div>
            </div>
            
            {/* REVIEW 게시판 전용 입력 */}
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
                    >
                    </input>
                </div>
            </div>

            {/* CONTENT */}
            <div className="flex justify-center">
                <div className="relative mb-4 w-full flex-wrap items-stretch">
                    <div className="w-1/5 p-6 text-right font-bold">CONTENT</div>
                    <textarea
                        className="w-4/5 p-6 rounded border border-neutral-500 shadow-md h-64 "
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

            {/* ADD버튼 */}
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
    )
}

export default WriteForm;
