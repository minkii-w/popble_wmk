import Header from "./Header";
import Footer from "./Footer";

import { TfiHeadphoneAlt } from "react-icons/tfi";

const BasicMenu = ({ children }) => {
  return (
    <>
      {/* 상단 메뉴바 + 네비바*/}
      <Header />

      {/* 페이지 내용과 Footer 겹치지 않도록 padding-bottom */}
      <div className="pb-20 bg-backgroundColor">{children}</div>

      {/* 저작권 */}
      <Footer />
    </>
  );
};
export default BasicMenu;
