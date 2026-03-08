import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import * as userService from "@/_services/userService";
import { useUserRole } from "@/_hooks/useAuth";

// ===================== ADMIN HOOKS =====================
/**
 * Ambil daftar user admin dengan pagination
 */
export const useAdminUser = ({ page, limit }) => {
  const currentRole = useUserRole();
  const enabled = currentRole.role === "admin";

  const query = useQuery({
    queryKey: ["admin-users", page, limit],
    queryFn: async () => {
      const res = await userService.adminGetUser({ page, limit });
      return res;
    },
    placeholderData: (prev) => prev,
    enabled,
    keepPreviousData: true,
    staleTime: 30000,
    retry: 1,
    select: (res) => ({
      users: res?.data ?? [],
      pagination: {
        total: res?.total ?? 0,
        page: res?.page ?? 1,
        limit: res?.limit ?? 10,
      },
    }),
  });

  return {
    ...query,
    users: query.data?.users ?? [],
    pagination: query.data?.pagination ?? { total: 0, page: 1, limit: 10 },
    isLoading: query.isLoading,
    error: query.error,
    isFetching: query.isFetching,
  };
};

/**
 * Ubah status user Mutation
 */
export const useAdminChangeStatusUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ userId, status }) => {
      const res = await userService.adminChangeUserStatus(userId, status);
      return res;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-users"] });
      console.log("✅ Status berhasil diubah:");
    },
    onError: (error) => {
      console.error("❌ Error changing status:", error.message);
    },
  });
};
