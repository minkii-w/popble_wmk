
import React from "react";

const KAKAO_AUTH_URL = "http://localhost:8080/oauth2/authorization/kakao";
                       

const KakaoLoginButton = () => {
  const handleLogin = () => {
    window.location.href = KAKAO_AUTH_URL;
  };

  return (
    <button onClick={handleLogin}>
      카카오로 로그인
    </button>
  );
};

export default KakaoLoginButton;