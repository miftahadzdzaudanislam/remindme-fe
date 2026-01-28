import API from "@/_api";

// ===================== ADMIN SERVICE =====================
/**
 * Ambil daftar course admin dengan pagination & search
 */
export const adminGetCourse = async ({
  page = 1,
  limit = 10,
}) => {
  const params = { page, limit };

  const response = await API.get("/admin/courses", { params });
  return response.data;
};

/**
 * Admin Create Course
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
 * Admin Detail Course berdasarkan ID
 */
export const adminGetCourseDetail = async (id) => {
  const response = await API.get(`/admin/courses/${id}`);
  return response.data;
};

/**
 * Admin Update Course berdasarkan ID
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
 * Admin Delete Course berdasarkan ID
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

// ===================== MAHASISWA HOOKS =====================
/**
 * Ambil daftar course mahasiswa dengan pagination & search
 */
export const mahasiswaGetCourse = async ({
  page = 1,
  limit = 10,
}) => {
  const params = { page, limit };

  const response = await API.get("/mahasiswa/courses", { params });
  return response.data;
};

/**
 * Mahasiswa Create Course
 */
export const mahasiswaCreateCourse = async (courseData) => {
  try {
    const response = await API.post("/mahasiswa/courses", courseData);
    return response.data;
  } catch (error) {
    console.log("Error create course:", error);
    throw error;
  }
};

/**
 * Mahasiswa Detail Course berdasarkan ID
 */
export const mahasiswaGetCourseDetail = async (id) => {
  const response = await API.get(`/mahasiswa/courses/${id}`);
  return response.data;
};

/**
 * Mahasiswa Update Course berdasarkan ID
 */
export const mahasiswaUpdateCourse = async (id, courseData) => {
  try {
    const response = await API.post(`/mahasiswa/courses/${id}`, courseData);
    return response.data;
  } catch (error) {
    console.log("Error updating course:", error);
    throw error;
  }
};

/**
 * Mahasiswa Delete Course berdasarkan ID
 */
export const mahasiswaDeleteCourse = async (id) => {
  try {
    const response = await API.delete(`/mahasiswa/courses/${id}`);
    return response.data;
  } catch (error) {
    console.log("Error delete course:", error);
    throw error;
  }
};