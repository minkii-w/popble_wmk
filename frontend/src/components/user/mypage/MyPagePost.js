import { FcDocument } from "react-icons/fc";

const MyPagePost = () => {
  return (
    <div>
      <div className="text-2xl flex flex-row">
        <FcDocument size={25} className="m-2" />
        <p className="m-2 text-2xl">내 게시글 보기</p>
      </div>
      <hr className="border-subSecondColor border-2 mb-2"></hr>
      <div className="m-2 p-2">게시글 내용</div>

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
