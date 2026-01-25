import { useUserRole } from "@/_hooks/useAuth";
import * as courseService from "@/_services/courseService";
import { useQuery } from "@tanstack/react-query";

/**
 * Ambil daftar course admin dengan pagination & search
 */
export const useAdminCourse = ({
  page = 1,
  limit = 10,
  // search = "",
}) => {
  const currentRole = useUserRole();
  const enabled = currentRole === "admin";

  const query = useQuery({
    queryKey: ["admin-courses", { page, limit }],
    queryFn: async () => {
      const res = await courseService.adminGetCourse({
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
      courses: res?.data ?? [],
      pagination: res?.pagination || {},
      success: res?.success,
      message: res?.message,
    }),
  });

  return {
    ...query,
    courses: query.data?.courses ?? [],
    pagination: query.data?.pagination ?? {},
    isLoading: query.isLoading,
    error: query.error,
    isFetching: query.isFetching,
  };
};
