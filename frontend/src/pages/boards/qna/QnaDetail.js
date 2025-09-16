// src/pages/boards/qna/QnaDetail.jsx
import { useParams, Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { getOne, deleteOne } from "../../../api/BoardApi"; // ✅ deleteOne 추가

const QnaDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [deleting, setDeleting] = useState(false);          // ✅ 삭제중 상태

  useEffect(() => {
    let ignore = false;
    (async () => {
      try {
        setLoading(true);
        setError("");
        const data = await getOne(id);        // ✅ 실제 데이터 조회
        if (!ignore) setPost(data);
      } catch (e) {
        if (!ignore) {
          const status = e?.response?.status;
          setError(status === 404 ? "존재하지 않는 질문입니다." : "불러오기 실패");
        }
      } finally {
        if (!ignore) setLoading(false);
      }
    })();
    return () => { ignore = true; };
  }, [id]);

  const goModify = () => {
    navigate(`/boards/qna/${id}/modify`);
  };

  const onDelete = async () => {                                 // ✅ 삭제 핸들러
    if (!window.confirm("정말 삭제할까요?")) return;
    try {
      setDeleting(true);
      await deleteOne(id);
      alert("삭제되었습니다.");
      navigate("/boards/qna");                                   // ✅ 목록으로 이동
    } catch (e) {
      alert(e?.response?.status === 404 ? "이미 삭제되었거나 존재하지 않습니다." : "삭제 실패");
    } finally {
      setDeleting(false);
    }
  };

  const fmtDate = (v) => (v ? new Date(v).toLocaleString() : "-");

  if (loading) return <div className="p-6">로딩 중...</div>;
  if (error) return <div className="p-6 text-red-600">{error}</div>;
  if (!post) return null;

  return (
    <div className="p-6 bg-white rounded shadow">
      <h1 className="text-2xl font-bold mb-4">{post.title}</h1>

      <div className="text-sm text-gray-500 mb-6">
        작성자: <span className="font-semibold">{post.writer ?? post.writerId ?? "-"}</span> | {fmtDate(post.createTime)}
      </div>

      {/* 🔹 이미지 영역 (있을 때만) */}
      {post.images?.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-6">
          {post.images.map((im) => (
            <img
              key={im.id}
              src={im.url}     // BoardApi에서 절대 URL로 보정됨
              alt=""
              loading="lazy"
              className="w-full h-auto rounded-lg"
            />
          ))}
        </div>
      )}

      <div className="mb-8 leading-relaxed whitespace-pre-wrap">{post.content}</div>

      <div className="flex justify-between">
        <Link
          to="/boards/qna"
          className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
        >
          목록
        </Link>
        <div className="space-x-2">
          <button
            type="button"
            onClick={goModify}
            className="px-4 py-2 bg-yellow-400 text-white rounded hover:bg-yellow-500"
          >
            수정
          </button>
          <button
            type="button"
            onClick={onDelete}                                     // ✅ 연결
            disabled={deleting}
            className={`px-4 py-2 text-white rounded ${
              deleting ? "bg-red-300 cursor-not-allowed" : "bg-red-500 hover:bg-red-600"
            }`}
          >
            {deleting ? "삭제중..." : "삭제"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default QnaDetail;
