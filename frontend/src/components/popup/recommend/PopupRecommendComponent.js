import { useState, useEffect } from "react";
import { FaRegHeart } from "react-icons/fa";
import {
  getIsRecommended,
  postRecommend,
  deleteRecommend,
} from "../../../api/popupRecommendApi";

const PopupRecommendComponent = ({ popupId }) => {
  const [isRecommended, setIsRecommended] = useState(false);
  const [Loading, setLoading] = useState(false);

  useEffect(() => {
    async function fetchStatus() {
      const data = await getIsRecommended(popupId);
      setIsRecommended(data.isRecommended);
    }
    fetchStatus();
  }, [popupId]);

  const handleClick = async () => {
    setLoading(true);
    if (isRecommended) {
      await deleteRecommend(popupId);
      setIsRecommended(false);
    } else {
      await postRecommend(popupId);
      setIsRecommended(true);
    }
    setLoading(false);
  };

  return (
    <div onClick={handleClick} style={{ cursor: "pointer" }}>
      <FaRegHeart color={isRecommended ? "red" : ""} size={25}></FaRegHeart>
    </div>
  );
};

export default PopupRecommendComponent;
