// src/router/BoardsRouter.js
import { Suspense, lazy } from "react";
import { Navigate } from "react-router-dom";
import LoadingComponent from "../components/common/LoadingComponent"; 

// ✅ 1단계: 홍보글 작성
import AdBoardComponent from "../components/popup/reservation/AdBoradComponent";
// ✅ 2단계: 예약 시간 등록
import ReservationTimeComponent from "../components/popup/reservation/ReservationTimeComponent";

const AllBoardList  = lazy(() => import("../pages/boards/AllBoardList")); 

// 📝 게시판 타입별
const GeneralList   = lazy(() => import("../pages/boards/general/GeneralList"));
const GeneralDetail = lazy(() => import("../pages/boards/general/GeneralDetail"));
const QnaList       = lazy(() => import("../pages/boards/qna/QnaList"));
const QnaDetail     = lazy(() => import("../pages/boards/qna/QnaDetail"));
const NoticeList    = lazy(() => import("../pages/boards/notice/NoticeList"));
const NoticeDetail  = lazy(() => import("../pages/boards/notice/NoticeDetail"));

// 📝 홍보게시판
const AdList        = lazy(() => import("../pages/boards/ad/AdList"));
const AdDetail      = lazy(() => import("../pages/boards/ad/AdDetail")); 
const AdModifyForm  = lazy(() => import("../components/common/board/AdModifyForm")); 

// 📝 공용 페이지
const WritePage     = lazy(() => import("../pages/board/write/WritePage"));
const ReadPage      = lazy(() => import("../pages/board/ReadPage"));
const ModifyPage    = lazy(() => import("../pages/board/ModifyPage"));

const BoardsRouter = () => [
  // ✅ 기본 진입 → 전체 글
  { index: true, element: <Navigate replace to="all" /> },

  // 전체 글
  { path: "all", element: <Suspense fallback={<LoadingComponent />}><AllBoardList /></Suspense> },

  // 일반 게시판
  { path: "general",     element: <Suspense fallback={<LoadingComponent />}><GeneralList /></Suspense> },
  { path: "general/:id", element: <Suspense fallback={<LoadingComponent />}><GeneralDetail /></Suspense> },
  { path: "general/:id/modify", element: <Suspense fallback={<LoadingComponent />}><ModifyPage/></Suspense> },

  // 질문 게시판
  { path: "qna",         element: <Suspense fallback={<LoadingComponent />}><QnaList /></Suspense> },
  { path: "qna/:id",     element: <Suspense fallback={<LoadingComponent />}><QnaDetail /></Suspense> },
  { path: "qna/:id/modify", element: <Suspense fallback={<LoadingComponent />}><ModifyPage/></Suspense> },

  // 리뷰 게시판 (현재 주석 처리됨)
  // { path: "review",      element: <Suspense fallback={<LoadingComponent />}><ReviewList /></Suspense> },
  // { path: "review/:id",  element: <Suspense fallback={<LoadingComponent />}><ReviewDetail /></Suspense> },
  // { path: "review/:id/modify", element: <Suspense fallback={<LoadingComponent />}><ModifyPage /></Suspense> },

  // 공지 게시판
  { path: "notice",      element: <Suspense fallback={<LoadingComponent />}><NoticeList /></Suspense> },
  { path: "notice/:id",  element: <Suspense fallback={<LoadingComponent />}><NoticeDetail /></Suspense> },
  { path: "notice/:id/modify", element: <Suspense fallback={<LoadingComponent />}><ModifyPage /></Suspense> },

  // ✅ 홍보게시판
  { path: "ad",                element: <Suspense fallback={<LoadingComponent />}><AdList /></Suspense> },
  // Step1: 홍보글 작성
  { path: "ad/write",          element: <Suspense fallback={<LoadingComponent />}><AdBoardComponent /></Suspense> }, 
  // Step2: 예약 시간 등록 (popupStoreId 필요)
  { path: "ad/:id/reservation",element: <Suspense fallback={<LoadingComponent />}><ReservationTimeComponent /></Suspense> },
  // 상세 & 수정
  { path: "ad/:id",            element: <Suspense fallback={<LoadingComponent />}><AdDetail /></Suspense> },
  { path: "ad/:id/modify",     element: <Suspense fallback={<LoadingComponent />}><AdModifyForm /></Suspense> },

  // 공용 CRUD 페이지
  { path: "write",       element: <Suspense fallback={<LoadingComponent />}><WritePage /></Suspense> },
  { path: "read/:id",    element: <Suspense fallback={<LoadingComponent />}><ReadPage /></Suspense> },
];

export default BoardsRouter;
