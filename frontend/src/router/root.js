// src/router/root.js
import { createBrowserRouter, Navigate } from "react-router-dom";
import { Suspense, lazy } from "react";

import popupStoreRouter from "./popupStoreRouter";
import memberRouter from "./memberRouter";
import userRouter from "./userRouter";


const Loading = <div>Loading......</div>

const About = lazy( () => import("../pages/AboutPage"))
const Main = lazy( () => import("../pages/MainPage") )
const AdBoard = lazy( () => import("../pages/board/AdBoardPage"))
const Popup = lazy(() => import("../pages/popupStore/PopupIndexPage"));
const Member = lazy(() => import("../pages/member/IndexPage"));


import BoardsRouter from "./BoardsRouter";


const Loading = <div>Loading......</div>;
const BoardsLayout = lazy(() => import("../layout/BoardsLayout")); // ← 여기!

const root = createBrowserRouter([
  {
    path: "boards",
    element: (
      <Suspense fallback={Loading}>
        <BoardsLayout />
      </Suspense>
    ),
    children: BoardsRouter(),
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
        path:"about",
        element:<Suspense fallback={Loading}><About></About></Suspense>
  
    },
    {
        path:"/popup/board/ad",
        element:<Suspense fallback={Loading}><AdBoard></AdBoard></Suspense>
    },
    {
        path:"user",
        children:userRouter()
    }


  { path: "*", element: <Navigate to="/boards" replace /> },

]);

export default root;
