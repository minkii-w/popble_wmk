import { useEffect, useState } from "react";
import MyPageMenuComponent from "../mypage/MyPageMenuComponent";
import { Outlet, useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { API_SERVER_HOST } from "../../../api/popupstoreApi";
import { getUserProfileByUserId } from "../../../api/userProfileApi";

const MyPageComponent = () => {
  const { menu } = useParams();
  const navigate = useNavigate();
  // const [selectedMenu, setSelectedMenu] = useState();

  const user = useSelector((state) => state.auth?.user);
  //현재 userProfile이 undefined로 나옴
  // const userProfile = useSelector((state) => state.auth?.userProfile);
  // console.log("REDUX에 저장된 userProfile:", userProfile);
  const [profileImgUrl, setProfileImgUrl] = useState(null);
  const [nickname, setNickname] = useState("POPBLE");
  const [email, setEmail] = useState("popble@popble.com");

  const formatImageUrl = (path) => {
    if (!path) return null;
    return `${API_SERVER_HOST}${path}`;
  };

  useEffect(() => {
    if (!user?.id) return;
    setEmail(user.email || "");
    getUserProfileByUserId(user.id).then((data) => {
      setNickname(data.nickname || "");
      if (data.profileImg) {
        setProfileImgUrl(formatImageUrl(data.profileImg));
      } else {
        setProfileImgUrl(null);
      }
    });
  }, [user]);

  const handleMenuClick = (key) => {
    navigate(`/user/mypage/${key}`);
  };

  return (
    <div className="bg-gradient-to-b from-backgroundColor min-h-screen">
      <div className="flex flex-col justify-center items-center">
        {/* 프로필사진 이메일 */}
        <div className="flex flex-row justify-center items-center p-4 mb-6">
          <div className="size-[150px] shadow-md m-3 p-2 rounded-full text-center">
            <img
              src={profileImgUrl}
              alt="프로필사진"
              className="object-cover h-full w-full rounded-full"
            ></img>
          </div>
          <div className="m-3 p-3">
            <h2 className="text-5xl font-bold p-2 m-2 tracking-widest">
              {nickname}
            </h2>
            <p className="text-2xl p-2 m-2 tracking-wide">{email}</p>
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
