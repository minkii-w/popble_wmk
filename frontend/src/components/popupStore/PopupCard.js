import { Link } from "react-router-dom";
import san1 from "../../assets/testImg/san1.jpg";

const PopupCard = ({ item }) => {
  return (
    <Link
      to={`/popup/${item.id}`}
      className="flex bg-secondaryColor w-[380px] h-[180px] rounded-lg shdow-md m-5 p-3 hover:shadow-lg transition border-secondaryAccentColor border-2"
    >
      <img
        src={san1}
        alt={item.title}
        className="w-[150px] h-[150px] object-cover rounded-md flex-shrink-0"
      ></img>
      <div className="ml-4 flex flex-col justify-between">
        <h3 className="font-bold text-lg">{item.storeName}</h3>
        <p className="text-sm text-gray-500">{item.address}</p>
        <p className="text-sm text-gray-500">
          {item.startDate} ~ {item.endDate}
        </p>
      </div>
    </Link>
  );
};

export default PopupCard;
