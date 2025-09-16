// src/pages/boards/AllBoardList.jsx
import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { getAll } from "../../api/BoardApi"; // ✅ 전체 목록 API (핀 우선 정렬 지원)

const toTypeSlug = (t) => (t ? String(t).toLowerCase() : "general");

export default function AllBoardList() {
  // state
  const [posts, setPosts] = useState([]);
  const [order, setOrder] = useState("date"); // "date" | "oldest" | "view" | "recommend"
  const [keyword, setKeyword] = useState(""); // 🔎 검색어
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // fetch
  useEffect(() => {
    let ignore = false;
    (async () => {
      try {
        setLoading(true);
        setError("");
        const data = await getAll({ order }); // ✅ 정렬 전달
        if (!ignore) setPosts(Array.isArray(data) ? data : []);
      } catch (e) {
        if (!ignore) setError(e?.message || "불러오기 실패");
      } finally {
        if (!ignore) setLoading(false);
      }
    })();
    return () => { ignore = true; };
  }, [order]);

  // 🔎 프론트 단 검색 필터링 (title, writer, writerName)
  const filtered = useMemo(() => {
    const q = keyword.trim().toLowerCase();
    if (!q) return posts;
    return posts.filter((p) => {
      const title = (p.title ?? "").toLowerCase();
      const w1 = (p.writer ?? "").toLowerCase();
      const w2 = (p.writerName ?? "").toLowerCase();
      return title.includes(q) || w1.includes(q) || w2.includes(q);
    });
  }, [posts, keyword]);

  // UI
  return (
    <div className="p-6 w-full bg-white">
      {/* 헤더 */}
      <div className="flex items-center justify-between mb-4 gap-3">
        <h1 className="text-2xl font-bold">전체 게시글</h1>

        {/* 우측: 검색창(왼쪽) + 정렬 드롭다운(오른쪽) */}
        <div className="ml-auto flex items-center gap-2">
          {/* 검색 */}
          <input
            type="text"
            placeholder="검색어를 입력하세요"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            className="border rounded px-3 py-1 w-48"
          />
          {/* 정렬 */}
          <div className="flex items-center gap-2">
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
        </div>
      </div>

      {loading && <div>불러오는 중...</div>}
      {error && <div className="text-red-600">에러: {error}</div>}

      {/* 리스트 */}
      <table className="table-auto w-full border-collapse border border-gray-300 mt-2">
        <thead className="bg-gray-100">
          <tr>
            <th className="border border-gray-300 px-4 py-2 w-16">번호</th>
            <th className="border border-gray-300 px-4 py-2 w-28">게시판</th>
            <th className="border border-gray-300 px-4 py-2">제목</th>
            <th className="border border-gray-300 px-4 py-2 w-32">작성자</th>
            <th className="border border-gray-300 px-4 py-2 w-36">작성일</th>
          </tr>
        </thead>
        <tbody>
          {(!loading && filtered.length === 0) ? (
            <tr>
              <td className="border px-4 py-6 text-center" colSpan={5}>
                게시글이 없습니다.
              </td>
            </tr>
          ) : (
            filtered.map((post) => {
              const isPinned = !!post.pinnedGlobal;
              return (
                <tr
                  key={post.id}
                  className={`hover:bg-gray-50 ${isPinned ? "bg-purple-50" : ""}`}
                >
                  <td className="border border-gray-300 px-4 py-2 text-center">
                    {post.id}
                  </td>
                  <td className="border border-gray-300 px-4 py-2 text-center">
                    {post.type}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    <Link
                      to={`/boards/${toTypeSlug(post.type)}/${post.id}`}
                      className="inline-flex items-center gap-1 text-blue-600 hover:underline max-w-full"
                    >
                      {isPinned && <span title="고정 공지" aria-label="고정 공지">📌</span>}
                      <span className="truncate">{post.title}</span>
                      {post.images?.length > 0 && (
                        <span title="이미지 포함" aria-label="이미지 포함">🖼️</span>
                      )}
                    </Link>
                  </td>
                  <td className="border border-gray-300 px-4 py-2 text-center">
                    {post.writer ?? post.writerName ?? post.writerId ?? "-"}
                  </td>
                  <td className="border border-gray-300 px-4 py-2 text-center">
                    {post.createTime?.slice(0, 10) ?? "-"}
                  </td>
                </tr>
              );
            })
          )}
        </tbody>
      </table>

      {/* 하단 우측: 글쓰기 버튼 */}
      <div className="mt-4 flex justify-end">
        <Link
          to="/boards/write"
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
        >
          글쓰기
        </Link>
      </div>
    </div>
  );
}
