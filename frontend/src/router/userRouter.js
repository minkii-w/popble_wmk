import { Suspense, lazy } from "react";

const Loading = <div>Loading.........</div>;
const Login = lazy(() => import("../pages/users/LoginPage"));
const Join = lazy(() => import("../pages/users/JoinPage"));
const MyPage = lazy(() => import("../pages/users/MyPage"));

const userRouter = () => {
  return [
    {
      path: "login",
      element: (
        <Suspense fallback={Loading}>
          <Login></Login>
        </Suspense>
      ),
    },
    {
      path: "join",
      element: (
        <Suspense fallback={Loading}>
          <Join></Join>
        </Suspense>
      ),
    },
    {
      path: "mypage",
      element: (
        <Suspense fallback={Loading}>
          <MyPage></MyPage>
        </Suspense>
      ),
    },
  ];
};

export default userRouter;
