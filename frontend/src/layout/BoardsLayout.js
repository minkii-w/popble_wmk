import { Outlet, Link, useLocation } from "react-router-dom"
import BasicLayout from "./BasicLayout"

const BoardsLayout = () => {
  const location = useLocation()

  const menus = [
    { path: "general", label: "자유게시판" },
    { path: "qna", label: "질문게시판" },
    { path: "review", label: "리뷰게시판" },
    { path: "notice", label: "공지게시판" },
    { path: "ad", label: "홍보게시판" },
  ]

  return (
    <BasicLayout>
      <div className="p-6 w-full">
        <h1 className="text-2xl font-bold mb-6">📂 게시판</h1>

        {/* 메뉴 네비게이션 */}
        <nav className="flex space-x-4 mb-6">
          {menus.map((menu) => {
            const active = location.pathname.includes(menu.path)
            return (
              <Link
                key={menu.path}
                to={`/boards/${menu.path}`}
                className={`px-4 py-2 rounded ${
                  active ? "bg-blue-500 text-white" : "bg-white border"
                }`}
              >
                {menu.label}
              </Link>
            )
          })}
        </nav>

        {/* 게시판 페이지가 렌더링될 영역 */}
        <div className="bg-white p-4 rounded shadow">
          <Outlet />
        </div>
      </div>
    </BasicLayout>
  )
}

export default BoardsLayout
