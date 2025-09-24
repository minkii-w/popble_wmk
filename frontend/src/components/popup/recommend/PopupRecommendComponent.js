import { useState, useEffect } from "react";
import { FaRegHeart } from "react-icons/fa";
import {
  getIsRecommended,
  postRecommend,
  deleteRecommend,
} from "../../../api/popupRecommendApi";
import { useStyleSheetContext } from "styled-components/dist/models/StyleSheetManager";

//팝업 전용 추천 컴포넌트
const PopupRecommendComponent = ({ popupId }) => {
  const userId = useStyleSheetContext((state) => state.auth?.user?.id);

  const [isRecommended, setIsRecommended] = useState(false);
  const [Loading, setLoading] = useState(false);

  useEffect(() => {
    if (!userId) return;
    async function fetchStatus() {
      try {
        const data = await getIsRecommended(popupId);
        setIsRecommended(data.isRecommended);
      } catch (e) {
        console.eeror("추천 가져오기 실패", e);
      }
    }
    fetchStatus();
  }, [popupId]);

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
      alert("추천 오류 발생", e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div onClick={handleClick} style={{ cursor: "pointer" }}>
      <FaRegHeart color={isRecommended ? "red" : ""} size={25}></FaRegHeart>
    </div>
  );
};

export default PopupRecommendComponent;
