import { Suspense, lazy } from "react";

const Loading = <div>Loading.........</div>
const Login = lazy( () => import("../pages/users/LoginPage"))
const Join = lazy( () => import("../pages/users/JoinPage"))
const Success = lazy( () => import("../pages/users/LoginSuccessPage"))

const userRouter = () => {

    return[
        {
            path:"login",
            element:<Suspense fallback={Loading}><Login></Login></Suspense>

        },
        {
            path:"join",
            element:<Suspense fallback={Loading}><Join></Join></Suspense>
        },
        {


            path:"success",
            element:<Suspense fallback={Loading}><Success></Success></Suspense>



        }
    ]

}

export default userRouter;