import { Outlet } from "react-router-dom";
import MainHeader from "../components/public/Header";
import MainFooter from "../components/public/Footer";
import PageTitle from "../components/ui/pageTitle";

export default function PublicLayout() {
  return (
    <>
      <PageTitle title={"Home"} />

      {/* ===== HEADER ===== */}
      <MainHeader />

      <Outlet />

      {/* ===== FOOTER ===== */}
      <MainFooter />
    </>
  );
}
