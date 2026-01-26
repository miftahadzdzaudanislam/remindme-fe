import { useUserRole } from "@/_hooks/useAuth";
import * as courseService from "@/_services/courseService";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

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

/**
 * Create Course Mutation
 */
export const useAdminCreateCourse = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (courseData) => {
      const res = await courseService.adminCreateCourse(courseData);
      return res;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["admin-courses"] });
      navigate("/admin/courses");
      console.log("✅ Jadwal berhasil dibuat:", data.message);
    },
    onError: (error) => {
      console.error("❌ Error create course:", error.message || error);
    },
  });
};

/**
 * Detail Course berdasarkan ID
 */
export const useAdminCourseDetail = (id) => {
  const query = useQuery({
    queryKey: ["admin-course-detail", id],
    queryFn: async () => {
      const res = await courseService.adminGetCourseDetail(id);
      return res.data;
    },
    enabled: !!id,
    staleTime: 10 * 60 * 1000,
    retry: 2,
  });

  return {
    ...query,
    course: query.data ?? null,
    isLoading: query.isLoading,
    error: query.error,
    isFetching: query.isFetching,
  };
};

/**
 * Update Course Mutation
 */
export const useAdminUpdateCourse = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, courseData }) => {
      const res = await courseService.adminUpdateCourse(id, courseData);
      return res;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["admin-courses"] });
      navigate("/admin/courses");
      console.log("✅ Jadwal berhasil diubah:", data.message);
    },
    onError: (error) => {
      console.error("❌ Error updating course:", error.message || error);
    },
  });
};

/**
 * Delete course Mutation
 */
export const useAdminDeleteCourse = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id) => {
      const res = await courseService.adminDeleteCourse(id);
      return res;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["admin-courses"] });
      console.log("✅ Course berhasil dihapus:", data.message);
    },
    onError: (error) => {
      console.error("❌ Error deleting course:", error.message);
    },
  });
};
