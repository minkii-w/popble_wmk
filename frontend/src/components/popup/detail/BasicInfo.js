import React, { useState } from "react";

import { FaRegEye } from "react-icons/fa";
import { FiMapPin } from "react-icons/fi";
import { MdEmail, MdOutlineWatchLater } from "react-icons/md";
import { LuTimerReset } from "react-icons/lu";
import { FiInstagram } from "react-icons/fi";
import { MdOutlineEmail } from "react-icons/md";
import { FiPhone } from "react-icons/fi";

import Car from "../../../assets/img/icon_car.png";
import NoCar from "../../../assets/img/icon_car_no.png";
import Card from "../../../assets/img/icon_card_free.png";
import Paid from "../../../assets/img/icon_card_paid.png";

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
      <h3 className="text-r font-semibold mb-2">
        2025. 07. 11(금) ~ 2025. 11. 15(토)
      </h3>

      {/* 위치, 시간, 러닝타임 */}
      <div className="mt-10 mb-4 text-sm flex flex-col gap-3">
        <div className="flex items-center gap-2">
          <FiMapPin size={17} />
          <span>
            서울 영등포구 여의도동 국제금융로 10, 여의도 IFC 몰 L3층 MPX 갤러리
          </span>
        </div>
        <div className="flex items-start gap-2">
          <MdOutlineWatchLater className="mt-0.5" size={17} />
          <div className="flex flex-col gap-1">
            <span>주중 11시 - 20시 (입장마감:19시)</span>
            <span>주말 11시 - 20시 (입장마감:19시)</span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <LuTimerReset size={17} />
          <span>러닝타임: 약 60 ~ 90분</span>
        </div>

        {/* 주차, 입장료 */}
        <div className="mt-5 mb-4 ml-6 text-sm flex items-center gap-10">
          <div className="flex flex-col items-center gap-2">
            <img src={Car} height="65px" width="65px"></img>
            <span>주차 가능</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <img src={Paid} height="60px" width="60px"></img>
            <span>입장료 유료</span>
          </div>
        </div>

        {/* 콘텐츠 */}
        <h3 className="text-r font-semibold mt-5">콘텐츠</h3>
        <p className="">
          헬로키티, 마이멜로디, 쿠로미, 시나모롤까지, 사랑스러운
          산리오캐릭터즈가 Hotel Floria에 체크인했어요.🏩 현실과 꿈의 경계를
          넘어, 시공을 초월한 핑크빛 공간에서 사랑스러운 산리오캐릭터즈와 함께
          특별한 하루를 경험해 보세요.✨
        </p>

        {/* sns 아이콘 */}
        <div className="mt-10 mb-4 text-sm flex items-center gap-3">
          <FiInstagram size={25} />
          <MdOutlineEmail size={27} />
          <FiPhone size={25} />
        </div>

        {/* 해시태그 */}
        <div className="flex items-center mb-4 gap-3">
          <span className="inline-block px-3 py-1 rounded-3xl bg-hashTagColor shadow-md text-center text-white text-xs">
            # 산리오
          </span>
          <span className="inline-block px-3 py-1 rounded-3xl bg-hashTagColor shadow-md text-center text-white text-xs">
            # 캐릭터
          </span>
          <span className="inline-block px-3 py-1 rounded-3xl bg-hashTagColor shadow-md text-center text-white text-xs">
            # 여의도
          </span>
          <span className="inline-block px-3 py-1 rounded-3xl bg-hashTagColor shadow-md text-center text-white text-xs">
            # FC몰
          </span>
        </div>
      </div>
    </div>
  );
};

export default BasicInfo;
