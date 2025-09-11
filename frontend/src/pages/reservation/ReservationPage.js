import { useParams} from "react-router-dom";
import ReadComponent from "../../components/reservation/ReadComponent";

const ReservationPage = () => {

    const {id} = useParams()

    return (

            <div className="p-4 w-full bg-white">
                <div className="text-3xl font-extrabold">팝업스토어예약
                    <ReadComponent id={id}></ReadComponent>
                </div>
            </div>
    );
}

export default ReservationPage;
