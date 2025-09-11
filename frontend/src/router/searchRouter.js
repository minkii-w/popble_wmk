import { Suspense } from "react";
import { Navigate } from "react-router-dom";
import LoadingComponent from "../components/common/LoadingComponent";
import ListPage from "../components/popupStore/ListComponent";

const searchRouter = () => {
  return [
    {
      path: "",
      element: (
        <Suspense fallback={<LoadingComponent />}>
          <ListPage></ListPage>
        </Suspense>
      ),
    },
  ];
};
export default searchRouter;
