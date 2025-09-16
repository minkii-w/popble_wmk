import { Outlet, Link, useLocation } from "react-router-dom";
import BasicLayout from "./BasicLayout";

const BoardsLayout = () => {
  const location = useLocation();

  const menus = [
    { path: "all", label: "전체" },          // ✅ 전체 버튼 추가
    { path: "general", label: "자유게시판" },
    { path: "qna", label: "질문게시판" },
    { path: "review", label: "리뷰게시판" },
    { path: "notice", label: "공지게시판" },
    { path: "ad", label: "홍보게시판" },
  ];

  const isActive = (p) => location.pathname.startsWith(`/boards/${p}`);

  return (
    <BasicLayout>
      <div className="p-6 w-full">
        {/* 제목 클릭 시 전체 글(/boards/all)로 이동 */}
        <Link
          to="/boards/all"
          className="inline-block mb-6 group"
          title="전체 게시물 보기"
        >
          <h1 className="text-2xl font-bold">
            <span className="group-hover:underline group-hover:text-blue-600 transition-colors">
              📂 게시판
            </span>
          </h1>
        </Link>

        {/* 메뉴 네비게이션 */}
        <nav className="flex flex-wrap gap-2 mb-6">
          {menus.map((menu) => (
            <Link
              key={menu.path}
              to={`/boards/${menu.path}`}
              className={`px-4 py-2 rounded border ${
                isActive(menu.path)
                  ? "bg-blue-500 text-white border-blue-500"
                  : "bg-white hover:bg-gray-50"
              }`}
            >
              {menu.label}
            </Link>
          ))}
        </nav>

        {/* 게시판 페이지가 렌더링될 영역 */}
        <div className="bg-white p-4 rounded shadow">
          <Outlet />
        </div>
      </div>
    </BasicLayout>
  );
};

export default BoardsLayout;
