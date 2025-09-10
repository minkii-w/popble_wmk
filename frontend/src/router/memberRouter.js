import { Suspense, lazy } from "react";
import { Navigate } from "react-router-dom";

const Loading = <div>Loading....</div>;
const MyPage = lazy(() => import("../pages/member/MyPage"));

const memberRouter = () => {
  return [
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

export default memberRouter;
