import React, { useState } from "react";

import { FaRegEye } from "react-icons/fa";
import { FiMapPin } from "react-icons/fi";
import { MdEmail, MdOutlineWatchLater } from "react-icons/md";
import { LuTimerReset } from "react-icons/lu";
import { FiInstagram } from "react-icons/fi";
import { MdOutlineEmail } from "react-icons/md";
import { FiPhone } from "react-icons/fi";

import Car from "../../../assets/img/icon_car.png"
import noCar from "../../../assets/img/icon_car_no.png"
import Card from "../../../assets/img/icon_card_free.png"
import Paid from "../../../assets/img/icon_card_paid.png"

const BasicInfo = () => {
    const [text] = useState("애니 / 캐릭터");

    return (
        <div>
            {/* 카테고리 */}
            <div className="flex mb-4">
                <span className="inline-block px-3 py-1 rounded-3xl bg-subButtonColor shadow-md text-center text-sm">
                    애니 / 캐릭터
                </span>
            </div>

            {/* 조회수 */}
            <div className="flex justify-end">
                <FaRegEye />
            </div>

            {/* 이름, 기간 */}
            <h2 className="text-3xl font-bold mb-2">2025 산리오 키즈 페스티벌</h2>
            <h3 className="text-r font-semibold mb-2">2025. 07. 11(금) ~ 2025. 11. 15(토)</h3>

            {/* 위치, 시간, 러닝타임 */}
            <div className="mt-10 mb-4 text-sm flex flex-col gap-3">
                <div className="flex items-center gap-2">
                    <FiMapPin size={17}/>
                    <span>서울 영등포구 여의도동 국제금융로 10, 여의도 IFC 몰 L3층 MPX 갤러리</span>
                </div>
                <div className="flex items-start gap-2">
                    <MdOutlineWatchLater className="mt-0.5" size={17}/>
                    <div className="flex flex-col gap-1">
                        <span>주중 11시 - 20시 (입장마감:19시)</span>
                        <span>주말 11시 - 20시 (입장마감:19시)</span>
                    </div>
                </div>
                <div className="flex items-center gap-2">
                    <LuTimerReset size={17}/>
                    <span>러닝타임: 약 60 ~ 90분</span>
                </div>

            {/* 주차, 입장료 */}
            <div className="mt-5 mb-4 ml-6 text-sm flex items-center gap-20">
                <div className="flex flex-col items-center gap-2">
                    <img src={Car} height='65px' width= '65px'></img>
                    <span>주차 가능</span>
                </div>
                <div className="flex flex-col items-center gap-2">
                    <img src={Paid} height='60px' width= '60px'></img>
                    <span>입장료 유료</span>
                </div>
            </div>

            {/* 콘텐츠 */}
            <h3 className="text-r font-semibold mt-5">콘텐츠</h3>
            <p className="leading-6 mb-5">
                🎀 산리오캐릭터즈와 함께하는 핑크빛 체크인 🎀<br/>
                Hotel Floria: Check-in with Sanrio characters에서 펼쳐지는 하나뿐인 미디어아트<br/>
                헬로키티, 마이멜로디, 쿠로미, 시나모롤까지,
                사랑스러운 산리오캐릭터즈가 Hotel Floria에 체크인했어요.<br/>
                현실과 꿈의 경계를 넘어, 시공을 초월한 핑크빛 공간에서
                사랑스러운 산리오캐릭터즈와 함께 특별한 하루를 경험해 보세요.<br/>
                🧸 사랑스럽고 따뜻한 감성의 산리오캐릭터즈와 함께하는 미디어 호텔 체험<br/>
                🎀 자연의 따스함과 산리오의 감성이 어우러진 핑크빛 상상의 공간<br/>
                🏰 산리오캐릭터즈를 위해 준비한 객실, 반짝이는 정원, 그리고 설렘 가득한 연회장까지—모든 순간이 마법 같은 동화로 피어납니다.<br/>
                ✨ 호텔 플로리아에서만 만날 수 있는 특별 굿즈와 포토존<br/>
                🌟 빛과 음악, 색채가 어우러진 미디어아트로 완성된, 꿈같은 하루를 만나보세요.<br/>
            </p>

            {/* 관람 유의사함 */}
            <h3 className="text-r font-semibold mt-5">관람 유의사항</h3>
            <p className="leading-6 mb-5">
                • 외부 음식물 및 음료는 반입이 불가합니다.<br/>
                • 쾌적한 관람 환경을 위해 개인 촬영 장비(ex.액션캠, DSLR, 삼각대, 셀카봉), 대형 쇼핑백은 전시장 반입이 제한됩니다. 보관이 필요하신 경우 IFC몰 내 물품 보관소를 이용해 주세요.<br/>
                • 전시장 내 유모차 보관이 불가하오니, 유모차는 차량에 보관해 주시거나 아기 띠를 이용해 주시기 바랍니다.<br/>
                • 우천 시 장우산은 입구 데스크에 맡겨주세요. 단, 소지품 분실에 대한 책임은 지지 않습니다.<br/>
                • 현장 대기가 발생할 수 있으며 주말엔 웨이팅시간이 길 수 있으므로 이 점 방문시 양해(고려) 부탁드립니다.<br/>
            </p>


            {/* sns 아이콘 */}
            <div className="mt-5 mb-5 text-sm flex items-center gap-3">
                    <FiInstagram size={25}/>
                    <MdOutlineEmail size={27}/>
                    <FiPhone size={25}/>
            </div>

            {/* 해시태그 */}
            <div className="flex items-center mb-4 gap-3">
                <span className="inline-block px-3 py-1 rounded-3xl bg-hashTagColor shadow-md text-center bg-hashTagColor text-black text-xs">
                    # 산리오
                </span>
                <span className="inline-block px-3 py-1 rounded-3xl bg-hashTagColor shadow-md text-center text-black text-xs">
                    # 캐릭터
                </span>
                <span className="inline-block px-3 py-1 rounded-3xl bg-hashTagColor shadow-md text-center text-black text-xs">
                    # 여의도
                </span>
                <span className="inline-block px-3 py-1 rounded-3xl bg-hashTagColor shadow-md text-center text-black text-xs">
                    # FC몰
                </span>
            </div>
        </div>
    </div>
  );
};
export default BasicInfo;
