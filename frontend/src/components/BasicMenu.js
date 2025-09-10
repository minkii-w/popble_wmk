import Footer from "./Footer";
import Header from "./Header";

import { FiArrowUp } from "react-icons/fi";

const BasicMenu = ({ children }) => {
  return (
    <>
      {/* 상단 메뉴바 + 네비바*/}
      <Header />

      {/* 페이지 내용과 Footer 겹치지 않도록 padding-bottom */}
      <div className="pb-20">{children}</div>

      {/* 고정 메뉴(채팅, 위로이동) */}

      <button
        className="fixed bottom-10 right-10 m-10 p-1 shadow-md rounded-full bg-secondaryAccentColor w-[50px] h-[50px] items-center flex justify-center"
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      >
        <FiArrowUp size={30} className="items-center justify-center" />
      </button>

      {/* 저작권 */}
      <Footer />
    </>
  );
};
export default BasicMenu;
