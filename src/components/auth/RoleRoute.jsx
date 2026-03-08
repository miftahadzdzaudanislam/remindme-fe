import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth, useCurrentUser } from "@/_hooks/useAuth";
import { Loader2 } from "lucide-react";

export default function RoleRoute({ allowedRoles = [] }) {
  const { isAuthenticated, loading } = useAuth();
  const {
    data: profile,
    isLoading: profileLoading,
    error: profileError,
  } = useCurrentUser();
  const location = useLocation();

  // jangan pakai isFetching untuk blocking UI
  if (loading || profileLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 size={60} className="animate-spin text-primary" />
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  if (profileError) {
    console.error("RoleRoute profile error:", profileError);
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  const role = (profile?.role || "").toLowerCase().trim();
  const normalizedAllowed = allowedRoles.map((r) => r.toLowerCase().trim());

  if (!role || !normalizedAllowed.includes(role)) {
    return <Navigate to="/unauthorized" replace />;
  }

  return <Outlet />;
}
