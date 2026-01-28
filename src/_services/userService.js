import API from "@/_api";

// ===================== ADMIN SERVICES =====================
/**
 * Ambil daftar user admin dengan pagination & search
 */
export const adminGetUser = async ({
  page = 1,
  limit = 10,
  // search = "",
}) => {
  const params = { page, limit };

  const response = await API.get("/admin/users", { params });
  return response.data;
};

/**
 * Create User Mahasiswa
 */
export const adminCreateUser = async (userData) => {
  try {
    const response = await API.post("/admin/users", userData);
    return response.data;
  } catch (error) {
    console.log("Error create user:", error);
    throw error;
  }
};

/**
 * Delete User berdasarkan ID
 */
export const adminDeleteUser = async (userId) => {
  try {
    const response = await API.delete(`/admin/users/${userId}`);
    return response.data;
  } catch (error) {
    console.log("Error delete user:", error);
    throw error;
  }
};

/**
 * Admin Ubah status user
 */
export const adminChangeUserStatus = async (userId, { status }) => {
  try {
    const response = await API.post(`/admin/users/${userId}/status`, {
      status,
    });
    return response.data;
  } catch (error) {
    console.log("Error changing status user:", error);
    throw error;
  }
};

/**
 * Mengambil data analytics untuk admin dashboard.
 */
export const adminGetDashboard = async (params = {}) => {
  const response = await API.get("/admin/dashboard", params);
  return response.data.data || response.data;
};

// ===================== MAHASISWA SERVICES =====================
/**
 * Mengambil data analytics untuk mahasiswa dashboard.
 */
export const MahasiswaGetDashboard = async (params = {}) => {
  const response = await API.get("/mahasiswa/dashboard", params);
  return response.data.data || response.data;
};