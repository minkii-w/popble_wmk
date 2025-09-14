import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import {
  EffectCoverflow,
  Pagination,
  Navigation,
  Autoplay,
  Mousewheel,
} from "swiper/modules";

// 이미지 import
import img1 from "../../assets/img/ShinChan1.png";
import img2 from "../../assets/img/Kirby1.jpg";
import img3 from "../../assets/img/forment1.png";
import img4 from "../../assets/img/lockscreen.png";
import img5 from "../../assets/img/1.jpeg";

import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import "swiper/css/navigation";

const Carousel = () => {
  const images = [img1, img2, img3, img4, img5];

  return (
    <div
      style={{
        width: "100%",
        maxWidth: "1200px", //전체 캐러셀 최대 크기
        margin: "0 auto",
        paddingTop: "50px",
      }}
    >
      <Swiper
        effect="coverflow"
        grabCursor={true}
        centeredSlides={true}
        loop={true}     //루프
        //슬라이드 개수(지정 안하니 가끔 자동으로 움직이지 않고 다음 이미지가 안보이는 오류가 생김)
        loopedSlides={5}
        slidesPerView="auto"
        autoplay={{     //자동재생
          delay: 2500,  //딜레이 시간
          disableOnInteraction: false,
          pauseOnMouseEnter: false, //원하면 hover 멈춤 방지
          stopOnLastSlide: false, //autoplay가 마지막에서 멈추는걸 막아줌
          waitForTransition: true,  //전환 애니메이션이 끝날때까지 다음 autoplay를 기다리게 함
        }}
        coverflowEffect={{
          rotate: 0, //회전 각도
          stretch: 0, //양옆 벌어진 정도
          depth: 150,   //깊이감
          modifier: 1.2, //효과 강도(위의 전체 효과 강도)
          slideShadows: true, //그림자 효과
        }}
        pagination={{ clickable: true }}
        navigation={{
          nextEl: ".swiper-button-next-custom",
          prevEl: ".swiper-button-prev-custom",
        }}
        mousewheel={true}
        modules={[EffectCoverflow, Pagination, Navigation, Autoplay, Mousewheel]}
        className="mySwiper"
        style={{
          width: "100%",
          height: "500px",
          willChange: "transform", // GPU 최적화
        }}
      >
        {images.map((img, i) => (
            <SwiperSlide    //박스 스타일 지정
              key={i}
              style={{
                width: "280px", //박스 크기
                height: "380px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                borderRadius: "20px",   //박스 rounder 정도
                overflow: "hidden",
                background: "#111",
                boxShadow: "0 5px 15px rgba(0, 0, 0, 0.5)", //섀도우 크기 조절
                willChange: "transform",
              }}
            >
              <img
                src={img}
                alt={`slide-${i}`}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",   //이미지 꽉 채우기
                }}
              />
            </SwiperSlide>
          )
        )}

        {/* 커스텀 네비게이션 버튼 */}
        <div
          className="swiper-button-prev-custom"
          style={{
            position: "absolute",
            top: "50%",
            left: "10px",
            transform: "translateY(-50%)",
            zIndex: 10,
            background: "rgba(0,0,0,0.6)",
            borderRadius: "50%",
            width: "50px",
            height: "50px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            cursor: "pointer",
            color: "#fff",
            fontSize: "20px",
          }}
        >
          ◀
        </div>
        <div
          className="swiper-button-next-custom"
          style={{
            position: "absolute",
            top: "50%",
            right: "10px",
            transform: "translateY(-50%)",
            zIndex: 10,
            background: "rgba(0,0,0,0.6)",
            borderRadius: "50%",
            width: "50px",
            height: "50px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            cursor: "pointer",
            color: "#fff",
            fontSize: "20px",
          }}
        >
          ▶
        </div>
      </Swiper>
    </div>
  );
};

export default Carousel;