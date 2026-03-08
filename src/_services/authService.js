import { getUserProfile } from "@/_services/userService";
import { supabase } from "@/utils/supabaseClient";

export const SUSPENDED_ERROR_MESSAGE =
  "Akun anda telah di nonaktifkan, coba untuk menghubungi admin.";

// ===================== AUTHENTICATION =====================
/**
 * User Login with email
 */
export const loginWithEmail = async ({ email, password }) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) throw new Error(error.message || "Login gagal");

  const userId = data?.user?.id;
  if (!userId) throw new Error("User tidak ditemukan");

  const profile = await getUserProfile(userId);

  if (profile?.status === "suspended") {
    sessionStorage.setItem("auth_error", SUSPENDED_ERROR_MESSAGE);
    supabase.auth.signOut();
    throw new Error(SUSPENDED_ERROR_MESSAGE);
  }

  return { user: data.user, session: data.session, profile };
};

/**
 * Register User with email
 */
export const registerWithEmail = async ({
  name,
  email,
  password,
  nim,
  jurusan,
  telepon,
}) => {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: { name, nim, jurusan, telepon },
    },
  });

  if (error) throw new Error(error.message || "SignUp Failed");

  const user = data.user;

  if (user) {
    await supabase.from("users").insert({
      id: user.id,
      name,
      email,
      nim,
      jurusan,
      telepon,
      status: "active",
    });
  }

  return user;
};

/**
 * Logout User
 */
export const logout = async () => {
  const { data } = await supabase.auth.getUser();

  if (data?.user) {
    await setUserStatus(data.user.id, "inactive");
  }

  const { error } = await supabase.auth.signOut();

  if (error) throw new Error(error.message || "Logout Failed");
};

/**
 * Login With Google
 */
export const signInWithGoogle = async () => {
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "google",
    options: {
      redirectTo: `${window.location.origin}/login`,
    },
  });

  if (error) throw new Error(error.message || "Login Google Failed");

  return data;
};

/**
 * Set User Status
 */
export const setUserStatus = async (userId, status) => {
  if (!userId) return;

  let query = supabase.from("users").update({ status }).eq("id", userId);
  if (status === "active") query = query.neq("status", "suspended");

  const { error } = await query;
  if (error) throw new Error(error.message || "Failed to update user status");
};
