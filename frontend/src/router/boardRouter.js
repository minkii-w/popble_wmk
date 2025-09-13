import { Suspense, lazy } from "react";
import { Navigate } from "react-router-dom";
import LoadingComponent from "../components/common/LoadingComponent";

const boardRouter = () => {
  const Loading = <div>Loading...</div>;
  const PopupStoreAdd = lazy(() => import("../pages/board/AdBoardPage"));
  const PopupStoreModify = lazy(() => import(""));

  return [
    {
      path: "",
      element: <Navigate replace to="/popup/ad"></Navigate>,
    },
    {
      path: "add",
      element: (
        <Suspense fallback={Loading}>
          <PopupStoreAdd></PopupStoreAdd>
        </Suspense>
      ),
    },
    {
      path: "modify/:id",
      element: (
        <Suspense fallback={Loading}>
          <PopupStoreModify></PopupStoreModify>
        </Suspense>
      ),
    },
  ];
};

export default boardRouter;
