import { Suspense, lazy } from "react";

import LoadingComponent from "../components/common/LoadingComponent";
import ReviewPage from "../pages/popup/review/ReviewPage";

// const Reservation = lazy(() => import("../pages/reservation/ReservationPage"));
const AdBoard = lazy(() => import("../pages/board/AdBoardPage"));
const About = lazy(() => import("../pages/popup/AboutPage"));

const popupRouter = () => {
  return [
      {
      path:"/popup/review/:reservationId",
      element:(
        <Suspense fallback={<LoadingComponent/>}>
          <ReviewPage/>
        </Suspense>
      )
    },
    {
      path: "detail/:id",
      element: (
        <Suspense fallback={<LoadingComponent />}>
          <About></About>
        </Suspense>
      ),
    },
    {
      path: "detail",
      element: (
        <Suspense fallback={<LoadingComponent />}>
          <About></About>
        </Suspense>
      ),
    },
    // {
    //   path: "reservation/:id",
    //   element: (
    //     <Suspense fallback={<LoadingComponent />}>
    //       <Reservation></Reservation>
    //     </Suspense>
    //   ),
    // },
    {
      path: "board/ad",
      element: (
        <Suspense fallback={<LoadingComponent />}>
          <AdBoard></AdBoard>
        </Suspense>
      ),
    },
  ];
};

export default popupRouter;