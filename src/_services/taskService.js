import API from "@/_api";

// ===================== ADMIN SERVICE =====================
/**
 * Ambil daftar task admin dengan pagination & search
 */
export const adminGetTask = async ({
  page = 1,
  limit = 10,
  //   search = "",
}) => {
  const params = { page, limit };

  const response = await API.get("/admin/tasks", { params });
  return response.data;
};

/**
 * Admin Create Task
 */
export const adminCreateTask = async (taskData) => {
  try {
    const response = await API.post("/admin/tasks", taskData);
    return response.data;
  } catch (error) {
    console.log("Error create task:", error);
    throw error;
  }
};

/**
 * Admin Detail Task berdasarkan ID
 */
export const adminGetTaskDetail = async (id) => {
  const response = await API.get(`/admin/tasks/${id}`);
  return response.data;
};

/**
 * Admin Update Task berdasarkan ID
 */
export const adminUpdateTask = async (id, taskData) => {
  try {
    const response = await API.post(`/admin/tasks/${id}`, taskData);
    return response.data;
  } catch (error) {
    console.log("Error updating task:", error);
    throw error;
  }
};

/**
 * Admin Delete Task berdasarkan ID
 */
export const adminDeleteTask = async (id) => {
  try {
    const response = await API.delete(`/admin/tasks/${id}`);
    return response.data;
  } catch (error) {
    console.log("Error delete task:", error);
    throw error;
  }
};

// ===================== MAHASISWA SERVICE =====================
/**
 * Ambil daftar task mahasaiswa dengan pagination & search
 */
export const mahasiswaGetTask = async ({
  page = 1,
  limit = 10,
}) => {
  const params = { page, limit };

  const response = await API.get("/mahasiswa/tasks", { params });
  return response.data;
};

/**
 * Mahasiswa Create Task
 */
export const mahasaiswaCreateTask = async (taskData) => {
  try {
    const response = await API.post("/mahasiswa/tasks", taskData);
    return response.data;
  } catch (error) {
    console.log("Error create task:", error);
    throw error;
  }
};

/**
 * Mahasiswa Detail Task berdasarkan ID
 */
export const mahasaiswaGetTaskDetail = async (id) => {
  const response = await API.get(`/mahasiswa/tasks/${id}`);
  return response.data;
};

/**
 * Mahasiswa Update Task berdasarkan ID
 */
export const mahasaiswaUpdateTask = async (id, taskData) => {
  try {
    const response = await API.post(`/mahasiswa/tasks/${id}`, taskData);
    return response.data;
  } catch (error) {
    console.log("Error updating task:", error);
    throw error;
  }
};

/**
 * Mahasiswa Delete Task berdasarkan ID
 */
export const mahasaiswaDeleteTask = async (id) => {
  try {
    const response = await API.delete(`/mahasiswa/tasks/${id}`);
    return response.data;
  } catch (error) {
    console.log("Error delete task:", error);
    throw error;
  }
};

/**
 * Mahasiswa Ubah status Task
 */
export const mahasiswaChangeTaskStatus = async (id, {is_done}) => {
    try {
    const response = await API.patch(`/mahasiswa/tasks/${id}/toggle`, {
      is_done,
    });
    return response.data;
  } catch (error) {
    console.log("Error changing status task:", error);
    throw error;
  }
}