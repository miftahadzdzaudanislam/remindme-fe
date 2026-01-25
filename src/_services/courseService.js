// ADMIN SERVICE

import API from "@/_api";

/**
 * Ambil daftar course admin dengan pagination & search
 */
export const adminGetCourse = async ({
  page = 1,
  limit = 10,
  //   search = "",
}) => {
  const params = { page, limit };

  const response = await API.get("/admin/courses", { params });
  return response.data;
};
