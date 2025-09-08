import { useEffect, useState, useCallback } from "react";
import { getList } from "../../api/popupstoreApi";
import PageComponent from "../common/PageComponent";
import useCustomMove from "../../hooks/useCustomMove";
import PopupCard from "./PopupCard";
import CategoryComponent from "./CategoryComponent";
import SortComponent from "./SortComponent";
import SearchBar from "../common/SearchBar";

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

  //필터 관리
  const [filter, setFilter] = useState({
    status: null,
    sort: null,
    categoryType: null,
    categoryId: null,
    keyword: null,
  });

  const [serverData, setServerData] = useState(initState);

  const fetchData = useCallback(async () => {
    const filterData = {
      ...filter,
      pageRequestDTO: { page, size },
    };
    getList(filterData)
      .then((data) => setServerData(data))
      .catch((err) => console.error("조회실패", err));
  }, [filter, page, size]);

  useEffect(() => {
    fetchData();
  }, [fetchData, refresh]);

  return (
    <div className="bg-gradient-to-b from-backgroundColor">
      <div className="flex flex-col items-center p-4">
        {/* 검색창 */}
        <SearchBar className= "w-[750px] h-[40px] mb-16 flex-wrap items-stretch" onSearch={(keyword) => {
          setFilter((prev) => ({
            ...prev,
            keyword,
          }))
        }}></SearchBar>
        {/* 검색창 끝 */}
        {/* 카테고리정렬 시작*/}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
          {/* 카테고리 */}
          <CategoryComponent
           onSelect={(selected) =>{
            if(selected.type === "status"){
            setFilter((prev)=> ({
              ...prev,
              status:selected.value,
              categoryType:null,
              categoryId:null
            }));
           }else if(selected.type === "category"){
            setFilter((prev)=> ({
              ...prev,
              status:null,
              categoryType:selected.categoryType,
              categoryId:selected.categoryId,
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
            <PopupCard key={item.id} item={item}></PopupCard>
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
