import { createBrowserRouter } from "react-router-dom";
import { Suspense, lazy } from "react";
import popupStoreRouter from "./popupStoreRouter";
import memberRouter from "./memberRouter";

const Loading = <div>Loading......</div>;
const Main = lazy(() => import("../pages/MainPage"));
const Popup = lazy(() => import("../pages/popupStore/PopupIndexPage"));
const Member = lazy(() => import("../pages/member/IndexPage"));
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
]);

export default root;
