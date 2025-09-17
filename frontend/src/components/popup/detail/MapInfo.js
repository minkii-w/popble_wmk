import React from "react";
import BasicMap from "../../common/kakaoMap/BasicMap";

import { FiMapPin } from "react-icons/fi";

const MapInfo = ({ address }) => {
  address =
    "서울 영등포구 여의도동 국제금융로 10, 여의도 IFC 몰 L3층 MPX 갤러리";

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
          {address}
        </p>
      </div>
    </>
  );
};
export default MapInfo;
