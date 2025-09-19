import { Link } from "react-router-dom";

const PopularPopupComponent = ({ item }) => {
  return (
    <Link
      to={`/popup/detail/${item.id}`}
      className="relative flex flex-col bg-secondaryColor w-[200px] h-[290px] rounded-lg m-5 p-3 hover:shadow-lg transition border-secondaryAccentColor border-2 overflow-hidden"
    >
      {/* 팝업간단정보 */}
      <img
        src={item.image}
        alt={item.title}
        className="w-full h-[200px] object-cover"
      ></img>
      <div className="p-3 flex flex-col justify-between h-[90px]">
        <h3 className="font-bold text-lg">{item.storeName}</h3>
        {/* <p className="text-sm text-gray-500">{item.address}</p> */}
        <p className="text-sm text-gray-500">
          {item.startDate} ~ {item.endDate}
        </p>
      </div>
    </Link>
  );
};

export default PopularPopupComponent;
