import BasicMenu from "../components/BasicMenu";

const BasicLayout = ({ children }) => {
  return (
    //메인화면 레이아웃
    <>
      <BasicMenu>
        {/* 캐러셀 */}
        <div style={{ marginTop: "50px", marginBottom: "20px" }}>
          {children}
        </div>
      </BasicMenu>
    </>
  );
};
export default BasicLayout;
