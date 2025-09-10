// src/pages/boards/general/ListPage.jsx
import { useState, useEffect } from "react"
import { Link } from "react-router-dom"

// 임시 더미 데이터
const dummyPosts = [
  { id: 1, title: "테스트1", writer: "ㅇㅇ", createTime: "2025-09-01" },
  { id: 2, title: "테스트2", writer: "qwer", createTime: "2025-09-02" },
  { id: 3, title: "테스트3", writer: "wasd", createTime: "2025-09-03" },
]

const GeneralList = () => {
  const [posts, setPosts] = useState([])

  useEffect(() => {
    // 더미데이터라 나중에 교체
    setPosts(dummyPosts)
  }, [])

  return (
    <div className="p-6 w-full bg-white">
      <h1 className="text-2xl font-bold mb-4">자유게시판</h1>

      {/* 글쓰기 버튼 */}
      <div className="flex justify-end mb-4">
        <Link
          to="/boards/write"
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
        >
          글쓰기
        </Link>
      </div>

      {/* 게시글 목록 */}
      <table className="table-auto w-full border-collapse border border-gray-300">
        <thead className="bg-gray-100">
          <tr>
            <th className="border border-gray-300 px-4 py-2">번호</th>
            <th className="border border-gray-300 px-4 py-2">제목</th>
            <th className="border border-gray-300 px-4 py-2">작성자</th>
            <th className="border border-gray-300 px-4 py-2">작성일</th>
          </tr>
        </thead>
        <tbody>
          {posts.map((post) => (
            <tr key={post.id} className="hover:bg-gray-50">
              <td className="border border-gray-300 px-4 py-2 text-center">
                {post.id}
              </td>
              <td className="border border-gray-300 px-4 py-2">
                <Link
                  to={`/boards/general/${post.id}`}
                  className="text-blue-600 hover:underline"
                >
                  {post.title}
                </Link>
              </td>
              <td className="border border-gray-300 px-4 py-2 text-center">
                {post.writer}
              </td>
              <td className="border border-gray-300 px-4 py-2 text-center">
                {post.createTime}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

    </div>
  )
}

export default GeneralList
