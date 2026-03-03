import { Navigate, Outlet } from "react-router-dom";
import { useAuth, useCurrentUser } from "@/_hooks/useAuth";
import { Loader2 } from "lucide-react";

export default function GuestRoute() {
  const { isAuthenticated, loading } = useAuth();
  const { data: user, isLoading: userLoading } = useCurrentUser();

  if (loading || userLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="animate-spin h-6 w-6 text-primary" />
      </div>
    );
  }

  if (isAuthenticated) {
    const redirectPath = user?.role === "admin" ? "/admin" : "/mahasiswa";
    return <Navigate to={redirectPath} replace />;
  }
  return <Outlet />;
}
