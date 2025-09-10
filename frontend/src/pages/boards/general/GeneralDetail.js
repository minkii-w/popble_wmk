import { useParams, Link } from "react-router-dom"
import { useState, useEffect } from "react"

const dummyPost = {
  id: 1,
  title: "테스트",
  content: "테스트중",
  writer: "ㅇㅇ",
  createTime: "2025-09-01",
}

const GeneralDetail = () => {
  const { id } = useParams() // URL에서 id 추출
  const [post, setPost] = useState(null)

  useEffect(() => {
    setPost(dummyPost)
  }, [id])

  if (!post) return <div>로딩 중...</div>

  return (
    <div className="p-6 bg-white rounded shadow">
      {/* 제목 */}
      <h1 className="text-2xl font-bold mb-4">{post.title}</h1>

      {/* 작성자 / 작성일 */}
      <div className="text-sm text-gray-500 mb-6">
        작성자: <span className="font-semibold">{post.writer}</span> | {post.createTime}
      </div>

      {/* 본문 */}
      <div className="mb-8 leading-relaxed">{post.content}</div>

      {/* 버튼 영역 */}
      <div className="flex justify-between">
        <Link
          to="/boards/general"
          className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
        >
          목록
        </Link>
        <div className="space-x-2">
          <button className="px-4 py-2 bg-yellow-400 text-white rounded hover:bg-yellow-500">
            수정
          </button>
          <button className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600">
            삭제
          </button>
        </div>
      </div>
    </div>
  )
}

export default GeneralDetail
