import API from "@/_api";
import { supabase } from "@/utils/supabaseClient";

// ===================== PROFILE SERVICES =====================
/**
 * Get User Profile
 */
export const getUserProfile = async (userId) => {
  const { data, error } = await supabase
    .from("users")
    .select("*")
    .eq("id", userId)
    .maybeSingle();

  if (error) throw new Error(error.message || "Failed to get user profile");
  return data;
};

/**
 * Update User Profile
 */
export const changeProfile = async () => {
  // coming soon
};

// ===================== ADMIN SERVICES =====================
/**
 * Ambil daftar user admin dengan pagination & search
 */
export const adminGetUser = async ({ page = 1, limit = 10 }) => {
  const from = (page - 1) * limit;
  const to = from + limit - 1;

  let query = supabase
    .from("users")
    .select("*", { count: "exact" })
    .order("created_at", { ascending: false })
    .range(from, to);

  const { data, error, count } = await query;
  if (error) throw new Error(error.message);

  return {
    data: data ?? [],
    total: count ?? 0,
    page,
    limit,
  };
};

/**
 * Admin Ubah status user
 */
export const adminChangeUserStatus = async (userId, status) => {
  const { data, error } = await supabase
    .from("users")
    .update({ status })
    .eq("id", userId);

  if (error) throw new Error(error.message);

  return data;
};
