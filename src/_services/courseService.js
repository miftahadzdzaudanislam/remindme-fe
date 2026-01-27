import API from "@/_api";

// ADMIN SERVICE
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

/**
 * Create Course
 */
export const adminCreateCourse = async (courseData) => {
  try {
    const response = await API.post("/admin/courses", courseData);
    return response.data;
  } catch (error) {
    console.log("Error create course:", error);
    throw error;
  }
};

/**
 * Detail Course berdasarkan ID
 */
export const adminGetCourseDetail = async (id) => {
  const response = await API.get(`/admin/courses/${id}`);
  return response.data;
};

/**
 * Update Course berdasarkan ID
 */
export const adminUpdateCourse = async (id, courseData) => {
  try {
    const response = await API.post(`/admin/courses/${id}`, courseData);
    return response.data;
  } catch (error) {
    console.log("Error updating course:", error);
    throw error;
  }
};

/**
 * Delete Course berdasarkan ID
 */
export const adminDeleteCourse = async (id) => {
  try {
    const response = await API.delete(`/admin/courses/${id}`);
    return response.data;
  } catch (error) {
    console.log("Error delete course:", error);
    throw error;
  }
};
