import { Suspense, lazy } from "react";
import { Navigate } from "react-router-dom";

const Loading = <div>Loading...</div>;

const GeneralList   = lazy(() => import("../pages/boards/general/GeneralList"));
const GeneralDetail = lazy(() => import("../pages/boards/general/GeneralDetail"));
const QnaList       = lazy(() => import("../pages/boards/qna/QnaList"));
const QnaDetail     = lazy(() => import("../pages/boards/qna/QnaDetail"));
const ReviewList    = lazy(() => import("../pages/boards/review/ReviewList"));
const ReviewDetail  = lazy(() => import("../pages/boards/review/ReviewDetail"));
const NoticeList    = lazy(() => import("../pages/boards/notice/NoticeList"));
const NoticeDetail  = lazy(() => import("../pages/boards/notice/NoticeDetail"));
const AdList        = lazy(() => import("../pages/boards/ad/AdList"));
const AdDetail      = lazy(() => import("../pages/boards/ad/AdDetail"))

const WritePage = lazy(() => import("../pages/board/write/WritePage"));
const ReadPage  = lazy(() => import("../pages/board/ReadPage"));

const BoardsRouter = () => [
  { index: true, element: <Navigate replace to="general" /> },

  { path: "general",     element: <Suspense fallback={Loading}><GeneralList /></Suspense> },
  { path: "general/:id", element: <Suspense fallback={Loading}><GeneralDetail /></Suspense> },

  { path: "qna",         element: <Suspense fallback={Loading}><QnaList /></Suspense> },
  { path: "qna/:id",     element: <Suspense fallback={Loading}><QnaDetail /></Suspense> },

  { path: "review",      element: <Suspense fallback={Loading}><ReviewList /></Suspense> },
  { path: "review/:id",  element: <Suspense fallback={Loading}><ReviewDetail /></Suspense> },

  { path: "notice",      element: <Suspense fallback={Loading}><NoticeList /></Suspense> },
  { path: "notice/:id",  element: <Suspense fallback={Loading}><NoticeDetail /></Suspense> },

  { path: "ad",          element: <Suspense fallback={Loading}><AdList /></Suspense> },
  { path: "ad/:id",      element: <Suspense fallback={Loading}><AdDetail /></Suspense> },

  { path: "write",       element: <Suspense fallback={Loading}><WritePage /></Suspense> },
  { path: "read/:id",    element: <Suspense fallback={Loading}><ReadPage /></Suspense> },
];

export default BoardsRouter;
