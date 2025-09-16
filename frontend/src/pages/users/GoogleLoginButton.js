

const GOOGLE_AUTH_URL = "http://localhost:8080/oauth2/authorization/google"



const GoogleLoginButton = () => {
    const handleLogin = () => {
        window.location.href = GOOGLE_AUTH_URL;
    }

    return(
        <button onClick={handleLogin}>
            구글 로그인
        </button>


    )





}


export default GoogleLoginButton;