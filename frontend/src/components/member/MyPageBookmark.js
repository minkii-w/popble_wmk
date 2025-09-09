import { useEffect, useState } from "react";
import { getBookmarkList, isBookmark } from "../../api/bookmarkApi";
import PopupCard from "../popupStore/PopupCard";

const MyPageBookmark = () => {
  const [bookmarks, setBookmarks] = useState([]);

  //유저를 정해둠 나중에 login들어가면 수정
  const userId = 4;

  useEffect(() => {
    const fetchBookmarks = async () => {
      try {
        const data = await getBookmarkList(userId);
        const bookmarkItems = Array.isArray(data) ? data : data.content || [];
        //북마크 확인
        console.log("북마크 리스트", bookmarkItems);
        setBookmarks(bookmarkItems);
      } catch (e) {
        console.error(
          "북마크 불러오기 실패",
          e.response?.status,
          e.response?.data || e.message
        );
      }
    };
    fetchBookmarks();
  }, []);
  return (
    <div className="overflow-x-auto px-4">
      <div className="flex flex-nowrap gap-4 px-4 py-2">
        {bookmarks.length > 0 ? (
          bookmarks.map((item) => (
            <div className="flex-shrink-0">
              <PopupCard
                key={item.id}
                item={{ item, isBookmark: true }}
              ></PopupCard>
            </div>
          ))
        ) : (
          <p>북마크한 팝업이 없습니다.</p>
        )}
      </div>
    </div>
  );
};

export default MyPageBookmark;
