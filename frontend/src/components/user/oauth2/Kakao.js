import React from "react";




const kakao = () => {

const REST_API_KEY = '15c59ee2f2c32b7e3d1eb89e1bcf316b'
const REDIRECT_URI = 'http://localhost:8080/oauth2/authorization/kakao'
const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`;


//카카오 로그인 버튼
const kakaoLogin = (e: React.MouseEvent) => {

    e.preventDefault();
}



}

export default kakao;