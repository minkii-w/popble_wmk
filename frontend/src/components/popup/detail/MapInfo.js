import React from "react";
import BasicMap from "../../common/kakaoMap/BasicMap";

import { FiMapPin } from "react-icons/fi";

const MapInfo = ({ popupStore }) => {

  return (
    <>
      {/* 지도 API 컴포넌트 자리 */}
      {/* 지도 형태 */}
      <div className="border border-hashTagColor rounded-xl overflow-hidden">
        <BasicMap />
      </div>
      {/* 주소표시 */}
      <div className="mt-5">
        <p className="flex items-center gap-2">
          <FiMapPin />
          {popupStore.address}
        </p>
      </div>
    </>
  );
};
export default MapInfo;
