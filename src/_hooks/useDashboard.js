import * as dashboardService from "@/_services/dashboardService";
import { useQuery } from "@tanstack/react-query";
import { useAuth } from "@/_hooks/useAuth";

/**
 * Ambil Public Dashboard
 */
export const usePublicDashboard = () => {
  return useQuery({
    queryKey: ["dashboard", "public"],
    queryFn: dashboardService.getPublicDashboard,
    staleTime: 30000,
    retry: 1,
  });
};

/**
 * Ambil Admin Dashboard
 */
export const useAdminDashboard = () => {
  const { user } = useAuth();
  const userId = user?.id;

  return useQuery({
    queryKey: ["dashboard", "admin", userId],
    queryFn: dashboardService.getAdminDashboard,
    enabled: !!userId,
    staleTime: 30000,
    retry: 1,
  });
};

/**
 * Ambil Mahasiswa Dashboard
 */
export const useMahasiswaDashboard = () => {
  const { user } = useAuth();
  const userId = user?.id;

  return useQuery({
    queryKey: ["dashboard", "mahasiswa", userId],
    queryFn: () => dashboardService.getMahasiswaDashboard(),
    enabled: !!userId,
    staleTime: 30000,
    retry: 1,
  });
};
