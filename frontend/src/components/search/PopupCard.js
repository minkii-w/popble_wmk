import { Link } from "react-router-dom";
import Sanrio_mediaArt_1 from "../../assets/img/Sanrio MediaArt_1.jpeg";
import { useEffect, useState } from "react";
import { addBookmark, deleteBookmark } from "../../api/bookmarkApi";
import { GoBookmark } from "react-icons/go";
import { FcBookmark } from "react-icons/fc";

//userId를 받아올수 없기때문에 임의로 id=4인 유저를 설정해둠
const PopupCard = ({ item, userId = 4 }) => {
  const [isBookmark, setIsBookmark] = useState(item.isBookmark);

  useEffect(() => {
    setIsBookmark(item.isBookmark ?? false);
  }, [item.isBookmark]);

  const toggleBookmark = async (e) => {
    e.preventDefault();

    try {
      if (isBookmark) {
        await deleteBookmark(userId, item.id);
      } else {
        await addBookmark(userId, item.id);
      }
      setIsBookmark(!isBookmark);
    } catch (e) {
      console.error("북마크 변경실패", e);
    }
  };

  return (
    <Link
      to={`/popup/detail/${item.id}`}
      className="relative flex flex-shrink-0 bg-secondaryColor w-[380px] h-[180px] rounded-lg shdow-md m-5 p-3 hover:shadow-lg transition border-secondaryAccentColor border-2"
    >
      {/* 북마크 */}
      <button
        onClick={toggleBookmark}
        className="absolute top-2 right-2 text-xl"
      >
        {isBookmark ? <FcBookmark /> : <GoBookmark />}
      </button>
      {/* 팝업간단정보 */}
      <img
        src={Sanrio_mediaArt_1}
        alt={item.title}
        className="w-[150px] h-[150px] object-cover rounded-md flex-shrink-0"
      ></img>
      <div className="ml-4 flex flex-col justify-between">
        <h3 className="font-bold text-lg">{item.storeName}</h3>
        <p className="text-sm text-gray-500">{item.address}</p>
        <p className="text-sm text-gray-500">
          {item.startDate} ~ {item.endDate}
        </p>
      </div>
    </Link>
  );
};

export default PopupCard;
