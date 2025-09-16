import { Routes, Route } from "react-router-dom";
import UserRoutes from "./UserRoutes";
import AdminRoutes from "./AdminRoutes";

const MainRouter = () => {
  return (
    <Routes>
      {/* 관리자 라우트 - /admin으로 시작하는 모든 경로 */}
      <Route path="/admin/*" element={<AdminRoutes />} />

      {/* 일반 사용자 라우트 - 나머지 모든 경로 */}
      <Route path="/*" element={<UserRoutes />} />
    </Routes>
  );
};

export default MainRouter;
