import { Suspense, lazy } from "react";

const Loding = <div>Loading.........</div>
const Login = lazy( () => import("../pages/users/LoginPage"))
const Join = lazy( () => import("../pages/users/JoinPage"))


const userRouter = () => {

    return[


        {
            path:"login",
            element:<Suspense fallback={Loding}><Login></Login></Suspense>

        },


        {

            path:"Join",
            element:<Suspense fallback={Loding}><Join></Join></Suspense>


        }



     



    ]

}

export default userRouter;