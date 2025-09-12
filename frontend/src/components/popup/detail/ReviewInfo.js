const ReviewInfo = () => {
  return (
    <div>
      <h2 className="text-xl font-bold mb-2">후기</h2>
      <p>사용자 후기 리스트</p>

      <div className="mt-4 space-y-3">
        <div className="p-4 border rounded-lg shadow-sm">
          <p className="font-semibold">홍길동</p>
          <p>정말 좋았어요!</p>
        </div>
        <div className="p-4 border rounded-lg shadow-sm">
          <p className="font-semibold">김철수</p>
          <p>가격 대비 만족도가 높습니다.</p>
        </div>
      </div>
    </div>
  );
};

export default ReviewInfo;
