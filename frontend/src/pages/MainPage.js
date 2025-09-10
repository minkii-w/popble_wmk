import { useState } from "react";
import BasicLayout from "../layout/BasicLayout";
import Carousel from "../components/function/Carousel";
import CopyrightFooter from "../components/function/CopyrightFooter";
import SearchBar from "../components/common/SearchBar";
import { useNavigate } from "react-router-dom";

const MainPage = () => {
  const navigate = useNavigate();
  const [keyword, setKeyword] = useState("");

  const handleSearch = (keyword) => {
    if (!keyword || keyword.trim() === "") {
      navigate("/popup/search");
    } else {
      navigate(`/popup/search?keyword=${encodeURIComponent(keyword.trim())}`);
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
