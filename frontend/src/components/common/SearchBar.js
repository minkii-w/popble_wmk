import { FcSearch } from "react-icons/fc";
import { useState } from "react";

const SearchBar = ({className, onSearch}) => {

    const [keyword, setKeyword] = useState("");

    const handleEnterKey = (e) =>{
        if (e.key === "Enter" && onSearch){
            console.log("엔터 확인")
            onSearch(keyword);
        }
    }


    return(
       
          <div className={`flex justify-center ${className}`}>
            <div className="md:w-full px-5 py-5">
                <div className="relative mb-10 flex w-full flex-wrap items-stretch"> 
                    {/* 검색창, 입력 */}
                    <input className="w-full p-3 pl-5 rounded-3xl border border-solid border-neutral-300 shadow-md" 
                        value = {keyword}
                        placeholder="검색할 내용을 입력하세요"
                        onChange={(e) => setKeyword(e.target.value)} 
                        onKeyDown = {handleEnterKey}
                        ></input>

                    {/* 검색 아이콘 */}
                    <FcSearch className="absolute right-5 top-1/2 -translate-y-1/2 text-xl cursor-pointer" 
                            size={27} 
                            onClick={() => {onSearch && onSearch(keyword);
                                console.log("확인");
                    }}> 
                    </FcSearch>
                </div>       
            </div>        
         </div>
     
    )
}
export default SearchBar;