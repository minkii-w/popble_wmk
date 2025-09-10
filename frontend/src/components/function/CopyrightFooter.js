import React from "react";

import { FiInstagram } from "react-icons/fi";
import { MdOutlineEmail } from "react-icons/md";

//저작권
const CopyrightFooter = ({ company = "POPBLE" }) => {
  const year = new Date().getFullYear();

  return (
    <>
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-center">
        <p className="text-xs text-gray-500">
          Copyright © {year} {company}.
        </p>
      </div>

      {/* 아이콘: 저작권 밑에 위치 */}
      <div className="flex justify-center items-center gap-4">
        <FiInstagram size={18} />
        <MdOutlineEmail size={19} />
      </div>
    </>
  );
};

export default CopyrightFooter;
