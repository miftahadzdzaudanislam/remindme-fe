import API from "@/_api";

// ADMIN SERVICE
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
 * Create Task
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
 * Detail Task berdasarkan ID
 */
export const adminGetTaskDetail = async (id) => {
  const response = await API.get(`/admin/tasks/${id}`);
  return response.data;
};

/**
 * Update Task berdasarkan ID
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
 * Delete Task berdasarkan ID
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