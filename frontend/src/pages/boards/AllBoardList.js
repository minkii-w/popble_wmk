import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { getAll } from "../../api/BoardApi";  // ✅ PageResponseDTO 반환

// 게시판 타입 한글 매핑
const typeLabel = (t) => {
  const map = {
    general: "자유",
    qna: "질문",
    notice: "공지",
  };
  return map[String(t).toLowerCase()] || t;
};

// 타입 → slug
const toTypeSlug = (t) => (t ? String(t).toLowerCase() : "general");

export default function AllBoardList() {
  const [pageData, setPageData] = useState(null); // ✅ PageResponseDTO 전체
  const [order, setOrder] = useState("date");
  const [keyword, setKeyword] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [page, setPage] = useState(1);

  // ==========================
  // 서버 호출
  // ==========================
  useEffect(() => {
    let ignore = false;
    (async () => {
      try {
        setLoading(true);
        setError("");

        const data = await getAll({ order, page, size: 10 }); // ✅ size=10 고정
        if (!ignore) setPageData(data);
      } catch (e) {
        if (!ignore) setError(e?.message || "불러오기 실패");
      } finally {
        if (!ignore) setLoading(false);
      }
    })();
    return () => {
      ignore = true;
    };
  }, [order, page]);

  // ==========================
  // 검색 + pinned 처리
  // ==========================
  const filtered = useMemo(() => {
    const list = pageData?.dtoList ?? [];
    const q = keyword.trim().toLowerCase();

    // 검색어 적용
    let result = q
      ? list.filter((p) => {
          const title = (p.title ?? "").toLowerCase();
          const writer = (p.writer ?? p.writerName ?? "").toLowerCase();
          return title.includes(q) || writer.includes(q);
        })
      : list;

    // pinnedGlobal → 1페이지일 때만 상단 고정
    if (page === 1) {
      result = [...result].sort((a, b) => {
        if (a.pinnedGlobal && !b.pinnedGlobal) return -1;
        if (!a.pinnedGlobal && b.pinnedGlobal) return 1;
        return new Date(b.createTime) - new Date(a.createTime);
      });
    }

    return result;
  }, [pageData, keyword, page]);

  // ==========================
  // 렌더링
  // ==========================
  return (
    <div className="p-6 w-full bg-white">
      {/* 상단 검색/정렬 */}
      <div className="flex items-center justify-between mb-4 gap-3">
        <h1 className="text-2xl font-bold">전체 게시글</h1>

        <div className="ml-auto flex items-center gap-2">
          <input
            type="text"
            placeholder="검색어를 입력하세요"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            className="border rounded px-3 py-1 w-48"
          />
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

      {/* 표 형식 게시판 */}
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
          {!loading && filtered.length === 0 ? (
            <tr>
              <td colSpan={5} className="border px-4 py-6 text-center">
                게시글이 없습니다.
              </td>
            </tr>
          ) : (
            filtered.map((post, idx) => {
              const isPinned = !!post.pinnedGlobal;
              return (
                <tr
                  key={`${toTypeSlug(post.type)}-${post.id}-${idx}`}
                  className={`hover:bg-gray-50 ${
                    isPinned && page === 1 ? "bg-purple-50" : ""
                  }`}
                >
                  <td className="border border-gray-300 px-4 py-2 text-center">
                    {post.id}
                  </td>
                  <td className="border border-gray-300 px-4 py-2 text-center">
                    {typeLabel(post.type)}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    <Link
                      to={`/boards/${toTypeSlug(post.type)}/${post.id}`}
                      className="inline-flex items-center gap-1 text-blue-600 hover:underline max-w-full"
                    >
                      {isPinned && page === 1 && (
                        <span title="고정 공지">📌</span>
                      )}
                      <span className="truncate">{post.title}</span>
                      {post.images?.length > 0 && (
                        <span title="이미지 포함">🖼️</span>
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
              );
            })
          )}
        </tbody>
      </table>

      {/* 페이지네이션 */}
      {pageData && (
        <div className="flex justify-center mt-6 gap-2 flex-wrap">
          {pageData.prev && (
            <button
              onClick={() => setPage(pageData.prevPage)}
              className="px-3 py-1 rounded border bg-gray-100 hover:bg-gray-200"
            >
              이전
            </button>
          )}

          {pageData.pageNumList?.map((num) => (
            <button
              key={num}
              onClick={() => setPage(num)}
              className={`px-3 py-1 rounded border ${
                num === pageData.current
                  ? "bg-blue-500 text-white"
                  : "bg-white hover:bg-gray-100"
              }`}
            >
              {num}
            </button>
          ))}

          {pageData.next && (
            <button
              onClick={() => setPage(pageData.nextPage)}
              className="px-3 py-1 rounded border bg-gray-100 hover:bg-gray-200"
            >
              다음
            </button>
          )}
        </div>
      )}

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
