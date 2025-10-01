import React from "react";

import { FiInstagram } from "react-icons/fi";
import { MdOutlineEmail } from "react-icons/md";

//저작권
const CopyrightFooter = ({ company = "POPBLE" }) => {
  const year = new Date().getFullYear();

  return (
    <>
      <div className="mt-4 max-w-6xl flex items-center justify-start">
        <p className="text-xs text-gray-800 m-1">
          Copyright © {year} {company}. All Rights Reserved.
        </p>
      </div>

      {/* 아이콘: 저작권 밑에 위치 */}
      <div className="flex justify-start text-xs font-medium ml-1 gap-5">
        <a className="flex items-center gap-1"><FiInstagram size={18} />@Popble</a>
        <a className="flex items-center gap-1"><MdOutlineEmail size={19} />popble@gmail.com</a>
      </div>
      <div className="py-10"></div>
    </>
  );
};

export default CopyrightFooter;
