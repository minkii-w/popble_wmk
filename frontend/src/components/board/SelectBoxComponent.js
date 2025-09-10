import React, {useState} from "react";
import Select from "react-select";

const countOptions = [];
for (let i=1; i<11; i++){
    countOptions.push({value:i,label:`${i}명`});
}


const SelectBoxComponent = () => {
    const [countValue, setCountValue]=useState(null);

    return(
        <>
            <Select
                options={countOptions}
                name="maxcount"
                placeholder="한 타임당 최대 입장 가능 인원수를 선택하세요"
                onChange={(option) => setCountValue(option.value)}/>
                {countValue && <p>선택된 인원:{countValue}명</p>}
        </>
    );
}

export default SelectBoxComponent;