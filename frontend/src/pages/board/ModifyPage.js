import { useParams } from "react-router-dom"
import ModifyComponent from "../../components/board/ModifyComponent"

const ModifyPage = ( ) =>{

    const { id } = useParams();

    return(
        <div className="p-4 w-full bg-white">
        <div className="text-3xl font-extrabold">
             Modify Page        
            </div>
            <ModifyComponent id ={id}></ModifyComponent>
        </div>
    )

}

export default ModifyPage