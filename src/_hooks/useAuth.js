import { useMutation, useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import * as authService from "@/_services/authService";
import { useEffect, useState } from "react";
import { supabase } from "@/utils/supabaseClient";

// ===================== AUTHENTICATION =====================
/**
 * Auth Global
 */
export const useAuth = () => {
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Ambil session awal
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session);
      setLoading(false);
    });

    // Listen perubahan auth
    const { data: listener } = supabase.auth.onAuthStateChange((_, session) => {
      setSession(session);
    });

    return () => {
      listener.subscription.unsubscribe();
    };
  }, []);

  return {
    session,
    user: session?.user,
    isAuthenticated: !!session,
    loading,
  };
};

/**
 * Login Mutation
 */
export const useLogin = () => {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: authService.loginWithEmail,
    onSuccess: async (data) => {
      const user = data.user;

      // ambil role dari tabel users
      const { data: profile } = await supabase
        .from("users")
        .select("role")
        .eq("id", user.id)
        .single();

      const role = profile?.role;

      if (role === "admin") {
        navigate("/admin");
      } else {
        navigate("/mahasiswa");
      }
    },
    onError: (error) => {
      console.error("Login error:", error.message);
    },
  });
};

/**
 * Register Mutation
 */
export const useRegister = () => {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: authService.registerWithEmail,
    onSuccess: () => {
      navigate("/mahasiswa");
    },
    onError: (error) => {
      console.error("Register error:", error.message);
    },
  });
};

/**
 * Logout Mutation
 */
export const useLogout = () => {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: async () => {
      const { error } = await supabase.auth.signOut();
      if (error) throw new Error(error.message);
    },
    onSuccess: () => {
      navigate("/login");
    },
  });
};

/**
 * Login With Google
 */
export const useGoogleLogin = () => {
  const login = async () => {
    try {
      await authService.signInWithGoogle();
    } catch (error) {
      console.log("Google login error:", error.message);
    }
  };

  return { login };
};

/**
 * Get Current User Profile (dengan role dari database)
 */
export const useCurrentUser = () => {
  const { user } = useAuth();

  return useQuery({
    queryKey: ["currentUser", user?.id],
    queryFn: async () => {
      if (!user?.id) return null;

      const { data } = await supabase
        .from("users")
        .select("*")
        .eq("id", user.id)
        .single();

      return data;
    },
    enabled: !!user?.id,
    staleTime: 1000 * 60 * 5, // 5 menit
  });
};

export const useUserRole = () => {
  const { data: user } = useCurrentUser();
  return user?.role || null;
};
