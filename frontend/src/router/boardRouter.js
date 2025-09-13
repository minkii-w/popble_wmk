import { Suspense, lazy } from "react";
import { Navigate } from "react-router-dom";

const boardRouter = () => {

    const Loading = <div>Loading...</div>
    const PopupStoreAdd = lazy( () => import("../pages/board/AdBoardPage"))
    const PopupStoreModify = lazy( () => import("../pages/board/AdBoardModifyPage"))
    const Reservation = lazy( () => import("../pages/reservation/ReservationPage"))

    return [
        {
            path:"",
            element:<Navigate replace to="/popup/reservation"></Navigate>
        },
        {
            path:"reservation",
            element:<Suspense fallback={Loading}><Reservation></Reservation></Suspense>
        },
        {
            path:"add",
            element:<Suspense fallback={Loading}><PopupStoreAdd></PopupStoreAdd></Suspense>
        },
        {
            path:"modify/:id",
            element:<Suspense fallback={Loading}><PopupStoreModify></PopupStoreModify></Suspense>
        }
    ]
}

export default boardRouter;