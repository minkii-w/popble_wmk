import { useState } from "react";

const SortComponent = ({ onSort }) => {
  const [selectedSort, setSelectedSort] = useState("LATEST");

  const sortList = [
    { label: "최신순", value: "LATEST" },
    { label: "북마크순", value: "BOOKMARK" },
    { label: "조회순", value: "VIEW" },
    { label: "추천순", value: "RECOMMEND" },
    { label: "종료임박순", value: "ENDING_SOON" },
  ];

  const handleSelect = (sort) => {
    setSelectedSort(sort);
    if (onSort) onSort(sort);
  };
  return (
    <div>
      <div className="flex space-x-4 text-sm">
        <h2 className="text-2xl font-bold">정렬</h2>
        {sortList.map((sort) => (
          <button
            key={sort.value}
            onClick={() => handleSelect(sort.value)}
            className={`p-1 m-1 rounded-3xl shdow-md border-gray-400 border-2 text-sm shadow-md ${
              selectedSort === sort.value
                ? "bg-subButtonAccentColor text-white"
                : "bg-subButtonColor"
            }`}
          >
            {sort.label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default SortComponent;
