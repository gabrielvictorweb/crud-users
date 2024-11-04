import { Home } from "@/pages";
import { DashboardTemplate } from "@/templates/dashboard";
import { Route, Routes } from "react-router-dom";

const DashboardRoutes = () => (
  <DashboardTemplate>
    <Routes>
      <Route path="/inicio" element={<Home />} />
    </Routes>
  </DashboardTemplate>
);

export default DashboardRoutes;
