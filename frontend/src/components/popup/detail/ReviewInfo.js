const ReviewInfo = () => {
  return (
    <div>
      {/* 평점 */}
      <div className="w-3/5 p-2 justify-center bg-white border border-hashTagColor rounded-xl shadow-sm">
        <div></div>
      </div>

      {/* 리뷰 */}
      <div className="mt-4 space-y-3">
        <div className="p-4 border rounded-lg shadow-sm"></div>
          <p className="font-semibold">홍길동</p>
          <p>정말 좋았어요!</p>
        </div>
        <div className="p-4 border rounded-lg shadow-sm">
          <p className="font-semibold">김철수</p>
          <p>가격 대비 만족도가 높습니다.</p>
        </div>
      </div>
  );
};

export default ReviewInfo;