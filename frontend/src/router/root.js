import { createBrowserRouter } from "react-router-dom";
import { Suspense,lazy } from "react";
import userRouter from "./userRouter";

const Loading = <div>Loading......</div>
const Main = lazy( () => import("../pages/MainPage") )

const root = createBrowserRouter([
    {
        path:"",
        element:<Suspense fallback = {Loading}><Main></Main></Suspense>
    },

    {
        path:"user",
        children:userRouter()


    }

])

export default root;