import React, { useEffect, useState } from "react";
import { Map, MarkerClusterer, CustomOverlayMap, MapMarker } from "react-kakao-maps-sdk";
import useKakaoLoader from "../../../hooks/useKakaoLoader";

export default function FullMap() {
  const [positions, setPositions] = useState([]);

  const loaded = useKakaoLoader(process.env.REACT_APP_KAKAOMAP_KEY); //로딩 상태 받기

    useEffect(() => {
      if (!loaded) return; //SDK 로드 전이면 fetch도 하지 않음

    //   fetch("http://localhost:8080/api/popup/list")
    //     .then(res => res.json())
    //     .then(data => setPositions(data))
    //     .catch(err => console.error(err));
    // }, [loaded]); //loaded가 true일 때만 실행

    //더미 데이터
      const dummyData = [
        { id: 1, storeName: "팝업스토어 A", lat: 37.5665, lng: 126.9780 },
        { id: 2, storeName: "팝업스토어 B", lat: 37.5651, lng: 126.9895 },
        { id: 3, storeName: "팝업스토어 C", lat: 37.5700, lng: 126.9820 },
        { id: 4, storeName: "팝업스토어 D", lat: 37.5675, lng: 126.9775 },
        { id: 5, storeName: "팝업스토어 E", lat: 37.5685, lng: 126.9810 },
      ];

      setPositions(dummyData);
    }, [loaded]);

    if (!loaded) return <div>지도 로딩중...</div>;


  return (
      <Map // 지도를 표시할 Container
        center={{
          // 지도의 중심좌표(서울시청)
          lat: 37.5665,
          lng: 126.9780,
        }}
        style={{
          // 지도의 크기
          width: "100%",
          height: "100%",
        }}
        level={10} // 지도의 확대 레벨
      >
        <MarkerClusterer
          averageCenter={true} // 클러스터에 포함된 마커들의 평균 위치를 클러스터 마커 위치로 설정
          minLevel={10} // 클러스터 할 최소 지도 레벨
        >
          {positions.map((pos, idx) => (
            <CustomOverlayMap
              key={pos.id}
              position={{
                lat: pos.lat,
                lng: pos.lng,
              }}
            >
              <div style={{
                  color: "black",
                  textAlign: "center",
                  background: "white",
                  width: "2rem",
                  height: "2rem",
                  borderRadius: "50%"
                }}
              >
              {idx}
              </div>
            </CustomOverlayMap>
          ))}
        </MarkerClusterer>
      </Map>
  );
}
