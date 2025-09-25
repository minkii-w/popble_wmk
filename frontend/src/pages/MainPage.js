import { useEffect, useState } from "react";
import BasicLayout from "../layout/BasicLayout";
import Carousel from "../components/function/Carousel";
import SearchBar from "../components/common/SearchBar";
import { useNavigate } from "react-router-dom";

import { getList } from "../api/searchApi";
import PopuplarPopupComponent from "../components/popup/popular/PopularPopupComponent";

import { SwiperSlide } from "swiper/react";
import CustomSwiper from "../components/common/CustomSwiper";
import PopularPopupComponent from "../components/popup/popular/PopularPopupComponent";

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

      {/* 인기순?? 추천순?? */}
      <div className="justify-stretch w-11/12 mx-auto mb-16">
        <div className="flex justify-between items-center mb-4 px-2">
          <h2 className="text-2xl font-bold">9월 인기 팝업</h2>
        </div>
        {/* 밑줄 */}
        <hr className="border-2 border-subSecondColor m-2"></hr>
        {/* 팝업리스트 */}
        <CustomSwiper>
          {popularPopups.map((item, index) => (
            <SwiperSlide style={{ width: "200px" }} key={item.id}>
              <PopuplarPopupComponent item={item} index={index} />
            </SwiperSlide>
          ))}
        </CustomSwiper>
      </div>

      {/* 조회순 */}
      <div className="justify-stretch w-11/12 mx-auto mb-16">
        <div className="flex justify-between items-center mb-4 px-2">
          <h2 className="text-2xl font-bold">조회수 많은 팝업</h2>
        </div>
        {/*  */}
        <hr className="border-2 border-subSecondColor m-2"></hr>
        {/* 팝업리스트 */}
        <CustomSwiper>
          {viewedPopups.map((item, index) => (
            <SwiperSlide style={{ width: "200px" }} key={item.id}>
              <PopularPopupComponent item={item} index={index} />
            </SwiperSlide>
          ))}
        </CustomSwiper>
      </div>
      <div className="text-5xl bg-primaryColor">
        <h1>primaryColor</h1>
      </div>
      <div className="text-5xl bg-secondaryColor">
        <h1>secondaryColor</h1>
      </div>
      <div className="text-5xl bg-secondaryAccentColor">
        <h1>secondaryAccentColor</h1>
      </div>
      <div className="text-5xl bg-backgroundColor">
        <h1>backgroundColor</h1>
      </div>
      <div className="text-5xl bg-subFirstColor">
        <h1>subFirstColor</h1>
      </div>
      <div className="text-5xl bg-subSecondColor">
        <h1>subSecondColor</h1>
      </div>
      <div className="text-5xl bg-hashTagColor">
        <h1>hashTagColor</h1>
      </div>
      <div className="text-5xl bg-subButtonColor">
        <h1>subButtonColor</h1>
      </div>
      <div className="text-5xl bg-subButtonAccentColor">
        <h1>subButtonAccentColor</h1>
      </div>
    </BasicLayout>
  );
};

export default MainPage;
