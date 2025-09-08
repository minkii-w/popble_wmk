import { useParams, useSearchParams, createSearchParams } from "react-router-dom";
import ReadComponent from "../../components/reservation/ReadComponent";

const ReservationPage = () => {

    const {id} = useParams()
    console.log("페이지 파라미터 id:",id)

    const [queryParams] = useSearchParams()

    const page = queryParams.get("page")?parseInt(queryParams.get("page")):1
    const size = queryParams.get("size")?parseInt(queryParams.get("size")):10

    const queryStr = createSearchParams({page, size}).toString()

    return (

            <div className="p-4 w-full bg-white">
                <div className="text-3xl font-extrabold">팝업스토어예약
                    <ReadComponent id={id}></ReadComponent>
                </div>
            </div>
    );
}

export default ReservationPage;
