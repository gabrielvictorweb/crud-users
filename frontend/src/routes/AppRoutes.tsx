import { BrowserRouter, Route, Routes } from "react-router-dom";
import { SignIn } from "@/pages";
import DashboardRoutes from "./DashboardRoutes";

const AppRoutes = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<SignIn />} />
      <Route path="/area-do-usuario/*" element={<DashboardRoutes />} />
    </Routes>
  </BrowserRouter>
);

export default AppRoutes;
