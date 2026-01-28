import { Navigate, Outlet } from "react-router-dom";
import { isAuthenticated, getUserData } from "@/_hooks/useAuth";

export default function GuestRoute() {
  if (isAuthenticated()) {
    const user = getUserData()
    const role = user?.role;
    if (role === "admin") return <Navigate to="/admin" replace />;
    if (role === "mahasiswa") return <Navigate to="/mahasiswa" replace />;
    return <Navigate to="/" replace />;
  }
  return <Outlet />;
}