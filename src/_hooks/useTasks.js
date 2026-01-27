import { useUserRole } from "@/_hooks/useAuth";
import * as taskService from "@/_services/taskService";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

/**
 * Ambil daftar task admin dengan pagination & search
 */
export const useAdminTask = ({
  page = 1,
  limit = 10,
  // search = "",
}) => {
  const currentRole = useUserRole();
  const enabled = currentRole === "admin";

  const query = useQuery({
    queryKey: ["admin-tasks", { page, limit }],
    queryFn: async () => {
      const res = await taskService.adminGetTask({
        page,
        limit,
      });
      return res;
    },
    enabled,
    keepPreviousData: true,
    staleTime: 30000,
    retry: 1,
    select: (res) => ({
      tasks: res?.data ?? [],
      pagination: res?.pagination || {},
      success: res?.success,
      message: res?.message,
    }),
  });

  return {
    ...query,
    tasks: query.data?.tasks ?? [],
    pagination: query.data?.pagination ?? {},
    isLoading: query.isLoading,
    error: query.error,
    isFetching: query.isFetching,
  };
};

/**
 * Create Task Mutation
 */
export const useAdminCreateTask = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (taskData) => {
      const res = await taskService.adminCreateTask(taskData);
      return res;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["admin-tasks"] });
      navigate("/admin/tasks");
      window.location.reload();
      console.log("✅ Tugas berhasil dibuat:", data.message);
    },
    onError: (error) => {
      console.error("❌ Error create task:", error.message || error);
    },
  });
};

/**
 * Detail Task berdasarkan ID
 */
export const useAdminTaskDetail = (id) => {
  const query = useQuery({
    queryKey: ["admin-task-detail", id],
    queryFn: async () => {
      const res = await taskService.adminGetTaskDetail(id);
      return res.data;
    },
    enabled: !!id,
    staleTime: 10 * 60 * 1000,
    retry: 2,
  });

  return {
    ...query,
    task: query.data ?? null,
    isLoading: query.isLoading,
    error: query.error,
    isFetching: query.isFetching,
  };
};

/**
 * Update Task Mutation
 */
export const useAdminUpdateTask = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, taskData }) => {
      const res = await taskService.adminUpdateTask(id, taskData);
      return res;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["admin-tasks"] });
      navigate("/admin/tasks");
      window.location.reload();
      console.log("✅ Tugas berhasil diubah:", data.message);
    },
    onError: (error) => {
      console.error("❌ Error updating task:", error.message || error);
    },
  });
};

/**
 * Delete Task Mutation
 */
export const useAdminDeleteTask = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id) => {
      const res = await taskService.adminDeleteTask(id);
      return res;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["admin-tasks"] });
      console.log("✅ Tugas berhasil dihapus:", data.message);
    },
    onError: (error) => {
      console.error("❌ Error deleting task:", error.message);
    },
  });
};