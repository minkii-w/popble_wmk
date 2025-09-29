import React from "react";
import BasicMap from "../../common/kakaoMap/BasicMap";

import { FiMapPin } from "react-icons/fi";
import { RxCopy } from "react-icons/rx";

const MapInfo = ({ popupStore }) => {
  return (
    <>
      {/* 지도 API 컴포넌트 자리 */}
      {/* 지도 형태 */}
      <div className="border border-hashTagColor rounded-xl overflow-hidden">
        <BasicMap />
      </div>
      {/* 주소표시 */}
      <div className="mt-5 inline-block w-full rounded-xl p-2 bg-subSecondColor">
        <p className="flex items-center gap-2">
          <FiMapPin />
          {popupStore.address}
          <RxCopy />
        </p>
      </div>
    </>
  );
};
export default MapInfo;
