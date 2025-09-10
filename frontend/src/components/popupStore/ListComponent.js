import { useEffect, useState, useCallback } from "react";
import { getList } from "../../api/popupstoreApi";
import PageComponent from "../common/PageComponent";
import useCustomMove from "../../hooks/useCustomMove";
import PopupCard from "./PopupCard";
import CategoryComponent from "./CategoryComponent";
import SortComponent from "./SortComponent";
import SearchBar from "../common/SearchBar";
import { getBookmarkList, isBookmark } from "../../api/bookmarkApi";

const initState = {
  dtoList: [],
  pageNumList: [],
  pageRequestDTO: null,
  prev: false,
  next: false,
  totalCount: 0,
  prevPage: 0,
  nextPage: 0,
  totalPage: 0,
  current: 0,
};

const ListComponent = () => {
  const { page, size, refresh, moveToList } = useCustomMove();
  //로그인 추가되면 지울것
  const userId = 4;

  //필터 관리
  const [filter, setFilter] = useState({
    status: null,
    sort: null,
    categoryType: null,
    categoryId: null,
    keyword: null,
  });

  const [serverData, setServerData] = useState(initState);
  const [bookmarkIds, setBookmarkIds] = useState([]);

  //전체 팝업 불러오기
  const fetchData = useCallback(async () => {
    const filterData = {
      ...filter,
      pageRequestDTO: { page, size },
    };
    getList(filterData)
      .then((data) => setServerData(data))
      .catch((err) => console.error("조회실패", err));
  }, [filter, page, size]);

  //북마크 불러오기
  const fetchBookmarks = useCallback(async () => {
    try {
      const data = await getBookmarkList(userId);
      const items = Array.isArray(data) ? data : data.content || [];
      setBookmarkIds(items.map((b) => b.id));
    } catch (e) {
      console.error("북마크 조회 실패", e);
    }
  }, [userId]);

  useEffect(() => {
    fetchBookmarks();
    fetchData();
  }, [fetchData, fetchBookmarks, refresh]);

  return (
    <div className="bg-gradient-to-b from-backgroundColor">
      <div className="flex flex-col items-center p-4">
        {/* 검색창 */}
        <SearchBar
          className="w-[750px] h-[40px] mb-16 flex-wrap items-stretch"
          onSearch={(keyword) => {
            setFilter((prev) => ({
              ...prev,
              keyword,
            }));
          }}
        ></SearchBar>
        {/* 검색창 끝 */}
        {/* 카테고리정렬 시작*/}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
          {/* 카테고리 */}
          <CategoryComponent
            onSelect={(selected) => {
              if (selected.type === "status") {
                setFilter((prev) => ({
                  ...prev,
                  status: selected.value,
                  categoryType: null,
                  categoryId: null,
                }));
              } else if (selected.type === "category") {
                setFilter((prev) => ({
                  ...prev,
                  status: null,
                  categoryType: selected.categoryType,
                  categoryId: selected.categoryId,
                }));
              }
            }}
          />
          <SortComponent
            onSort={(sort) =>
              setFilter((prev) => ({
                ...prev,
                sort,
              }))
            }
          />
          {/* 정렬 */}
        </div>
        {/* 카테고리정렬 끝 */}
        {/* 구분선 */}
        <div className="w-[900px] ">
          <hr className="my-4 border-t-2 border-subSecondColor"></hr>
        </div>
        {/* 카드 시작 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {serverData.dtoList.map((item) => (
            <PopupCard
              key={item.id}
              item={{ ...item, isBookmark: bookmarkIds.includes(item.id) }}
            ></PopupCard>
          ))}
        </div>
        {/* 카드 끝 */}
      </div>
      <PageComponent
        serverData={serverData}
        movePage={moveToList}
      ></PageComponent>
    </div>
  );
};

export default ListComponent;
