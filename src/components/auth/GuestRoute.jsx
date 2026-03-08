import { Navigate, Outlet } from "react-router-dom";
import { useAuth, useUserRole } from "@/_hooks/useAuth";
import { Loader2 } from "lucide-react";

export default function GuestRoute() {
  const { isAuthenticated, loading } = useAuth();
  const { role, roleLoading } = useUserRole();

  if (loading || roleLoading) {
    return (
      <div className="p-4">
        <Loader2 size={60} className="animate-spin text-primary" />
      </div>
    );
  }

  if (isAuthenticated) {
    if (role === "admin") return <Navigate to="/admin" replace />;
    if (role === "mahasiswa") return <Navigate to="/mahasiswa" replace />;
    return (
      <div className="p-4">
        <Loader2 size={60} className="animate-spin text-primary" />
      </div>
    );
  }

  return <Outlet />;
}
