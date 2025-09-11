const PageComponent = ({ serverData, movePage }) => {
  return (
    <div className="m-6 flex justify-center">
      {serverData.prev ? (
        <div
          className="m-2 p-2 w-16 text-center rounded-2xl shadow-md bg-secondaryAccentColor font-bold text-white"
          onClick={() => movePage({ page: serverData.prevPage })}
        >
          이전
        </div>
      ) : (
        <></>
      )}
      {serverData.pageNumList.map((pageNum) => (
        <div
          key={pageNum}
          className={`m-2 p-2 w-10 text-center rounded-full shadow-md text-white border-secondaryAccentColor border-2
                    ${
                      serverData.current === pageNum
                        ? "bg-secondaryAccentColor"
                        : "bg-secondaryColor"
                    }`}
          onClick={() => movePage({ page: pageNum })}
        >
          {pageNum}
        </div>
      ))}
      {serverData.next ? (
        <div
          className="m-2 p-2 w-16 text-center rounded-2xl shadow-md bg-secondaryAccentColor font-bold text-white"
          onClick={() => movePage({ page: serverData.nextPage })}
        >
          다음
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};

export default PageComponent;
