import { Suspense, lazy } from "react";
import LoadingComponent from "../components/common/LoadingComponent";

const Loading = <div>Loading.........</div>;
const Login = lazy(() => import("../pages/users/LoginPage"));
const Join = lazy(() => import("../pages/users/JoinPage"));
const MyPage = lazy(() => import("../pages/users/MyPage"));
const MyPageEdit = lazy(() => import("../components/user/MyPageEdit"));
const MyPagePost = lazy(() => import("../components/user/MyPagePost"));
const MyPageReservation = lazy(() =>
  import("../components/user/MyPageReservation")
);
const MyPageBookmark = lazy(() => import("../components/user/MyPageBookmark"));

const userRouter = () => {
  return [
    {
      path: "login",
      element: (
        <Suspense fallback={<LoadingComponent />}>
          <Login></Login>
        </Suspense>
      ),
    },
    {
      path: "signup",
      element: (
        <Suspense fallback={<LoadingComponent />}>
          <Join></Join>
        </Suspense>
      ),
    },
    {
      path: "mypage/:menu?",
      element: (
        <Suspense fallback={<LoadingComponent />}>
          <MyPage></MyPage>
        </Suspense>
      ),
      children: [
        {
          path: "edit",
          element: (
            <Suspense fallback={<LoadingComponent />}>
              <MyPageEdit />
            </Suspense>
          ),
        },
        {
          path: "bookmark",
          element: (
            <Suspense fallback={<LoadingComponent />}>
              <MyPageBookmark />
            </Suspense>
          ),
        },
        {
          path: "post",
          element: (
            <Suspense fallback={<LoadingComponent />}>
              <MyPagePost />
            </Suspense>
          ),
        },
        {
          path: "reservation",
          element: (
            <Suspense fallback={<LoadingComponent />}>
              <MyPageReservation />
            </Suspense>
          ),
        },
      ],
    },
  ];
};

export default userRouter;
