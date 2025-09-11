import { FcCalendar, FcDocument } from "react-icons/fc";
import { FaUserEdit, FaBookmark } from "react-icons/fa";

const menuList = [
  { key: "edit", label: "회원정보 수정/탈퇴", icon: <FaUserEdit size={50} /> },
  {
    key: "bookmark",
    label: "북마크 보기",
    icon: <FaBookmark size={50} color="red" />,
  },
  {
    key: "post",
    label: "내 게시글 보기",
    icon: <FcDocument size={50} />,
  },
  {
    key: "reservation",
    label: "예약내역 확인/취소",
    icon: <FcCalendar size={50} />,
  },
];

const MyPageMenuComponent = ({ selectedMenu, onMenuClick }) => {
  return (
    <div className="grid grid-cols-4 gap-4 bg-secondaryColor p-5 rounded-md mb-10 w-[1000px] h-[180px] shadow-lg border-secondaryAccentColor border-2">
      {menuList.map(({ key, label, icon }) => (
        <div
          key={key}
          onClick={() => onMenuClick(key)}
          className="flex flex-col items-center text-gray-700 cursor-pointer"
        >
          <div
            className={`flex justify-center items-center rounded-full size-[90px] mb-2 bg-secondaryAccentColor shadow-md hover:border-2 border-purple-300
                ${
                  selectedMenu === key
                    ? "bg-purple-300 border-2 border-purple-400"
                    : ""
                }`}
          >
            {icon}
          </div>

          <div className="text- m-1 p-3">{label}</div>
        </div>
      ))}
    </div>
  );
};

export default MyPageMenuComponent;
