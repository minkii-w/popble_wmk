import { createBrowserRouter } from "react-router-dom";
import { Suspense,lazy } from "react";


const Loading = <div>Loading......</div>
const Main = lazy( () => import("../pages/MainPage") )
const Reservation = lazy( () => import("../pages/reservation/ReservationPage"))


const root = createBrowserRouter([
    {
        path:"",
        element:<Suspense fallback = {Loading}><Main></Main></Suspense>
    },
    {
        path:"/popup/reservation/:id",
        element:<Suspense fallback={Loading}><Reservation></Reservation></Suspense>
    }

])

export default root;