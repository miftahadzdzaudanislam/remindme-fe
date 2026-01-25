import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import * as userService from "@/_services/userService";
import { useUserRole } from "@/_hooks/useAuth";

/**
 * Ambil daftar user admin dengan pagination & search
 */
export const useAdminUser = ({
  page = 1,
  limit = 10,
  // search = "",
}) => {
  const currentRole = useUserRole();
  const enabled = currentRole === "admin";

  const query = useQuery({
    queryKey: ["admin-users", { page, limit }],
    queryFn: async () => {
      const res = await userService.adminGetUser({
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
      users: res?.data ?? [],
      pagination: res?.pagination || {},
      success: res?.success,
      message: res?.message,
    }),
  });

  return {
    ...query,
    users: query.data?.users ?? [],
    pagination: query.data?.pagination ?? {},
    isLoading: query.isLoading,
    error: query.error,
    isFetching: query.isFetching,
  };
};

/**
 * Delete user
 */
export const useAdminDeleteUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (userId) => {
      const res = await userService.adminDeleteUser(userId);
      return res;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["admin-users"] });
      console.log("✅ Status berhasil dihapus:", data.message);
    },
    onError: (error) => {
      console.error("❌ Error deleting status:", error.message);
    },
  });
};

/**
 * Ubah status user
 */
export const useAdminChangeStatusUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ userId, status }) => {
      const res = await userService.adminChangeUserStatus(userId, { status });
      return res;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["admin-users"] });
      console.log("✅ Status berhasil diubah:", data.message);
    },
    onError: (error) => {
      console.error("❌ Error changing status:", error.message);
    },
  });
};
