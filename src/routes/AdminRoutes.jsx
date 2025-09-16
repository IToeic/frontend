import { Routes, Route } from "react-router-dom";
import AdminPage from "../pages/Admin/AdminPage";

const AdminRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<AdminPage />} />
    </Routes>
  );
};

export default AdminRoutes;
