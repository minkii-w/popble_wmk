import { Link } from "react-router-dom";
import NavBar from "./function/NavBar";

const BasicMenu = () => {
    return(
        //상단 메뉴바 로고
        //상단 색상 지정
        <div id='menubar' className="flex bg-primaryColor">
            {/* 로고 삽입 및 여백 지정 */}
            <div className="ml-10 mt-2 mb-2">
            <img className="logo" alt="POPBLE logo" src="img/POPBLE Logo.png"
                width='160' height='20'></img>
                        <Link to={'/'}></Link>
            </div>

            {/* 햄버거 버튼 */}
            <div className="ml-auto mt-5">
                <NavBar/>
            </div>
        </div>
    );
}
export default BasicMenu;