import { useEffect } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { loginSuccess } from "../../slice/authSlice";
import { getCookie, setCookie } from "../../utill/cookieUtill";

const LoginSuccessPage = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    axios
      .get("http://localhost:8080/user", { withCredentials: true })
      .then((res) => {
        const { accessToken, refreshToken, user } = res.data;
        dispatch(loginSuccess({ accessToken, refreshToken, user }));
        // localStorage.setItem("token", res.data.accessToken);
        window.location.replace("/");
      })
      .catch((err) => {
        console.error("로그인 실패", err);
        alert("로그인에 실패했습니다");
        window.location.replace("/");
      });
  }, [dispatch]);

  return <div>로그인 중...</div>;
};

export default LoginSuccessPage;
