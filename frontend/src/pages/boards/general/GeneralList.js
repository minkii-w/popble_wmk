import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { getList } from "../../../api/BoardApi"

const GeneralList = () => {
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    let ignore = false
    const fetchData = async () => {
      try {
        setLoading(true)
        const data = await getList({ type: "GENERAL", order: "latest" })
        if (!ignore) setPosts(Array.isArray(data) ? data : [])
      } catch (e) {
        if (!ignore) setError(e.message || "목록 불러오기 실패")
      } finally {
        if (!ignore) setLoading(false)
      }
    }
    fetchData()
    return () => { ignore = true }
  }, [])

  if (loading) return <div className="p-6">불러오는 중...</div>
  if (error) return <div className="p-6 text-red-600">에러: {error}</div>

  return (
    <div className="p-6 w-full bg-white">
      <h1 className="text-2xl font-bold mb-4">자유게시판</h1>

      <div className="flex justify-end mb-4">
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
            <th className="border border-gray-300 px-4 py-2">번호</th>
            <th className="border border-gray-300 px-4 py-2">제목</th>
            <th className="border border-gray-300 px-4 py-2">작성자</th>
            <th className="border border-gray-300 px-4 py-2">작성일</th>
          </tr>
        </thead>
        <tbody>
          {posts.length === 0 ? (
            <tr>
              <td className="border px-4 py-6 text-center" colSpan={4}>
                게시글이 없습니다.
              </td>
            </tr>
          ) : (
            posts.map((post) => (
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
  )
}

export default GeneralList
