// src/pages/boards/notice/NoticeList.jsx
import { useState, useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import { getList } from "../../../api/BoardApi";

const NoticeList = () => {
  const [posts, setPosts] = useState([]);
  const [order, setOrder] = useState("date");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let ignore = false;
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await getList({ type: "NOTICE", order });
        if (!ignore) setPosts(Array.isArray(data) ? data : []);
      } catch (e) {
        if (!ignore) setError(e.message || "목록 불러오기 실패");
      } finally {
        if (!ignore) setLoading(false);
      }
    };
    fetchData();
    return () => {
      ignore = true;
    };
  }, [order]);

  // ✅ 고정글 최상단 정렬
  const sortedPosts = useMemo(() => {
    const pinned = posts.filter((p) => p.pinnedGlobal);
    const normal = posts.filter((p) => !p.pinnedGlobal);
    return [...pinned, ...normal];
  }, [posts]);

  if (loading) return <div className="p-6">불러오는 중...</div>;
  if (error) return <div className="p-6 text-red-600">에러: {error}</div>;

  return (
    <div className="p-6 w-full bg-white">
      <div className="flex items-center justify-between mb-4 gap-3">
        <h1 className="text-2xl font-bold">공지사항</h1>

        {/* 정렬 선택 */}
        <div className="ml-auto flex items-center gap-2">
          <label className="text-sm text-gray-600">정렬:</label>
          <select
            className="border rounded px-2 py-1"
            value={order}
            onChange={(e) => setOrder(e.target.value)}
          >
            <option value="date">일자(최신)</option>
            <option value="oldest">일자(과거)</option>
            <option value="view">조회수</option>
            <option value="recommend">추천</option>
          </select>
        </div>

        <Link
          to="/boards/write"
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
        >
          글쓰기
        </Link>
      </div>

      <table className="table-auto w-full border-collapse border border-gray-300">
        <thead className="bg-gray-100">
          <tr>
            <th className="border border-gray-300 px-4 py-2 w-20">번호</th>
            <th className="border border-gray-300 px-4 py-2">제목</th>
            <th className="border border-gray-300 px-4 py-2 w-32">작성자</th>
            <th className="border border-gray-300 px-4 py-2 w-36">작성일</th>
          </tr>
        </thead>
        <tbody>
          {sortedPosts.length === 0 ? (
            <tr>
              <td className="border px-4 py-6 text-center" colSpan={4}>
                게시글이 없습니다.
              </td>
            </tr>
          ) : (
            sortedPosts.map((post) => (
              <tr
                key={post.id}
                className={`hover:bg-gray-50 ${
                  post.pinnedGlobal ? "bg-purple-50" : ""
                }`}
              >
                {/* 번호 → 고정글이면 "공지", 아니면 id */}
                <td className="border border-gray-300 px-4 py-2 text-center font-semibold">
                  {post.pinnedGlobal ? "공지" : post.id}
                </td>

                <td className="border border-gray-300 px-4 py-2">
                  <Link
                    to={`/boards/notice/${post.id}`}
                    className="inline-flex items-center gap-1 text-blue-600 hover:underline max-w-full"
                  >
                    {post.pinnedGlobal && <span title="고정 공지">📌</span>}
                    <span className="truncate">{post.title}</span>
                    {post.images?.length > 0 && (
                      <span title="이미지 포함" aria-label="이미지 포함">
                        🖼️
                      </span>
                    )}
                  </Link>
                </td>

                <td className="border border-gray-300 px-4 py-2 text-center">
                  {post.writer ?? post.writerName ?? "-"}
                </td>
                <td className="border border-gray-300 px-4 py-2 text-center">
                  {post.createTime?.slice(0, 10) ?? "-"}
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default NoticeList;
