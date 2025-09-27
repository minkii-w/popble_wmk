import React, { useState } from "react";
import { Map, MapMarker, MapTypeControl, ZoomControl } from "react-kakao-maps-sdk";
import  useKakaoLoader  from "../../../hooks/useKakaoLoader";

import Car from "../../../assets/img/icon_car.png"

export default function BasicMap() {
  const loaded = useKakaoLoader(process.env.REACT_APP_KAKAOMAP_KEY);
  // 행사장 위치(예시:서울시청 기준)
  const position = {lat: 37.5665, lng: 126.9780,};

  // 카테고리별 좌표 예시 (실제 좌표는 필요에 맞게 수정)
  const locations = {
    주차: [
      { lat: 37.5675, lng: 126.9785, name: "주차장 A" },
      { lat: 37.5655, lng: 126.9775, name: "주차장 B" },
    ],
    식당: [
      { lat: 37.5660, lng: 126.9795, name: "식당 1" },
      { lat: 37.5670, lng: 126.9765, name: "식당 2" },
    ],
    숙박: [
      { lat: 37.5680, lng: 126.9770, name: "호텔 1" },
      { lat: 37.5645, lng: 126.9780, name: "호텔 2" },
    ],
  };

  const [selectedCategory, setSelectedCategory] = useState(null);

  if (!loaded) return <div>지도 로딩중...</div>;

  // 버튼 스타일 함수
  const getButtonStyle = (category) => ({
    marginRight: "5px",
    padding: "5px 10px",
    cursor: "pointer",
    display: "flex",
    flexDirection: "column", // 세로 정렬
    alignItems: "center", //가로 가운데 정렬
    border: "1px solid #ccc",
    borderRadius: "5px",
    backgroundColor: selectedCategory === category ? "#007bff" : "#fff",
    color: selectedCategory === category ? "#fff" : "#000",
  });

  return (
    <div style={{ width: "100%", height: "400px", position: "relative"}}>  {/*지도 영역 설정 및 버튼 위치 기준점*/}
      {/* 버튼 스타일 */}
      <div
          style={{
            position: "absolute",
            display: "flex",
            top: "10px",
            left: "10px",
            zIndex: 10, //지도 위에 버튼이 위치하도록
            background: "white",
            padding: "8px",
            borderRadius: "5px",
            boxShadow: "0 0 5px rgba(0,0,0,0.3)",
          }}>

        <button
          onClick={() =>
            setSelectedCategory(prev => (prev === "주차" ? null : "주차"))
          }
          style={getButtonStyle("주차")}
        >
          <img src={Car} height="20" width="20" alt="주차" /> 주차
        </button>

        <button
          onClick={() =>
            setSelectedCategory(prev => (prev === "식당" ? null : "식당"))
          }
          style={getButtonStyle("식당")}
        >
          🍽️ 식당
        </button>

        <button
          onClick={() =>
            setSelectedCategory(prev => (prev === "숙박" ? null : "숙박"))
          }
          style={getButtonStyle("숙박")}
        >
          🏨 숙박
        </button>
      </div>

      {/* 지도 */}
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
            </a>
            {" "} | {" "}
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

        {/* 카테고리 선택 시 마커 표시 */}
        {selectedCategory &&
          locations[selectedCategory].map((loc, idx) => (
            <MapMarker key={`${selectedCategory}-${idx}`} //고유 key
                      position={{ lat: loc.lat, lng: loc.lng }}>
              <div style={{ padding: "5px", fontSize: "12px" }}>{loc.name}</div>
            </MapMarker>
        ))}
      </Map>
    </div>
  );
}