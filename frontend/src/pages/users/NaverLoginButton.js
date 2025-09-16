import KakaoLoginButton from "./KakaoLoginButton";

const NAVER_AUTH_URL = "http://localhost:8080/oauth2/authorization/naver"

const NaverLoginButton = () => {
    const handleLogin = () => {
        window.location.href =  NAVER_AUTH_URL;
    }

    return (

        <button onClick={handleLogin}>
            네이버로 로그인
        </button>



    )


}

export default NaverLoginButton;

