import { createBrowserRouter } from "react-router-dom";

import { Suspense, lazy } from "react";
import popupStoreRouter from "./popupStoreRouter";
import memberRouter from "./memberRouter";
import userRouter from "./userRouter";


const Loading = <div>Loading......</div>

const About = lazy( () => import("../pages/AboutPage"))
const Main = lazy( () => import("../pages/MainPage") )
const Reservation = lazy( () => import("../pages/reservation/ReservationPage"))
const AdBoard = lazy( () => import("../pages/board/AdBoardPage"))
const Popup = lazy(() => import("../pages/popupStore/PopupIndexPage"));
const Member = lazy(() => import("../pages/member/IndexPage"));
const Oauth = lazy( () => import("../pages/users/OauthCallback") )


const root = createBrowserRouter([

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
        path:"about",
        element:<Suspense fallback={Loading}><About></About></Suspense>
  
    },
    {
        path:"/popup/reservation/:id",
        element:<Suspense fallback={Loading}><Reservation></Reservation></Suspense>
    },
    {
        path:"/popup/board/ad",
        element:<Suspense fallback={Loading}><AdBoard></AdBoard></Suspense>
    },
    {
        path:"user",
        children:userRouter()
    },

    {
        path:"/oauth/callback",
        element: <Suspense fallback={Loading}><Oauth></Oauth></Suspense>



    }

]);



export default root;
