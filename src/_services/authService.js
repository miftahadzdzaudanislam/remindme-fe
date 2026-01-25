import API from "@/_api";

// User Login
export const login = async (credentials) => {
  try {
    const response = await API.post("/login", credentials);

    if (response?.data?.success) {
      return response.data;
    } else {
      throw new Error(response.data.message || "Login Failed");
    }
  } catch (error) {
    if (error.response?.data) {
      throw error.response.data;
    }
    throw error;
  }
};

// Register User
export const register = async (userData) => {
  try {
    const response = await API.post("/register", userData);
    if (response?.data?.success) {
      return response.data;
    } else {
      throw new Error(response.data.message || "Registration Failed");
    }
  } catch (error) {
    if (error.response?.data) {
      throw error.response.data;
    }
    throw error;
  }
};

// Logout User
export const logout = async ({ token }) => {
  try {
    const response = await API.post("/logout", { token });
    return response.data;
  } catch (error) {
    if (error.response?.data) {
      throw error.response.data;
    }
    throw error;
  }
};

// Refresh Token
export const refreshToken = async ({ token }) => {
  const safeToken = token || localStorage.getItem("authToken");
  if (!safeToken) throw new Error("Missing token");
  try {
    const response = await API.post("/refresh-token", { token: safeToken });
    if (response?.data?.success) {
      return response.data;
    } else {
      throw new Error(response.data.message || "Token Refresh Failed");
    }
  } catch (error) {
    if (error.response?.data) {
      throw error.response.data;
    }
    throw error;
  }
};
