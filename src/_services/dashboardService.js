import { supabase } from "@/utils/supabaseClient";

/**
 * Public Dashboard
 */
export const getPublicDashboard = async () => {
  const { data, error } = await supabase.rpc("get_public_dashboard");
  if (error) throw new Error(error.message || "Get public dashboard failed");
  return data;
};

/**
 * Admin Dashboard
 */
export const getAdminDashboard = async () => {
  const { data, error } = await supabase.rpc("get_admin_dashboard");
  if (error) throw new Error(error.message || "Get admin dashboard failed");
  return data;
};

/**
 * Mahasiswa Dashboard
 */
export const getMahasiswaDashboard = async () => {
  const { data, error } = await supabase.rpc("get_mahasiswa_dashboard");
  if (error) throw new Error(error.message || "Get mahasiswa dashboard failed");
  return data;
};