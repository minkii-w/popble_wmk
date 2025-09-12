import { Suspense, lazy } from "react";


const Loading = <div>Reservation Loading.......</div>
const Reservation = lazy( () => import("../pages/reservation/ReservationPage"))


const reservationRouter= ()=> {
    return[
    
];
}

export default reservationRouter;