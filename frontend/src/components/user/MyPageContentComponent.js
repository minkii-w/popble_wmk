import { FaClock, FaUserEdit, FaBookmark } from "react-icons/fa";
import { FcDocument, FcCalendar } from "react-icons/fc";
import MyPageBookmark from "../user/MyPageBookmark";
import MyPageReservation from "../user/MyPageReservation";
import MyPageEdit from "./MyPageEdit";

const MyPageContentComponent = ({ selectedMenu }) => {
  if (selectedMenu === "") {
    return (
      <div className="w-[700px] h-[300px]">
        <div className="text-2xl flex flex-row">
          <FaUserEdit size={25} className="m-2" />
          <p className="m-2 text-2xl">회원정보 수정/탈퇴</p>
        </div>
        <hr className="border-subSecondColor border-2"></hr>
        <div>
          <MyPageEdit />
        </div>
      </div>
    );
  } else if (selectedMenu === "") {
    return (
      <div className="w-[700px] h-[300px]">
        <div className="text-2xl flex flex-row">
          <FaBookmark size={25} color="red" className="m-2" />
          <p className="m-2 text-2xl">북마크</p>
        </div>
        <hr className="border-subSecondColor border-2"></hr>
        <MyPageBookmark />
      </div>
    );
  } else if (selectedMenu === "myBoard") {
    return (
      <div className="w-[700px] h-[300px]">
        {/* 게시글 */}
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
  } else if (selectedMenu === "myReservation") {
    return (
      <div className="w-[700px] h-[300px]">
        <div className="text-2xl flex flex-row">
          <FcCalendar size={25} className="m-2" />
          <p className="m-2 text-2xl">예약내역 확인/취소</p>
        </div>
        <hr className="border-subSecondColor border-2"></hr>
        <div>
          <MyPageReservation />
        </div>
      </div>
    );
  } else {
    return (
      <div className="w-[700px] h-[300px]">
        <div className="text-2xl m-2 p-2 flex flex-row">
          <FaClock size={25} className="m-2" />
          <p className="m-2 text-2xl">최근 본 팝업</p>
        </div>
        {/* 구분선 */}
        <div className="w-[600px] ">
          <hr className="my-4 border-t-2 border-subSecondColor"></hr>
        </div>

        <div></div>
        <div></div>
      </div>
    );
  }
};

export default MyPageContentComponent;
