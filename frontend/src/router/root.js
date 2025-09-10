import { createBrowserRouter } from "react-router-dom";

import { Suspense, lazy } from "react";
import popupRouter from "./popupRouter";
import userRouter from "./userRouter";

const Loading = <div>Loading......</div>;

const About = lazy(() => import("../pages/AboutPage"));
const Main = lazy(() => import("../pages/MainPage"));
const Reservation = lazy(() => import("../pages/reservation/ReservationPage"));
const AdBoard = lazy(() => import("../pages/board/AdBoardPage"));
const Popup = lazy(() => import("../pages/popupStore/PopupIndexPage"));
const User = lazy(() => import("../pages/users/IndexPage"));

const root = createBrowserRouter(
  [
    {
      path: "",
      element: (
        <Suspense fallback={Loading}>
          <Main></Main>
        </Suspense>
      ),
    },
    {
      path: "popup",
      element: (
        <Suspense fallback={Loading}>
          <Popup></Popup>
        </Suspense>
      ),
      children: popupRouter(),
    },
    {
      path: "user",
      element: (
        <Suspense fallback={Loading}>
          <User></User>
        </Suspense>
      ),
      children: userRouter(),
    },
    {
      path: "about",
      element: (
        <Suspense fallback={Loading}>
          <About></About>
        </Suspense>
      ),
    },
    {
      path: "/popup/reservation/:id",
      element: (
        <Suspense fallback={Loading}>
          <Reservation></Reservation>
        </Suspense>
      ),
    },
    {
      path: "/popup/board/ad",
      element: (
        <Suspense fallback={Loading}>
          <AdBoard></AdBoard>
        </Suspense>
      ),
    },
  ],
  { basename: "/popble" }
);

export default root;
