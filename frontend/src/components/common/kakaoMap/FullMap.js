import React, { useEffect, useState } from "react";
import { Map, MarkerClusterer, CustomOverlayMap } from "react-kakao-maps-sdk";
import useKakaoLoader from "../../../hooks/useKakaoLoader";
import axios from "axios";

export default function FullMap() {
  const loaded = useKakaoLoader(process.env.REACT_APP_KAKAOMAP_KEY);
  const [positions, setPositions] = useState([]);
  const initialCenter = { lat: 37.5665, lng: 126.9780 }; // 서울 중심

  useEffect(() => {
    if (!loaded) return;

    const fetchPopups = async () => {
      try {
        const res = await axios.get("http://localhost:8080/api/popup/list");
        const data = res.data.dtoList || [];

        const updatedData = await Promise.all(
          data.map(async (popup) => {
            // 좌표가 없으면 Kakao Geocoding API 사용
            if (!popup.latitude || !popup.longitude) {
              try {
                const geoRes = await axios.get(
                  "https://dapi.kakao.com/v2/local/search/address.json",
                  {
                    params: { query: popup.address },
                    headers: { Authorization: `KakaoAK ${process.env.REACT_APP_KAKAO_REST_API_KEY}` },
                  }
                );
                const doc = geoRes.data.documents[0];
                if (doc) {
                  return {
                    ...popup,
                    latitude: parseFloat(doc.y),
                    longitude: parseFloat(doc.x),
                  };
                }
              } catch (err) {
                console.error("Geocoding 실패:", popup.address, err);
              }
            }
            return popup;
          })
        );

        // 좌표가 유효한 데이터만 필터링
        const safeData = updatedData.filter(p => p.latitude && p.longitude);

        // 지역별로 묶기
        const regionMap = {};
        safeData.forEach(p => {
          const region = p.region || "기타";
          if (!regionMap[region]) regionMap[region] = [];
          regionMap[region].push(p);
        });

        setPositions(regionMap);

      } catch (err) {
        console.error("팝업 데이터 로딩 실패:", err);
      }
    };

    fetchPopups();
  }, [loaded]);

  if (!loaded) return <div>지도 로딩중...</div>;

  return (
    <Map
      center={initialCenter}
      style={{ width: "100%", height: "100%" }}
      level={10}
    >
      {Object.keys(positions).map(region => (
        <MarkerClusterer
          key={region}
          averageCenter={true}
          minLevel={10}
        >
          {positions[region].map((pos) => (
            <CustomOverlayMap
              key={pos.id}
              position={{ lat: pos.latitude, lng: pos.longitude }}
            >
              <div style={{
                background: "#fff",
                padding: "4px 8px",
                borderRadius: "4px",
                textAlign: "center",
                border: "1px solid #ccc",
                fontSize: "12px"
              }}>
                {pos.storeName} ({region})
              </div>
            </CustomOverlayMap>
          ))}
        </MarkerClusterer>
      ))}
    </Map>
  );
}
