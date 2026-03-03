import * as dashboardService from "@/_services/dashboardService";
import { useQuery } from "@tanstack/react-query";

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
  return useQuery({
    queryKey: ["dashboard", "admin"],
    queryFn: dashboardService.getAdminDashboard,
    staleTime: 30000,
    retry: 1,
  });
};

/**
 * Ambil Mahasiswa Dashboard
 */
export const useMahasiswaDashboard = () => {
  return useQuery({
    queryKey: ["dashboard", "mahasiswa"],
    queryFn: dashboardService.getMahasiswaDashboard,
    staleTime: 30000,
    retry: 1,
  });
};
