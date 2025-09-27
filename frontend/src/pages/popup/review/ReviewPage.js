import { useEffect, useState } from "react";
import { FaStar } from "react-icons/fa6";
import { useNavigate, useParams } from "react-router-dom";

const fetchLoggedInUserNickname = async () => {
    //더미 닉넴
    return "세이"
}

const ReviewPage = () => {
    const [rating, setRating] = useState(0);    //사용자가 선택한 별점(1~5)
    const [hover, setHover] = useState(null)    //마우스 올렸을때의 심시 색상 표시
    const [nickname, setNickname] = useState("");
    const [content, setContent] = useState("");
    const [image, setImage] = useState([]); //이미지파일 배열

    const navigate = useNavigate()
    const {popupId} = useParams()   //팝업 id url에서 추출

    //회원 닉네임 가져옴
    useEffect(() => {
        const loadNickname = async () => {
            const userNickname = await fetchLoggedInUserNickname()
            setNickname(userNickname)   //가져온 닉네임 state에 설정
        }
        loadNickname()
    }, [])

    // 리뷰 등록 요청
    const handleSubmit = async (e) => {
        e.preventDefault();

        if(!popupId){
            alert("팝업 정보가 없어 리뷰를 등록할 수 없습니다")
            return;
        }

        const formData = new FormData();

        const reviewRequest = {
            popupId,
            nickname,
            content,
            rating: parseFloat(rating),
        }
        formData.append("reviewRequest", new Blob([JSON.stringify(reviewRequest)], {type: 'application/json'}))
        
        image.forEach((file) => {
            formData.append("images", file)
        })

        try {
            const res = await fetch("http://localhost:8080/api/reviews", {
                method: "POST",
                body: formData,
            });

            if (res.ok) {
                alert("리뷰 등록 완료");
                //성공 시 상태 초기화 및 페이지 이동
                setContent("");
                setRating(0);
                setImage([]);
                navigate(`/detail/${popupId}`)
            } else {
                alert("리뷰 등록 실패");
            }
        } catch (err) {
        console.error("Fetch Error:", err);
        alert("에러 발생");
        }
    };

    const handleClickStar = (index) => {
            setRating(index + 1);
        }

    const handleGoBack = () => {
        navigate(-1)
    }

    return(
        <form onSubmit={handleSubmit} className="p-4 space-y-4">
        <h2 className="text-2xl font-semibold">리뷰 등록</h2>
        <div className="w-full flex border border-black"></div>

        {/* 닉네임 자동+수정 불가 */}
        <div>
            <label className="block mb-1">작성자</label>
            <div className="border p-2 w-full rounded select-none bg-subSecondColor">
            {nickname}</div>
        </div>

        {/* 평점 */}
        <div>
            <label className="block mb-1">평점</label>
            <div className="flex gap-2">
            {[...Array(5)].map((_, index) => (
                <button
                key={index}
                type="button"
                onClick={() => setRating(index + 1)}
                onMouseEnter={() => setHover(index + 1)}
                onMouseLeave={() => setHover(null)}
                >
                <FaStar
                    size={30}
                    className={
                    index < (hover || rating)
                        ? "text-yellow-400"
                        : "text-gray-300"
                    }
                />
                </button>
            ))}
            </div>
        </div>

        {/* 내용+스크롤*/}
        <div>
            <label className="block mb-1">내용</label>
            <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="border p-2 w-full rounded h-[200px] resize-none overflow-y-auto"
            required
            />
        </div>

        {/* 이미지 업로드 */}
        <div>
            <label className="block mb-1">첨부 이미지</label>
            <input
            type="file"
            multiple    //다중 이미지
            accept="image/*"
            onChange={(e) => setImage(Array.from(e.target.files))}
            />
        </div>
        
        <div className="w-full flex border border-black"></div>

        <div className="flex justify-end gap-5">
            <button
                type="button"
                onClick={handleGoBack}
                className="border border-hash bg-white text-black px-4 py-2 rounded"
            >
                이전
            </button>
            <button
                type="submit"
                className="bg-primaryColor text-black px-4 py-2 rounded"
            >
                등록
            </button>
        </div>   
    </form>
     
    )
}
export default ReviewPage