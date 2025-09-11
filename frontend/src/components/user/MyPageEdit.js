const MyPageEdit = () => {
  return (
    <div className="flex flex-col min-h-full">
      <div className="text-2xl">
        <div className="p-2 m-2">
          <span>아이디</span>
          <input className="p-2 m-2 rounded-xl border-2 border-subFirstColor"></input>
        </div>
        <div className="p-2 m-2">
          <span>닉네임</span>
          <input
            className="p-2 m-2 rounded-xl border-2 border-subFirstColor"
            name="nickname"
          ></input>
        </div>
        <div className="p-2 m-2">
          <span>비밀번호</span>
          <input
            className="p-2 m-2 rounded-xl border-2 border-subFirstColor"
            name="password"
            type="password"
          ></input>
        </div>
        <div className="p-2 m-2">
          <span>비밀번호 재확인</span>
          {/* Todo: 비밀번호 재확인할 password2 필요? */}
          <input
            className="p-2 m-2 rounded-xl border-2 border-subFirstColor"
            name=""
            type="password"
          ></input>
        </div>
        <div className="p-2 m-2">
          <span>이메일</span>
          <input
            className="p-2 m-2 rounded-xl border-2 border-subFirstColor"
            name="email"
            type="email"
          ></input>
        </div>
      </div>

      <div className="flex justify-end items-center">
        <button className="p-5 m-5 w-[150px] h-[40px] rounded-2xl justify-center bg-primaryColor items-center">
          수정
        </button>
        <button className="p-5 m-5 w-[150px] h-[40px] rounded-2xl justify-center bg-subButtonAccentColor items-center">
          회원탈퇴
        </button>
      </div>
    </div>
  );
};

export default MyPageEdit;
