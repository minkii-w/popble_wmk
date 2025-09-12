import { useEffect, useState } from "react";
import MyPageMenuComponent from "../mypage/MyPageMenuComponent";
import { Outlet, useNavigate, useParams } from "react-router-dom";

const MyPageComponent = () => {
  const { menu } = useParams();
  const navigate = useNavigate();
  // const [selectedMenu, setSelectedMenu] = useState();

  const handleMenuClick = (key) => {
    navigate(`/user/mypage/${key}`);
  };

  return (
    <div className="bg-gradient-to-b from-backgroundColor min-h-screen">
      <div className="flex flex-col justify-center items-center">
        {/* 프로필사진 이메일 */}
        <div className="flex flex-row justify-center items-center p-4 mb-6">
          <div className="size-[150px] shadow-md m-3 p-2 rounded-full text-center">
            {/* <img src=""></img> */}
            이미지
          </div>
          <div className="m-3 p-3">
            <h2 className="text-5xl font-bold p-2 m-2 tracking-widest">
              POPBLE
            </h2>
            <p className="text-2xl p-2 m-2 tracking-wide">popble@popble.com</p>
          </div>
        </div>
        {/* 프로필사진 이메일 끝 */}
        {/* 마이페이지 메뉴 시작*/}
        <MyPageMenuComponent
          selectedMenu={menu || "default"}
          onMenuClick={handleMenuClick}
        ></MyPageMenuComponent>
        {/* 마이페이지 메뉴 끝 */}
        {/* 마이페이지 내용 시작 */}
        <div>
          <Outlet></Outlet>
        </div>
        {/* 마이페이지 내용 끝 */}
      </div>
    </div>
  );
};

export default MyPageComponent;
