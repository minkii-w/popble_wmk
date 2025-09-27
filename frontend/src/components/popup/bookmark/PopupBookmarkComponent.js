import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
  addBookmark,
  isBookmark,
  deleteBookmark,
} from "../../../api/bookmarkApi";
import { FcBookmark } from "react-icons/fc";
import { GoBookmark } from "react-icons/go";

const PopupBookmarkComponent = ({ popupId }) => {
  const userId = useSelector((state) => state.auth?.user?.id);

  const [bookmarked, setBookmarked] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!userId) return;
    async function fetchBookmarkStatus() {
      try {
        const data = await isBookmark(popupId);
        setBookmarked(data);
      } catch (e) {
        console.error("북마크 확인 여부 실패", e);
      }
    }
    fetchBookmarkStatus();
  }, [popupId, userId]);

  const handleClick = async () => {
    if (!userId) {
      alert("로그인 후 북마크가 가능합니다");
      return;
    }
    if (loading) return;
    setLoading(true);
    try {
      if (bookmarked) {
        await deleteBookmark(popupId);
        setBookmarked(false);
      } else {
        await addBookmark(popupId);
        setBookmarked(true);
      }
    } catch (e) {
      alert("북마크 처리 실패");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div onClick={handleClick} style={{ cursor: "pointer" }}>
      {bookmarked ? <FcBookmark size={25} /> : <GoBookmark size={25} />}
    </div>
  );
};

export default PopupBookmarkComponent;
