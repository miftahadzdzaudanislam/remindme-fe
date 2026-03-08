import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import * as authService from "@/_services/authService";
import { useEffect, useState } from "react";
import { supabase } from "@/utils/supabaseClient";
import { getUserProfile } from "@/_services/userService";

// ===================== AUTHENTICATION =====================
/**
 * Auth Global
 */
export const useAuth = () => {
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);

  const enforceSuspend = async (nextSession) => {
    const userId = nextSession?.user?.id;
    if (!userId) return nextSession ?? null;

    const profile = await getUserProfile(userId);
    if (profile?.status === "suspended") {
      sessionStorage.setItem("auth_error", authService.SUSPENDED_ERROR_MESSAGE);
      await supabase.auth.signOut();
      return null;
    }

    return nextSession;
  };

  useEffect(() => {
    let mounted = true;

    (async () => {
      try {
        const { data, error } = await supabase.auth.getSession();
        if (error) throw error;

        const safeSession = await enforceSuspend(data?.session ?? null);
        if (mounted) setSession(safeSession);

        if (safeSession?.user?.id) {
          authService
            .setUserStatus(safeSession.user.id, "active")
            .catch(() => {});
        }
      } catch {
        if (mounted) setSession(null);
      } finally {
        if (mounted) setLoading(false);
      }
    })();

    const { data: listener } = supabase.auth.onAuthStateChange(
      (event, nextSession) => {
        (async () => {
          if (event === "SIGNED_IN" || event === "TOKEN_REFRESHED") {
            const safeSession = await enforceSuspend(nextSession);
            setSession(safeSession);

            if (safeSession?.user?.id) {
              authService
                .setUserStatus(safeSession.user.id, "active")
                .catch(() => {});
            }

            setLoading(false);
            return;
          }

          setSession(nextSession ?? null);
          setLoading(false);
        })();
      },
    );

    return () => {
      mounted = false;
      listener.subscription.unsubscribe();
    };
  }, []);

  return {
    session,
    user: session?.user ?? null,
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
    onSuccess: ({ profile }) => {
      const role = profile?.role;
      navigate(role === "admin" ? "/admin" : "/mahasiswa");
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
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: authService.logout,
    onSuccess: async () => {
      queryClient.clear();
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
  return useQuery({
    queryKey: ["currentUser"],
    retry: false,
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    refetchOnMount: false,
    queryFn: async () => {
      const { data: authData, error: authError } =
        await supabase.auth.getUser();
      if (authError) throw authError;

      const userId = authData?.user?.id;
      if (!userId) return null;

      const { data, error } = await supabase
        .from("users")
        .select("*")
        .eq("id", userId)
        .maybeSingle();

      if (error) throw error;
      return data;
    },
  });
};

export const useUserRole = () => {
  const { data: user, isLoading, isFetching } = useCurrentUser();

  return {
    role: user?.role ?? null,
    roleLoading: isLoading || isFetching,
  };
};
