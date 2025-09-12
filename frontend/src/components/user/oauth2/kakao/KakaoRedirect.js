import { useDispatch } from "react-redux"




    const KakaoRedirect  = () => {

     const dispatch = useDispatch()


          useEffect(() => {
             const code = new URL(window.location.href).searchParams.get("code");
            if (code) {
         dispatch(kakaoLoginAction(code));
      }
          }, [dispatch]);

    }

    return <div>로그인 처리중...</div>



    export default KakaoRedirect;