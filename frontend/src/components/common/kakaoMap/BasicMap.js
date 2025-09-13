import React from "react";
import { Map, MapMarker, MapTypeControl, ZoomControl } from "react-kakao-maps-sdk";
import useKakaoLoader from "../../../hooks/useKakaoLoader";

export default function BasicMap() {

  const position = { lat: 37.5665, lng: 126.9780 }; // 서울시청 좌표 예시

  return (
    <div style={{ width: "100%", height: "400px" }}>  {/*지도 영역 설정*/}
      <Map  //지도를 표시할 Container
        center={position}  //지도의 중심좌표
        style={{ width: "100%", height: "100%" }}
        level={3} //지도 확대 레벨
      >
        {/* 지도 타입 전환 컨트롤(지도/스카이뷰) */}
        <MapTypeControl position={"TOPRIGHT"}/>
        {/* 확대/축소 컨트롤(막대바) */}
        <ZoomControl position={"RIGHT"}/>
        {/* 마커를 생성하고 지도에 표시 */}
        <MapMarker position={position}>
          {/* MapMarker의 자식을 넣어줌으로 해당 자식이 InfoWindow로 만들어지게 합니다 */}
          {/* 인포윈도우에 표출될 내용으로 HTML 문자열이나 React Component가 가능합니다 */}
          <div style={{ padding: "5px", color: "#000" }}>
            Hello World! <br />
            <a
              href="https://map.kakao.com/link/map/Hello World!,33.450701,126.570667"
              style={{ color: "blue" }}
              target="_blank"
              rel="noreferrer"
            >
              큰지도보기
            </a>{" "}
            <a> | </a>
            <a
              href="https://map.kakao.com/link/to/Hello World!,33.450701,126.570667"
              style={{ color: "blue" }}
              target="_blank"
              rel="noreferrer"
            >
              길찾기
            </a>
          </div>
        </MapMarker>
      </Map>
    </div>

  );
}
