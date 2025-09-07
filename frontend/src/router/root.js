import { createBrowserRouter } from "react-router-dom";
import { Suspense, lazy } from "react";
import popupStoreRouter from "./popupStoreRouter";

const Loading = <div>Loading......</div>;
const Main = lazy(() => import("../pages/MainPage"));
const Popup = lazy(() => import("../pages/popupStore/PopupIndexPage"));
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
]);

export default root;
