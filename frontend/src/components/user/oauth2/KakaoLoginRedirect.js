import { useEffect } from "react";
import { useParams } from "react-router-dom";

const KakaoLoginRedirect = () => {

    const params = useParams();

    useEffect( () => {
           localStorage.clear();
    localStorage.setItem("token", params.token);
    window.location.replace("/");

    }, []);

    return <></>;

}

export default KakaoLoginRedirect;


<script src="https://t1.kakaocdn.net/kakao_js_sdk/${VERSION}/kakao.min.js"
  integrity="${INTEGRITY_VALUE}" crossorigin="anonymous"></script>