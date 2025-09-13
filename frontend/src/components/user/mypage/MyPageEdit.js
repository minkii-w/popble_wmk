import { FaUserEdit } from "react-icons/fa";

const MyPageEdit = () => {
  return (
    <div className="flex flex-col w-[700px]">
      {/* 헤더 */}
      <div className="text-2xl flex flex-row">
        <FaUserEdit size={25} className="m-2" />
        <p className="m-2 text-2xl">회원정보 수정/탈퇴</p>
      </div>
      <hr className="border-subSecondColor border-2 m-4"></hr>
      <div className="flex flex-row space-x-16 justify-center my-4">
        {/* 프로필사진 추가 편집 */}
        <div className="flex flex-col items-center space-y-6 mb-8">
          {/* 원형 */}
          <div className="w-20 h-20 rounded-full border-2 border-gray-400 flex items-center">
            {/* Todo:나중에 이미지 들어올자리 */}
            {/* <img src></img> */}
          </div>
          <button className="px-3 py-1 rounded-xl border-2 border-gray-400">
            편집
          </button>
        </div>
        {/* 내용 */}
        <div className="space-y-4">
          <div className="flex items-center">
            <label className="w-32 font-medium">아이디</label>
            <input
              disabled
              className="flex-1 p-2 rounded-xl border-2 border-subFirstColor"
            ></input>
          </div>
          <div className="flex items-center">
            <span className="w-32 font-medium">닉네임</span>
            <input
              className="flex-1 p-2 rounded-xl border-2 border-subFirstColor"
              name="nickname"
            ></input>
          </div>
          <div className="flex items-center">
            <span className="w-32 font-medium">비밀번호</span>
            <input
              className="flex-1 p-2 rounded-xl border-2 border-subFirstColor"
              name="password"
              type="password"
            ></input>
          </div>
          <div className="flex items-center">
            <span className="w-32 font-medium">비밀번호 재확인</span>
            {/* Todo: 비밀번호 재확인할 password2 필요? */}
            <input
              className="flex-1 p-2 rounded-xl border-2 border-subFirstColor"
              name=""
              type="password"
            ></input>
          </div>
          <div className="flex items-center">
            <span className="w-32 font-medium">이메일</span>
            <input
              className="flex-1 p-2 rounded-xl border-2 border-subFirstColor"
              name="email"
              type="email"
            ></input>
          </div>
        </div>
      </div>
      <hr className="border-subSecondColor border-2 m-4"></hr>
      {/* 버튼 */}
      <div className="flex justify-end space-x-4 mt-6">
        <button className="w-[120px] h-[40px] rounded-2xl text-gray-700 bg-primaryColor border-blue-300 border-2 hover:opacity-90 shadow-md">
          수정
        </button>
        <button className="text-sm w-[120px] h-[40px] rounded-2xl text-gray-700 bg-subButtonAccentColor border-red-300 border-2 hover:opacity-90 shadow-md ">
          회원탈퇴
        </button>
      </div>
    </div>
  );
};

export default MyPageEdit;
