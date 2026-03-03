import { useAuth, useCurrentUser } from "@/_hooks/useAuth";
import { Loader2 } from "lucide-react";
import { Navigate, Outlet } from "react-router-dom";

export default function RoleRoute({ allowedRoles = [] }) {
  const { isAuthenticated, loading } = useAuth();
  const { data: user, isLoading: userLoading } = useCurrentUser();

  if (loading || userLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="animate-spin h-6 w-6 text-primary" />
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  const userRole = user?.role;

  if (!allowedRoles.includes(userRole)) {
    const redirectPath = userRole === "admin" ? "/admin" : "/mahasiswa";
    return <Navigate to={redirectPath} replace />;
  }

  return <Outlet />;
}
