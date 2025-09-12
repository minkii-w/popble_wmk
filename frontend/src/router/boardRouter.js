import { Suspense, lazy } from "react";
import { Navigate } from "react-router-dom";
import LoadingComponent from "../components/common/LoadingComponent";

const boardRouter = () => {
  const Loading = <div>Loading...</div>;
  const PopupStoreAdd = lazy(() => import("../pages/board/AdBoardPage"));

  return [
    {
      path: "",
      element: <Navigate replace to="/boards"></Navigate>,
    },
    {
      path: "add",
      element: (
        <Suspense fallback={<LoadingComponent />}>
          <PopupStoreAdd></PopupStoreAdd>
        </Suspense>
      ),
    },
  ];
};

export default boardRouter;
