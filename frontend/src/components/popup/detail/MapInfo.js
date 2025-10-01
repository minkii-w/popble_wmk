import React, { useState } from "react";
import BasicMap from "../../common/kakaoMap/BasicMap";

import { FiMapPin } from "react-icons/fi";
import { RxCopy } from "react-icons/rx";


const MapInfo = ({popupLocation}) => {
  const [address, setAddress] = useState(""); // BasicMap에서 전달받을 주소
  
  return (
      <>
        {/* 지도 API 컴포넌트 자리 */}
        {/* 지도 형태 */}
        <div className="border border-hashTagColor rounded-xl overflow-hidden">
          <BasicMap onLoad={(addr) => setAddress(addr)}/>
        </div>
        {/* 주소표시 */}
        <div className="mt-5 inline-block w-full rounded-xl p-2 bg-subSecondColor">
          <p className="flex items-center gap-2">
            <FiMapPin/>{address}
            <RxCopy
              className="cursor-pointer"
              onClick={() => {
                navigator.clipboard.writeText(address);
                alert("주소가 복사되었습니다");
              }}
            />
          </p>
        </div>
      </>

  );
};
export default MapInfo;