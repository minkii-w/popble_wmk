import { useEffect, useState } from "react";
import BasicLayout from "../layout/BasicLayout";
import Carousel from "../components/function/Carousel";
import SearchBar from "../components/common/SearchBar";
import { useNavigate } from "react-router-dom";
import FullMap from "../components/common/kakaoMap/FullMap";

import { FiMapPin } from "react-icons/fi";

import { getList } from "../api/searchApi";
import PopuplarPopupComponent from "../components/popup/popular/PopularPopupComponent";

import { SwiperSlide } from "swiper/react";
import CustomSwiper from "../components/common/CustomSwiper";
import PopularPopupComponent from "../components/popup/popular/PopularPopupComponent";

import { FaHeart } from "react-icons/fa";
import { PiEyesFill } from "react-icons/pi";

const MainPage = () => {
  const navigate = useNavigate();
  //검색어
  const [keyword, setKeyword] = useState("");
  //인기순(추천)
  const [popularPopups, setPopularPopups] = useState([]);
  //조회수
  const [viewedPopups, setViewedPopups] = useState([]);

  useEffect(() => {
    const fetchPopuplarAndViewed = async () => {
      try {
        const [recommendResult, viewResult] = await Promise.all([
          //인기
          getList({
            status: "ACTIVE",
            sort: "RECOMMEND",
            pageRequestDTO: { page: 1, size: 10 },
          }),
          //조회
          getList({
            status: "ACTIVE",
            sort: "VIEW",
            pageRequestDTO: { page: 1, size: 10 },
          }),
        ]);

        console.log("추천 결과:", recommendResult);
        console.log("조회 결과:", viewResult);

        setPopularPopups(recommendResult.dtoList || []);
        setViewedPopups(viewResult.dtoList || []);
      } catch (error) {
        console.error("인기 팝업 불러오기 실패", error);
      }
    };
    fetchPopuplarAndViewed();
  }, []);

  const handleSearch = (keyword) => {
    if (!keyword || keyword.trim() === "") {
      navigate("/search");
    } else {
      navigate(`/search?keyword=${encodeURIComponent(keyword.trim())}`);
    }
  };
  return (
    <BasicLayout>
      {/* 캐러셀 */}
      <Carousel />

      {/* 검색창 */}
      <div className="flex justify-center m-10 p-10">
        <SearchBar
          className="w-[900px] h-[40px] flex-wrap items-center justify-center mb-10"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          onSearch={handleSearch}
        />
      </div>

      {/* 메인 지도 */}
      <div className="mt-5 flex flex-col items-center w-full">
        {/* 아이콘+부제목+라인 */}
        <div className="w-full max-w-4xl flex flex-col items-start px-4">
          {/* 아이콘+부제목 */}
          <div className="flex items-center font-semibold text-2xl gap-2">
            <FiMapPin className="text-3xl mb-1" />
            전체 팝업 지도
          </div>
          {/* 라인 */}
          <div className="w-full border-t-2 border-black mt-2"></div>
        </div>

        {/* 지도 컨테이너 */}
        <div className="mt-5 w-full max-w-4xl px-4">
          <div className="border border-hashTagColor rounded-xl overflow-hidden shadow-sm w-full aspect-[16/9]">
            <FullMap />
          </div>
        </div>

      {/* 인기순?? 추천순?? */}
      <div className="justify-stretch w-11/12 mx-auto mb-16">
        <div className="flex justify-between items-center mb-4 px-2">
          <h2 className="text-2xl font-bold flex flex-row items-center mx-4">
            9월 인기 팝업
            <FaHeart className="ml-4" size={30} color="FFB6B9" />
          </h2>
        </div>
        {/* 밑줄 */}
        <hr className="border-2 border-subSecondColor m-2"></hr>
        {/* 팝업리스트 */}
        <CustomSwiper>
          {popularPopups.map((item, index) => (
            <SwiperSlide style={{ width: "200px" }} key={item.id}>
              <PopuplarPopupComponent
                item={item}
                index={index}
                type={"recommend"}
              />
            </SwiperSlide>
          ))}
        </CustomSwiper>
      </div>

      {/* 조회순 */}
      <div className="justify-stretch w-11/12 mx-auto mb-16">
        <div className="flex justify-between items-center mb-4 px-2">
          <h2 className="text-2xl font-bold flex flex-row items-center mx-4">
            조회수 많은 팝업
            <PiEyesFill className="ml-4" size={30} />
          </h2>
        </div>
        {/*  */}
        <hr className="border-2 border-subSecondColor m-2"></hr>
        {/* 팝업리스트 */}
        <CustomSwiper>
          {viewedPopups.map((item, index) => (
            <SwiperSlide style={{ width: "200px" }} key={item.id}>
              <PopularPopupComponent item={item} index={index} type={"view"} />
            </SwiperSlide>
          ))}
        </CustomSwiper>
      </div>

      </div>

    </BasicLayout>
  );
};
export default MainPage;
