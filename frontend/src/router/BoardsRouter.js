import { Suspense, lazy } from "react";
import { Navigate } from "react-router-dom";
import LoadingComponent from "../components/common/LoadingComponent";

const GeneralList = lazy(() => import("../pages/boards/general/GeneralList"));
const GeneralDetail = lazy(() =>
  import("../pages/boards/general/GeneralDetail")
);
const QnaList = lazy(() => import("../pages/boards/qna/QnaList"));
const QnaDetail = lazy(() => import("../pages/boards/qna/QnaDetail"));
const ReviewList = lazy(() => import("../pages/boards/review/ReviewList"));
const ReviewDetail = lazy(() => import("../pages/boards/review/ReviewDetail"));
const NoticeList = lazy(() => import("../pages/boards/notice/NoticeList"));
const NoticeDetail = lazy(() => import("../pages/boards/notice/NoticeDetail"));
const AdList = lazy(() => import("../pages/boards/ad/AdList"));
const AdDetail = lazy(() => import("../pages/boards/ad/AdDetail"));

const WritePage = lazy(() => import("../pages/board/write/WritePage"));
const ReadPage = lazy(() => import("../pages/board/ReadPage"));
const ModifyPage = lazy(() => import("../pages/board/ModifyPage"));

const BoardsRouter = () => [
  { index: true, element: <Navigate replace to="general" /> },

  {
    path: "general",
    element: (
      <Suspense fallback={<LoadingComponent />}>
        <GeneralList />
      </Suspense>
    ),
  },
  {
    path: "general/:id",
    element: (
      <Suspense fallback={<LoadingComponent />}>
        <GeneralDetail />
      </Suspense>
    ),
  },
  {
    path: "general/:id/modify",
    element: (
      <Suspense fallback={<LoadingComponent />}>
        <ModifyPage />
      </Suspense>
    ),
  },

  {
    path: "qna",
    element: (
      <Suspense fallback={<LoadingComponent />}>
        <QnaList />
      </Suspense>
    ),
  },
  {
    path: "qna/:id",
    element: (
      <Suspense fallback={<LoadingComponent />}>
        <QnaDetail />
      </Suspense>
    ),
  },
  {
    path: "qna/:id/modify",
    element: (
      <Suspense fallback={<LoadingComponent />}>
        <ModifyPage />
      </Suspense>
    ),
  },
  {
    path: "notice",
    element: (
      <Suspense fallback={<LoadingComponent />}>
        <NoticeList />
      </Suspense>
    ),
  },
  {
    path: "notice/:id",
    element: (
      <Suspense fallback={<LoadingComponent />}>
        <NoticeDetail />
      </Suspense>
    ),
  },
  {
    path: "notice/:id/modify",
    element: (
      <Suspense fallback={<LoadingComponent />}>
        <ModifyPage />
      </Suspense>
    ),
  },

  {
    path: "ad",
    element: (
      <Suspense fallback={<LoadingComponent />}>
        <AdList />
      </Suspense>
    ),
  },
  {
    path: "ad/:id",
    element: (
      <Suspense fallback={<LoadingComponent />}>
        <AdDetail />
      </Suspense>
    ),
  },
  {
    path: "ad/:id/modify",
    element: (
      <Suspense fallback={<LoadingComponent />}>
        <ModifyPage />
      </Suspense>
    ),
  },

  {
    path: "write",
    element: (
      <Suspense fallback={<LoadingComponent />}>
        <WritePage />
      </Suspense>
    ),
  },
  {
    path: "read/:id",
    element: (
      <Suspense fallback={<LoadingComponent />}>
        <ReadPage />
      </Suspense>
    ),
  },
];

export default BoardsRouter;
