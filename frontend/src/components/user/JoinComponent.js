import { useState } from "react";
import {useCustomMove} from "../../hooks/useCustomMove"
import { postJoin } from "../../api/userApi";
    const initState ={

        loginId:'',
        password:'',
        password2:'',
        email:'',
        name:'',



    }

    // const JoinComponent = () => {

    //     const [join, setJoin] = useState( {...initState})

    //     const [result, setResult] = useState(null)

    //     const {moveToList} = useCustomMove()

    //     const handleChangeJoin = (e) => {
    //         join[e.target.name] =e.target.value
    //         setJoin({...join})
    //     }


    //     const handleClickJoin = () => {

    //         console.log(join)
    //         postJoin(join).then(result => {
    //             set
    //         })







    //     }







    //     return(
    //         <div></div>


    //     )




    // }

    export default JoinComponent;