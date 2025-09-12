import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

//햄버거 버튼 스타일링
const DivIcon = styled.div`
    width: 140px;
    margin-right: 20px;
    /* 클릭할 영역 */
    & label {
        display: block;
        width: 35px;
        height: 23px;
        position: relative;
        cursor: pointer;
    }

    & span {
        z-index: 900;
        display: block;
        position: absolute;
        width: 100%;
        height: 5px;
        border-radius: 25px;
        background-color: #000000;
        transition: all 0.35s; /* 부드러운 애니메이션 */
    }

    /* span 첫번째 */
    & span:nth-child(1) {
        top: 0;
    }
    /* span 두번째 */
    & span:nth-child(2) {
        top: 50%;
        transform: translateY(-50%);
    }
    /* span 세번째 */
    & span:nth-child(3) {
        bottom: 0;
    }

    /* 햄버거 → X */
    &.open span:nth-child(1) {
        top: 50%;
        transform: translateY(-50%) rotate(45deg);
    }
    &.open span:nth-child(2) {
        opacity: 0;
    }
    &.open span:nth-child(3) {
        bottom: 50%;
        transform: translateY(50%) rotate(-45deg);
    }
`;

const DivSidebar = styled.div`
    width: 270px;
    height: 100vh;
    background-color: #B2D4FD; /* 파란색 배경 */
    position: fixed; /* 화면 오른쪽 고정*/
    top: 0;
    right: ${(props) => (props.open ? "0" : "-270px")}; /* 열렸을 때는 0, 닫혔을 때는 화면 밖으로 이동 */
    z-index: 100;
    transition: right 0.35s; /* 열렸을 때는 0, 닫혔을 때는 화면 밖으로 이동 */

    & ul {
        padding: 20px;
        list-style: none;
    }

    & li {
        margin: 20px 0;
        font-size: 18px;
        cursor: pointer; /* 클릭 가능 */
    }
`;

const NavBar = () => {

    // 메뉴 클릭시 페이지 이동 후 사이드바 닫기
    const navigate = useNavigate(); 

    const [open, setOpen] = useState(false); //사이드바 열림 여부 상태

    return (
        <>
            {/* 햄버거 버튼 토글 -> 열기/닫기 */}
            <DivIcon className={open ? "open" : ""}>
                <label onClick={() => setOpen(!open)}>  {/* 햄버거 클릭 시 상태 반전 */}
                    <span></span>
                    <span></span>
                    <span></span>
                </label>
            </DivIcon>

            {/* open 상태에 따라 오른쪽에서 슬라이드로 나타남 */}
            <DivSidebar open={open}>
                <ul>
                    {/* 메뉴 클릭시 페이지 이동 */}
                    <li onClick={() => { navigate('/top'); setOpen(false); }}>로그인 / 회원가입</li>
                    <li onClick={() => { navigate('/bottom'); setOpen(false); }}>마이페이지</li>
                    <li onClick={() => { navigate('/acc'); setOpen(false); }}>게시판</li>
                    <li onClick={() => { navigate('/hit'); setOpen(false); }}>팝업 지도</li>
                </ul>
            </DivSidebar>
        </>
    );
};

export default NavBar;
