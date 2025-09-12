// src/router/root.js
import { createBrowserRouter, Navigate } from "react-router-dom";
import { Suspense, lazy } from "react";
import BoardsRouter from "./BoardsRouter";

const Loading = <div>Loading......</div>;
const BoardsLayout = lazy(() => import("../layout/BoardsLayout")); // ← 여기!

const root = createBrowserRouter([
  {
    path: "boards",
    element: (
      <Suspense fallback={Loading}>
        <BoardsLayout />
      </Suspense>
    ),
    children: BoardsRouter(),
  },
  { path: "*", element: <Navigate to="/boards" replace /> },
]);

export default root;
