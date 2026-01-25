import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import * as authService from "@/_services/authService";

/**
 * Login Mutation
 */
export const useLogin = () => {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: async (credentials) => {
      return await authService.login(credentials);
    },
    onSuccess: (data) => {
      // Simpan token dan user data
      localStorage.setItem("authToken", data.token);
      if (data.user) {
        localStorage.setItem("userData", JSON.stringify(data.user));
      }

      // Redirect berdasarkan role
      const userRole = data.user?.role || data.role;

      if (userRole === "admin") {
        navigate("/admin");
      } else if (userRole === "mahasiswa") {
        navigate("/mahasiswa");
      } else {
        navigate("/");
      }
    },
    onError: (error) => {
      // Error akan ditampilkan di component via mutation state
      console.error("Login error:", {
        success: error.response?.data?.success || error.success,
        message: error.response?.data?.message || error.message,
      });
    },
  });
};

/**
 * Register Mutation
 */
export const useRegister = () => {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: async (userData) => {
      return await authService.register(userData);
    },
    onSuccess: (data) => {
      // Simpan token dan user data
      localStorage.setItem("authToken", data.token);
      if (data.user) {
        localStorage.setItem("userData", JSON.stringify(data.user));
      }

      navigate("/login");
    },
    onError: (error) => {
      // Error akan ditampilkan di component via mutation state
      console.error("Registration error:", {
        success: error.response?.data?.success || error.success,
        message: error.response?.data?.message || error.message,
      });
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
      const token = localStorage.getItem("authToken");
      return await authService.logout({ token });
    },
    onSuccess: () => {
      // Hapus token dan user data
      localStorage.removeItem("authToken");
      localStorage.removeItem("userData");

      navigate("/login");
    },
    onError: (error) => {
      // Error akan ditampilkan di component via mutation state
      console.error("Logout error:", {
        success: error.response?.data?.success || error.success,
        message: error.response?.data?.message || error.message,
      });
    },
  });
};

// Cek Auth
export const isAuthenticated = () => {
  const token = localStorage.getItem("authToken");
  return !!token;
};

// Get Token
export const getToken = () => {
  return localStorage.getItem("authToken");
};

// Get User data
export const getUserData = () => {
  const userData = localStorage.getItem("userData");
  return userData ? JSON.parse(userData) : null;
};

// Get user role
export const useUserRole = () => {
  const userData = getUserData();
  return userData?.role || null;
};
