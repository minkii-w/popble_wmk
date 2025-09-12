import { useState } from "react";
import useCustomLogin from "../../hooks/useCustomLogin";
import { kakaoLoginAction, KakaoLogin } from "./oauth2/kakao/KakaoLogin";
import React from "react";


const initState = {
    loginId:'',
    password:''
}


const LoginComponent = () => {

    const REST_API_KEY = '15c59ee2f2c32b7e3d1eb89e1bcf316b'
    const REDIRECT_URI = 'http://localhost:8080/login/oauth2/code/kakao'
                           
    const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`;



    const [loginParam, setLoginParam] = useState({...initState})

   

    const {doLogin, moveToPath} = useCustomLogin()

        /**
         * 
         * @param {React.MouseEvent} e 
         */
        const KakaoLogin = (e) => {
                e.preventDefault();
                window.location.href = KAKAO_AUTH_URL;
           
                
            }




    const handleChange = (e) => {
        loginParam[e.target.name] = e.target.value

        setLoginParam({...loginParam})
    }

    const handleChlickLogin = (e) => {
        doLogin(loginParam)
        .then(data => {
            console.log(data)

            if(data.error){
                alert("아이디와 비밀번호를 확인하세요")
            }else{
                alert("로그인 성공")
                moveToPath("/")
            }
        })
    }

    


    return(

       
        <div className="border-2 border-sky-200 mt-10 m-2 p-4">

            <div className="flex justify-center">
                <div className="text-4xl m-4 p-4 font-extrabold text-blue-500">LOGIN</div>
            </div>

            <div className="flex justify-center">
                <div className="relative mb-4 flex w-full  flex-wrap items-stretch">
                    <div className="w-full p-3 text-left font-bold">ID</div>
                    <input className="w-full p-3 rounded-r border border-solid border-neutral-500 shadow-md"
                    name="loginId"
                    type={'text'}
                    value={loginParam.loginId}
                    onChange={handleChange} ></input>
                </div>

            </div>


            <div className="flex justify-center">
                <div className="relative mb-4 flex w-full flex-wrap items-stretch">
                    <div className="w-full p-3 text-left font-bold">Password</div>
                    <input className="w-full p-3 rounded-r border border-solid border-neutral-500 shadow-md"
                    name="password"
                    type={'password'}
                    value={loginParam.password}
                    onChange={handleChange}
                    
                    ></input>
                </div>



            </div>

            <div className="flex justify-center">
                <div className="relative mb-4 flex justify-center" >
                    <div className="w-2/5 p-6 flex justify-center font-bold">
                    <button className="rounded p-4 w-36 bg-blue-500 text-xl text-white " onClick={handleChlickLogin}>
                        LOGIN
                    </button>
                    </div>
                </div>


            </div>
          
          <div className="w-2/5 p-6 flex justify-center font-bold">
                    <button className="rounded p-4 w-36 bg-blue-500 text-xl text-white " onClick={KakaoLogin}>
                        LOGIN
                    </button>
                    </div>


        </div>

    )




}

export default LoginComponent;