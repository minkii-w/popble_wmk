import { createBrowserRouter } from "react-router-dom";

import { Suspense, lazy } from "react";
import popupRouter from "./popupRouter";
import userRouter from "./userRouter";
import LoadingComponent from "../components/common/LoadingComponent";

const Loading = <div>Loading......</div>;

const About = lazy(() => import("../pages/AboutPage"));
const Main = lazy(() => import("../pages/MainPage"));
const Reservation = lazy(() => import("../pages/reservation/ReservationPage"));
const AdBoard = lazy(() => import("../pages/board/AdBoardPage"));
const Popup = lazy(() => import("../pages/popupStore/PopupIndexPage"));
const User = lazy(() => import("../pages/users/IndexPage"));
const Search = lazy(() => import("../pages/popupStore/PopupIndexPage"));

const root = createBrowserRouter(
  [
    {
      path: "",
      element: (
        <Suspense fallback={<LoadingComponent />}>
          <Main></Main>
        </Suspense>
      ),
    },
    {
      path: "popup",
      element: (
        <Suspense fallback={<LoadingComponent />}>
          <Popup></Popup>
        </Suspense>
      ),
      children: popupRouter(),
    },
    {
      path: "user",
      element: (
        <Suspense fallback={<LoadingComponent />}>
          <User></User>
        </Suspense>
      ),
      children: userRouter(),
    },
    {
      path: "about",
      element: (
        <Suspense fallback={<LoadingComponent />}>
          <About></About>
        </Suspense>
      ),
    },
    {
      path: "/popup/reservation/:id",
      element: (
        <Suspense fallback={<LoadingComponent />}>
          <Reservation></Reservation>
        </Suspense>
      ),
    },
    {
      path: "/popup/board/ad",
      element: (
        <Suspense fallback={<LoadingComponent />}>
          <AdBoard></AdBoard>
        </Suspense>
      ),
    },
    {
      path: "search",
      element: (
        <Suspense fallback={<LoadingComponent />}>
          <Search></Search>
        </Suspense>
      ),
    },
  ],
  { basename: "/popble" }
);

export default root;
