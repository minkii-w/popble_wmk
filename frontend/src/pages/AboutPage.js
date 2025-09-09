import BasicMenu from "../components/BasicMenu";
import { Link } from "react-router-dom";

import Sanrio from "../assets/img/Sanrio MediaArt.jpeg"

import { PiHeartBold } from "react-icons/pi";

const AboutPage = () => {
    return(
        <>
        <BasicMenu></BasicMenu>
       
            {/* 이미지 삽입 및 여백 지정 */}
            <div className="flex justify-center mt-10">
                <img src={Sanrio} height='400px' width= '400px'></img>
                {/* <Link to={'/about'}></Link> */}
            </div>

            {/* 아이콘 버튼 */}
            <div className="flex justify-end">
                <PiHeartBold className="heart" size="24"/>
            </div>
        </>
    )
}
export default AboutPage;