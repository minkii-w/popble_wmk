// src/pages/boards/ad/AdDetail.js
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getAdOne, deleteAd, API_SERVER_HOST } from "../../../api/AdBoardApi";

export default function AdDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        setError("");
        const data = await getAdOne(id);
        setPost(data);
      } catch (e) {
        setError(e?.message || "게시글을 불러올 수 없습니다.");
      } finally {
        setLoading(false);
      }
    })();
  }, [id]);

  if (loading) return <div className="p-6">불러오는 중...</div>;
  if (error) return <div className="p-6 text-red-600">{error}</div>;
  if (!post) return <div className="p-6">존재하지 않는 게시글입니다.</div>;

  const handleDelete = async () => {
    if (window.confirm("정말 삭제하시겠습니까?")) {
      await deleteAd(id);
      navigate("/boards/ad");
    }
  };

  return (
    <div className="p-6 flex flex-col min-h-[80vh]">
      {/* 본문 영역 */}
      <div className="flex-1 space-y-4">
        <h1 className="text-2xl font-bold">{post.title}</h1>
        <div className="text-gray-500 text-sm">
          작성자: {post.writerName || "익명"}
        </div>
        <p className="whitespace-pre-wrap">{post.content}</p>

        {/* 🔹 이미지 영역: 세로 나열, 반응형 */}
        {(post.imageList?.length > 0 || post.detailImages?.length > 0) && (
          <div className="flex flex-col gap-4 mt-4 items-center">
            {post.imageList?.map((img, i) => (
              <img
                key={`img-${i}`}
                src={
                  img.url
                    ? `${API_SERVER_HOST}${img.url}`
                    : `${API_SERVER_HOST}/uploads/${img.folder}/${img.storedName}`
                }
                alt=""
                className="w-full max-w-[600px] rounded-lg object-contain"
              />
            ))}

            {post.detailImages?.map((img, i) => (
              <img
                key={`detail-${i}`}
                src={`${API_SERVER_HOST}${img.path}/${img.uuid}_${img.originalName}`}
                alt=""
                className="w-full max-w-[600px] rounded-lg object-contain"
              />
            ))}
          </div>
        )}
      </div>

      {/* 버튼 영역 */}
      <div className="mt-6 flex justify-between items-center border-t pt-4">
        {/* 왼쪽: 목록 버튼 */}
        <button
          onClick={() => navigate("/boards/ad")}
          className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300"
        >
          목록
        </button>

        {/* 오른쪽: 수정/삭제 버튼 */}
        <div className="flex gap-2">
          <button
            onClick={() => navigate(`/boards/ad/${id}/modify`)}
            className="px-4 py-2 bg-yellow-400 text-white rounded-lg hover:brightness-95"
          >
            수정
          </button>
          <button
            onClick={handleDelete}
            className="px-4 py-2 bg-red-500 text-white rounded-lg hover:brightness-95"
          >
            삭제
          </button>
        </div>
      </div>
    </div>
  );
}
