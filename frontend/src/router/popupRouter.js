import { Suspense } from "react";
import ListPage from "../components/popupStore/ListComponent";
import { Navigate } from "react-router-dom";

const Loading = <div>Loading.......</div>;

const popupRouter = () => {
  return [
    {
      path: "search",
      element: (
        <Suspense fallback={Loading}>
          <ListPage></ListPage>
        </Suspense>
      ),
    },
    {
      path: "",
      element: (
        <Suspense fallback={Loading}>
          <Navigate replace to="search"></Navigate>
        </Suspense>
      ),
    },
    {
      path: "detail/:id",
      element: <Suspense fallback={Loading}></Suspense>,
    },
  ];
};

export default popupRouter;
