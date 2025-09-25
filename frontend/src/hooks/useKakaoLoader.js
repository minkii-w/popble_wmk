// useKakaoLoader.js
import { useEffect, useState } from "react";

export default function useKakaoLoader() {
  const [kakaoLoaded, setKakaoLoaded] = useState(false);

  useEffect(() => {
    if (window.kakao && window.kakao.maps) {
      setKakaoLoaded(true);
      return;
    }

    const script = document.createElement("script");
    script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.REACT_APP_KAKAOMAP_KEY}&libraries=services,clusterer`;
    script.async = true;
    script.onload = () => setKakaoLoaded(true);
    document.head.appendChild(script);
  }, []);

  return kakaoLoaded;
}
