import { FcDocument } from "react-icons/fc";
import { useState, useEffect } from "react";
import { getList } from "../../../api/BoardApi";

const MyPagePost = () => {
  const [posts, setPosts] = useState([]);
  const [category, setCategory] = useState("ALL");

  useEffect(() => {
    const type = category === "ALL" ? null : category;
    getList({ type }).then((data) => setPosts(data));
  }, [category]);

  return (
    <div className="w-[700px]">
      <div className="text-2xl flex flex-row">
        <FcDocument size={25} className="m-2" />
        <p className="m-2 text-2xl">내 게시글 보기</p>
      </div>
      {/* 게시판 선택 selectbox */}
      <hr className="border-subSecondColor border-2 mb-2"></hr>
      <div className="flex justify-start mb-3">
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="border p-2 rounded-lg"
        >
          <option value={"ALL"}>전체</option>
          <option value={"GENERAL"}>자유</option>
          <option value={"QNA"}>QNA</option>
          {/* <option value={"리뷰"}>리뷰</option> */}
        </select>
      </div>
      {/* 게시글 목록 */}
      <table className="w-full">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-2 border w-2/12">카테고리</th>
            <th className="p-2 border w-6/12">제목</th>
            <th className="p-2 border w-2/12">작성일</th>
            <th className="p-2 border w-1/12">조회수</th>
          </tr>
        </thead>
        <tbody>
          {posts.length > 0 ? (
            posts.map((post) => (
              <tr key={post.id} className="text-center">
                <th className="p-2 border">{post.type}</th>
                <th className="p-2 border cursor-pointer" onClick={() => {}}>
                  {post.title}
                </th>
                <th className="p-2 border">{post.createAt}</th>
                <th className="p-2 border">{post.views}</th>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={4} className="p-5 text-gray-500 text-center">
                게시글이 없습니다.
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {/* 답변 */}
      <div className="text-2xl   flex flex-row">
        <FcDocument size={25} className="m-2" />
        <p className="m-2 text-2xl">내 답변글 보기</p>
      </div>
      <hr className="border-subSecondColor border-2"></hr>
      <div className="m-2 p-2">답변글</div>
    </div>
  );
};

export default MyPagePost;
