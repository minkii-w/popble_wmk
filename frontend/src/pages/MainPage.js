import { useState } from "react";
import BasicLayout from "../layout/BasicLayout";
import Carousel from "../components/function/Carousel";
import CopyrightFooter from "../components/function/CopyrightFooter";
import SearchBar from "../components/common/SearchBar";
import { useNavigate } from "react-router-dom";
import FullMap from "../components/common/kakaoMap/FullMap";

import { FiMapPin } from "react-icons/fi";

const MainPage = () => {
  const navigate = useNavigate();
  const [keyword, setKeyword] = useState("");

  const handleSearch = (keyword) => {
    if (!keyword || keyword.trim() === "") {
      navigate("/search");
    } else {
      navigate(`/search?keyword=${encodeURIComponent(keyword.trim())}`);
    }
  };
  return (
    <BasicLayout>
      <Carousel />
      <div className="flex justify-center m-10 p-10">
        <SearchBar
          className="w-[900px] h-[40px] flex-wrap items-center justify-center"
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
      </div>
    </BasicLayout>
  );
};
export default MainPage;
