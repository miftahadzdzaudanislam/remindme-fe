import MainFooter from "@/components/public/Footer";
import MainHeader from "@/components/public/Header";
import { Outlet } from "react-router-dom";

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
