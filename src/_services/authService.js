import { supabase } from "@/utils/supabaseClient";

// ===================== AUTHENTICATION =====================
/**
 * User Login with email
 */
export const loginWithEmail = async ({ email, password }) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) throw new Error(error.message || "Login Failed");
  return data;
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
      data: {
        name,
        nim,
        jurusan,
        telepon,
      },
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
    });
  }

  return user;
};

/**
 * Logout User
 */
export const logout = async () => {
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
