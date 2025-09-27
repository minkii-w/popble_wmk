import { useState, useEffect } from "react";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import {
  getIsRecommended,
  postRecommend,
  deleteRecommend,
} from "../../../api/popupRecommendApi";
import { useSelector } from "react-redux";

//팝업 전용 추천 컴포넌트
const PopupRecommendComponent = ({ popupId }) => {
  const userId = useSelector((state) => state.auth?.user?.id);

  const [isRecommended, setIsRecommended] = useState(false);
  const [Loading, setLoading] = useState(false);

  useEffect(() => {
    if (!userId) return;
    async function fetchStatus() {
      try {
        const data = await getIsRecommended(popupId);
        setIsRecommended(data);
      } catch (e) {
        console.error("추천 가져오기 실패", e);
      }
    }
    fetchStatus();
  }, [popupId, userId]);

  const handleClick = async () => {
    if (!userId) {
      alert("로그인 후 추천 가능합니다");
      return;
    }
    setLoading(true);
    try {
      if (isRecommended) {
        await deleteRecommend(popupId);
        setIsRecommended(false);
      } else {
        await postRecommend(popupId);
        setIsRecommended(true);
      }
    } catch (e) {
      if (e.response?.data?.message) {
        alert(e.response.data.message);
      } else {
        alert("추천 오류 발생");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div onClick={handleClick} style={{ cursor: "pointer" }}>
      {isRecommended ? (
        <FaHeart size={25} color="red" />
      ) : (
        <FaRegHeart size={25} />
      )}
    </div>
  );
};

export default PopupRecommendComponent;
