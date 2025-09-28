import { Link } from "react-router-dom";
import { FaHeart } from "react-icons/fa";
import { PiEyesFill } from "react-icons/pi";
import { FaRegEye } from "react-icons/fa";

//임시용 이미지
import img3 from "../../../assets/img/1.jpeg";

const PopularPopupComponent = ({ item, index, type }) => {
  return (
    <Link
      to={`/popup/detail/${item.id}`}
      className="relative flex flex-col w-[200px] h-[290px] rounded-lg m-5 p-3 
               bg-gradient-to-br from-black/20 to-black/60 backdrop-blur-md border border-white/20
                shadow-md hover:shadow-xl transition-all duration-300
                overflow-hidden"
    >
      {/* 숫자표시 */}
      <div
        className="absolute top-2 left-2  text-white text-6xl font-bold
      w-10 h-10 z-20 flex items-center justify-center rounded-full"
        style={{ transform: "rotate(2deg)" }}
      >
        {index + 1}
      </div>
      {/* 인기 또는 조회 수 */}
      <div className="absolute top-3 right-2 text-white text-sm w-6 h-6 z-20 items-center justify-center">
        {type === "recommend" ? (
          <>
            <FaHeart size={20} className="mb-1" /> {item.recommend}
          </>
        ) : (
          <>
            <FaRegEye size={20} className="mb-1" /> {item.view}
          </>
        )}
      </div>
      {/* 팝업 이미지 */}
      <img
        // Todo: 하드코딩용 임시 블락 데이터 입력후 주석 해제
        // src={item.image}
        src={img3}
        alt={item.title}
        className="absolute inset-0 w-full h-full object-cover"
      ></img>

      {/* 오버레이 */}
      <div className="absolute inset-0 bg-gradient-to-br from-black/30 to-black/90 bg-opacity-50 z-10"></div>

      {/* 카드 내용 */}
      <div className="absolute bottom-0 left-0 right-0 z-20 p-3 flex flex-col justify-end h-[90px] items-end text-right">
        <h3 className="font-bold text-base text-gray-100">{item.storeName}</h3>
        <p className="text-sm text-gray-100">{item.address}</p>
        <p className="text-sm text-gray-100">
          <span className="text-end">{item.startDate}</span>
          <br />
          <span>{item.endDate}</span>
        </p>
      </div>
    </Link>
  );
};

export default PopularPopupComponent;
