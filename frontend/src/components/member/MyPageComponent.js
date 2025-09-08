import { FcCalendar, FcDocument } from "react-icons/fc";
import { FaUserEdit, FaBookmark, FaClock } from "react-icons/fa";

const MyPageComponent = () => {
  return (
    <div className="bg-gradient-to-b from-backgroundColor">
      <div className="flex flex-col justify-center items-center">
        {/* 프로필사진 이메일 */}
        <div className="flex flex-row justify-center items-center p-4 mb-6">
          <div className="size-[150px] shadow-md m-3 p-2 rounded-full text-center">
            <img src=""></img>
            이미지
          </div>
          <div className="m-3 p-3">
            <h2 className="text-5xl font-bold p-2 m-2">POPBLE</h2>
            <p className="text-2xl p-2 m-2">popble@popble.com</p>
          </div>
        </div>
        {/* 프로필사진 이메일 끝 */}
        {/* 마이페이지 메뉴 시작*/}
        <div className="grid grid-cols-4 gap-4 bg-secondaryColor p-5 rounded-md mb-6 w-[900px] h-[180px] shadow-lg border-secondaryAccentColor border-2">
          <div className="flex flex-col items-center text-gray-700">
            <div className="flex justify-center items-center rounded-full size-[90px] bg-secondaryAccentColor shadow-md hover:border-2 border-purple-300">
              <FaUserEdit size={50} />
            </div>
            <div className="text-sm m-1 p-3">회원정보 수정/탈퇴</div>
          </div>
          <div className="flex flex-col items-center text-gray-700">
            <div className="flex justify-center items-center rounded-full size-[90px] bg-secondaryAccentColor shadow-md hover:border-2 border-purple-300">
              <FaBookmark size={50} color="red" />
            </div>
            <div className="text-sm m-1 p-3">북마크 보기</div>
          </div>
          <div className="flex flex-col items-center text-gray-700">
            <div className="flex justify-center items-center rounded-full size-[90px] bg-secondaryAccentColor shadow-md hover:border-2 border-purple-300">
              <FcDocument size={50} />
            </div>
            <div className="text-sm m-1 p-3">내가 작성한 글</div>
          </div>
          <div className="flex flex-col items-center text-gray-700">
            <div className="flex justify-center items-center rounded-full size-[90px] bg-secondaryAccentColor shadow-md hover:border-2 border-purple-300">
              <FcCalendar size={50} />
            </div>
            <div className="text-sm m-1 p-3">예약내역 확인/취소</div>
          </div>
        </div>
        {/* 마이페이지 메뉴 끝 */}
        {/* 마이페이지 내용 시작 */}
        <div className="w-[700px] h-[300px]">
          <div className="text-2xl m-2 p-2 flex flex-row">
            <FaClock size={35}></FaClock>
            최근 본 팝업
          </div>
          <hr className="border-subSecondColor border-2"></hr>
          <div></div>
        </div>
        {/* 마이페이지 내용 끝 */}
      </div>
    </div>
  );
};

export default MyPageComponent;
