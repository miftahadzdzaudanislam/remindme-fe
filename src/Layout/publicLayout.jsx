import { Outlet } from "react-router-dom";
import MainHeader from "../components/public/Header";
import MainFooter from "../components/public/Footer";

export default function PublicLayout() {
  return (
    <>
      {/* ===== HEADER ===== */}
      <MainHeader />

      <Outlet />

      {/* ===== FOOTER ===== */}
      <MainFooter />
    </>
  );
}
