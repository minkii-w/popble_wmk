
import axios, { Axios } from "axios";
import { login } from "../../../../slice/loginSlice";






 const KakaoLogin = (code) => {

        




    return function (dispatch)  {
        //카카오에서 받은 인가코드 백앤드에 넘기고 토큰 받기
        axios({
            method: "GET",
            url: `http://127.0.0.1:8080/oauth/callback/kakao?code=${code}`,
            withCredentials: true,
        })

        .then((res) => {

            //받아온 토큰 

            const ACCESS_TOKEN = res.data.accessToken;
            console.log("accessToken", ACCESS_TOKEN);

            //받아온 토큰을 로컬에 저장
            localStorage.setItem('token', ACCESS_TOKEN);
            console.log('local스토리지 체크', localStorage.getItem('token'))

            dispatch(login(res.data));
            window.location.replace('/main')

        })

        .catch((err) => {
            console.error('소셜로그인 에러', err)
            alert('로그인에 실패하셨습니다')
            window.location.replace('/');
        })
    }







    
}
export const kakaoLoginAction = (code) => {
    return async (dispatch, getState) =>{
        await dispatch(KakaoLogin(code));
    }
    
}








export default KakaoLogin;



