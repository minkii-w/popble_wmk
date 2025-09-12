import { useEffect, useState } from "react";
import { getBookmarkList, isBookmark } from "../../../api/bookmarkApi";
import PopupCard from "../../search/PopupCard";
import { FaBookmark } from "react-icons/fa";

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
    <div className="flex flex-col w-[700px]">
      {/* 헤더 */}
      <div className="text-2xl flex flex-row">
        <FaBookmark size={25} color="red" className="m-2" />
        <p className="m-2 text-2xl">북마크</p>
      </div>
      <hr className="border-subSecondColor border-2 m-4"></hr>
      {/* 예약카드 시작 */}
      <div className="overflow-x-auto px-4">
        <div className="flex flex-nowrap gap-4 px-4 py-2">
          {bookmarks.length > 0 ? (
            bookmarks.map((item) => (
              <div className="flex-shrink-0">
                <PopupCard
                  key={item.id}
                  item={{ ...item, isBookmark: true }}
                ></PopupCard>
              </div>
            ))
          ) : (
            <div className="flex items-center justify-center h-full">
              <p className="text-2xl font-semibold">
                북마크한 팝업이 없습니다.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MyPageBookmark;
