import { useState, useEffect } from "react";
import { getUserById, updateUser, deleteUser } from "../../../api/userApi";
import { FaUserEdit } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
// import { logout } from "../../../slice/loginSlice";
import { logout, updateUserProfileRedux } from "../../../slice/authSlice";
import { useNavigate } from "react-router-dom";
import {
  getUserProfileByUserId,
  getUserProfileById,
  updateUserProfile,
} from "../../../api/userProfileApi";
import { API_SERVER_HOST } from "../../../api/popupstoreApi";

const MyPageEdit = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth?.user);

  //User부분의 수정
  const [userForm, setUserForm] = useState({
    password: "",
    passwordConfirm: "",
    email: "",
    name: "",
    phonenumber: "",
  });

  //UserProfile부분의 수정
  const [profileForm, setProfileForm] = useState({
    nickname: "",
    profileImg: null,
  });
  const [isSocial, setIsSocial] = useState(false);

  const [profileImage, setProfileImage] = useState(null);

  useEffect(() => {
    if (!user || !user.id) return;

    // User 내용
    getUserById(user.id).then((data) => {
      setUserForm({
        email: data.email || "",
        password: "",
        passwordConfirm: "",
        name: data.name || "",
        phonenumber: data.phonenumber || "",
      });
      setIsSocial(data.isSocial);
    });

    // Profile 내용
    getUserProfileByUserId(user.id).then((data) => {
      setProfileForm({
        nickname: data.nickname || "",
        profileImg: data.profileImg || null,
      });
      if (data.profileImg) {
        setProfileImage(`${API_SERVER_HOST}${data.profileImg}`);
      }
    });
  }, [user]);

  if (!user || !user.loginId) {
    return <div className="text-red-500">로그인이 필요합니다</div>;
  }

  const handleUserChange = (e) => {
    setUserForm({ ...userForm, [e.target.name]: e.target.value });
  };
  const handleProfileChange = (e) => {
    setProfileForm({ ...profileForm, [e.target.name]: e.target.value });
  };

  const handleUpdate = async () => {
    try {
      //User
      if (!isSocial && userForm.password !== userForm.passwordConfirm) {
        alert("비밀번호가 일치하지 않습니다");
        return;
      }
      await updateUser(user.id, {
        email: userForm.email,
        password: isSocial ? null : userForm.password,
        name: userForm.name,
        phonenumber: userForm.phonenumber,
      });

      //UserProfile
      const updatedProfile = await updateUserProfile(user.id, {
        nickname: profileForm.nickname,
        profileImg: profileForm.profileImg,
      });
      dispatch(
        updateUserProfileRedux({
          ...updatedProfile,
          nickname: updatedProfile.nickname,
          profileImg: updatedProfile.profileImg
            ? `${API_SERVER_HOST}/uploads/${updatedProfile.profileImg}`
            : null,
        })
      );

      alert("회원정보 수정 완료");
    } catch (err) {
      alert("회원정보 수정 실패:" + err.message);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm("정말로 탈퇴하시겠습니까?")) return;

    try {
      await deleteUser(user.id);
      dispatch(logout());
      alert("탈퇴되셨습니다.");
      navigate("/");
    } catch (err) {
      alert("탈퇴에 실패하셨습니다." + err.message);
    }
  };

  // 프로필 이미지 관리
  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfileForm({ ...profileForm, profileImg: file });
      const reader = new FileReader();
      reader.onloadend = () => {
        //미리보기
        setProfileImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

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
          <div className="w-20 h-20 rounded-full border-2 border-gray-400 flex overflow-hidden items-center justify-center">
            {profileImage ? (
              <img
                src={profileImage}
                alt="프로필사진"
                className="object-cover w-full h-full"
              ></img>
            ) : (
              <span className="text-gray-400 text-sm">프로필 사진</span>
            )}
          </div>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="hidden"
            id="profileImageUpload"
          ></input>
          <label
            className="px-3 py-1 rounded-xl border-2 border-gray-400 cursor-pointer"
            htmlFor="profileImageUpload"
          >
            편집
          </label>
        </div>
        {/* 내용 */}
        <div className="space-y-4">
          <div className="flex items-center">
            <label className="w-32 font-medium">아이디</label>
            <input
              disabled
              value={user.loginId}
              className="flex-1 p-2 rounded-xl border-2 border-subFirstColor"
            ></input>
          </div>
          <div className="flex items-center">
            <span className="w-32 font-medium">이름</span>
            <input
              disabled
              className="flex-1 p-2 rounded-xl border-2 border-subFirstColor"
              value={userForm.name}
              onChange={handleUserChange}
              name="name"
            ></input>
          </div>
          <div className="flex items-center">
            <span className="w-32 font-medium">닉네임</span>
            <input
              className="flex-1 p-2 rounded-xl border-2 border-subFirstColor"
              value={profileForm.nickname}
              onChange={handleProfileChange}
              name="nickname"
            ></input>
          </div>
          <div className="flex items-center">
            <span className="w-32 font-medium">비밀번호</span>
            <input
              disabled={isSocial}
              className="flex-1 p-2 rounded-xl border-2 border-subFirstColor"
              value={userForm.password}
              onChange={handleUserChange}
              name="password"
              type="password"
            ></input>
          </div>
          <div className="flex items-center">
            <span className="w-32 font-medium">비밀번호 재확인</span>
            {/* Todo: 비밀번호 재확인할 password2 필요? */}
            <input
              disabled={isSocial}
              className="flex-1 p-2 rounded-xl border-2 border-subFirstColor"
              value={userForm.passwordConfirm}
              onChange={handleUserChange}
              name="passwordConfirm"
              type="password"
            ></input>
          </div>
          <div className="flex items-center">
            <span className="w-32 font-medium">이메일</span>
            <input
              className="flex-1 p-2 rounded-xl border-2 border-subFirstColor"
              value={userForm.email}
              onChange={handleUserChange}
              name="email"
              type="email"
            ></input>
          </div>
          <div className="flex items-center">
            <span className="w-32 font-medium">전화번호</span>
            <input
              className="flex-1 p-2 rounded-xl border-2 border-subFirstColor"
              value={userForm.phonenumber}
              onChange={handleUserChange}
              name="phonenumber"
              type="phonenumber"
            ></input>
          </div>
        </div>
      </div>
      <hr className="border-subSecondColor border-2 m-4"></hr>
      {/* 버튼 */}
      <div className="flex justify-end space-x-4 mt-6">
        <button
          className="w-[120px] h-[40px] rounded-2xl text-gray-700 bg-primaryColor border-blue-300 border-2 hover:opacity-90 shadow-md"
          onClick={handleUpdate}
        >
          수정
        </button>
        <button
          className="text-sm w-[120px] h-[40px] rounded-2xl text-gray-700 bg-subButtonAccentColor border-red-300 border-2 hover:opacity-90 shadow-md"
          onClick={handleDelete}
        >
          회원탈퇴
        </button>
      </div>
    </div>
  );
};

export default MyPageEdit;
