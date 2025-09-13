
import { lazy, Suspense } from "react";
import { Navigate } from "react-router-dom";

const Loading = <div>Loading....</div>;
const ListPage = lazy(() => import("../pages/popupStore/ListPage"));
const Reservation = lazy( () => import("../pages/reservation/ReservationPage"));


const popupStoreRouter = () => {
  return [
    {
      path: "list",
      element: (
        <Suspense lazy={Loading}>
          <ListPage></ListPage>
        </Suspense>
      ),
    },
    {
      path: "",
      element: (
        <Suspense fallback={Loading}>
          <Navigate replace to="list"></Navigate>
        </Suspense>
      ),
    },
    {
      path: ":id",
      element: <Suspense fallback={Loading}></Suspense>,
    },
    {
      path:"reservation/:id",
      element: <Suspense fallback={Loading}><Reservation></Reservation></Suspense>
    }
  ];
};

export default popupStoreRouter;

