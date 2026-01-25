import API from "@/_api";

// ADMIN SERVICE
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
 * Delete User
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
 * Ubah status user
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
