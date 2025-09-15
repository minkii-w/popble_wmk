import { useEffect } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";



const LoginSuccessPage = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    axios
      .get("http://localhost:3000/", { withCredentials: true  })
      .then((res) => {
        localStorage.setItem("token", res.data.accessToken);
        
        window.location.replace("/");
      })
      .catch((err) => {
        console.error("로그인 실패", err);
        alert("로그인에 실패했습니다");
        window.location.replace("/");
      });
  }, []);

  return <div>로그인 중...</div>;

};

export default LoginSuccessPage;
