import BasicMenu from "../../components/BasicMenu";
import { Link } from "react-router-dom";
import React, { useState } from "react";
import BasicInfo from "../../components/popup/detail/BasicInfo";
import DetailImages from "../../components/popup/detail/DetailImages";
import MapInfo from "../../components/popup/detail/MapInfo";
import ReserveInfo from "../../components/popup/detail/ReserveInfo";
import ReviewInfo from "../../components/popup/detail/ReviewInfo";

import Sanrio from "../../assets/img/Sanrio MediaArt_1.jpeg";

import { PiHeartBold } from "react-icons/pi";
import { FaRegBookmark } from "react-icons/fa6";
import { IoShareSocialOutline } from "react-icons/io5";

const AboutPage = () => {
  const [activeTab, setActiveTab] = useState("basic"); // 기본 탭: 기본정보

  return (
    <div>
      {/* 이미지 삽입 및 여백 지정 */}
      <div className="flex justify-center mt-10">
        <img src={Sanrio} height="400px" width="400px"></img>
        {/* <Link to={'/about'}></Link> */}
      </div>

      {/* 아이콘 버튼 */}
      <div className="flex justify-end items-center mt-5 mr-8 gap-3">
        <PiHeartBold className="heart" size={24} />
        <FaRegBookmark className="bookmark" size={20} />
        <IoShareSocialOutline className="share" size={23} />
      </div>

      {/* 페이지 나눔 */}
      <div className="flex flex-nowrap mt-4">
        <button
          onClick={() => setActiveTab("basic")}
          className={`flex-1 min-w-[100px] rounded-t-xl px-10 py-3 ${
            activeTab === "basic"
              ? "bg-secondaryAccentColor text-black"
              : "bg-secondaryColor"
          }`}
        >
          기본정보
        </button>
        <button
          onClick={() => setActiveTab("image")}
          className={`flex-1 min-w-[100px] rounded-t-xl px-10 py-3 ${
            activeTab === "image"
              ? "bg-secondaryAccentColor text-black"
              : "bg-secondaryColor"
          }`}
        >
          상세이미지
        </button>
        <button
          onClick={() => setActiveTab("map")}
          className={`flex-1 min-w-[100px] rounded-t-xl px-10 py-3 ${
            activeTab === "map"
              ? "bg-secondaryAccentColor text-black"
              : "bg-secondaryColor"
          }`}
        >
          지도
        </button>
        <button
          onClick={() => setActiveTab("reserve")}
          className={`flex-1 min-w-[100px] rounded-t-xl px-10 py-3 ${
            activeTab === "reserve"
              ? "bg-secondaryAccentColor text-black"
              : "bg-secondaryColor"
          }`}
        >
          예약
        </button>
        <button
          onClick={() => setActiveTab("review")}
          className={`flex-1 min-w-[100px] rounded-t-xl px-10 py-3 ${
            activeTab === "review"
              ? "bg-secondaryAccentColor text-black"
              : "bg-secondaryColor"
          }`}
        >
          후기
        </button>
      </div>

      {/* 내용 영역 */}
      <div className="p-6">
        {activeTab === "basic" && <BasicInfo />}
        {activeTab === "image" && <DetailImages />}
        {activeTab === "map" && <MapInfo />}
        {activeTab === "reserve" && <ReserveInfo />}
        {activeTab === "review" && <ReviewInfo />}
      </div>
    </div>
  );
};
export default AboutPage;
