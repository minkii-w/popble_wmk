import BasicMenu from "../components/BasicMenu";

const BasicLayout = ({children}) => {

    return(
        //메인화면 레이아웃
        <>
        <BasicMenu></BasicMenu>

        {/* 캐러셀 */}
        <div style={{marginTop: "50px", marginBottom: "20px"}}>{children}</div>
                
        {/* 검색창 */}
        <div className="flex justify-center">
            <div className="md:w-1/2 px-5 py-5">
                <div className="relative mb-10 flex w-full flex-wrap items-stretch">
                <h1 className="text-sm md:text-1xl"></h1>    
                    <input className="w-full p-3 rounded-3xl border border-solid border-neutral-300 shadow-md text-black placeholder:검색할 내용을 입력하세요."></input>
                </div>       
            </div>        
        </div>

        </>    
    )
}
export default BasicLayout;