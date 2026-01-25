import { Navigate, Outlet } from "react-router-dom";
import { isAuthenticated, getUserData } from "@/_hooks/useAuth";

export default function RoleRoute({ allowedRoles = [] }) {
  if (!isAuthenticated()) {
    return <Navigate to="/login" replace />;
  }

  const role = getUserData()?.role;
  if (!role || !allowedRoles.includes(role)) {
    return <Navigate to="/unauthorized" replace />;
  }

  return <Outlet />;
}