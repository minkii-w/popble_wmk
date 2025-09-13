// src/router/root.js
import { createBrowserRouter, Navigate } from "react-router-dom";
import { Suspense, lazy } from "react";
import popupRouter from "./popupRouter";
import userRouter from "./userRouter";

const Loading = <div>Loading......</div>;

const About = lazy(() => import("../pages/AboutPage"));
const Main = lazy(() => import("../pages/MainPage"));
const AdBoard = lazy(() => import("../pages/board/AdBoardPage"));
const Popup = lazy(() => import("../pages/popupStore/PopupIndexPage"));
const Member = lazy(() => import("../pages/member/IndexPage"));

import BoardsRouter from "./BoardsRouter";

const Loading = <div>Loading......</div>;
const BoardsLayout = lazy(() => import("../layout/BoardsLayout")); // ← 여기!
import LoadingComponent from "../components/common/LoadingComponent";
import searchRouter from "./searchRouter";
import boardRouter from "./boardRouter";
import NotFoundPage from "../pages/NotFoundPage";
import BasicLayout from "../layout/BasicLayout";

const Main = lazy(() => import("../pages/MainPage"));
const Popup = lazy(() => import("../pages/popup/PopupIndexPage"));
const User = lazy(() => import("../pages/users/IndexPage"));
const Search = lazy(() => import("../pages/search/SearchIndexPage"));
const Board = lazy(() => import("../pages/board/BoardIndexPage"));

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
      children: popupStoreRouter(),
    },
    {
      path: "member",
      element: (
        <Suspense fallback={Loading}>
          <Member></Member>
        </Suspense>
      ),
      children: memberRouter(),
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
      path: "boards",
      element: (
        <Suspense fallback={<LoadingComponent />}>
          <Board></Board>
        </Suspense>
      ),
      children: boardRouter(),
    },
    {
      path: "*",
      element: (
        <BasicLayout>
          <NotFoundPage />
        </BasicLayout>
      ),
    },
  ],
  { basename: "/popble" }
);

export default root;
