import { useUserRole } from "@/_hooks/useAuth";
import * as courseService from "@/_services/courseService";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

// ===================== ADMIN HOOKS =====================
/**
 * Ambil daftar Course admin dengan pagination & search
 */
export const useAdminCourse = ({ page = 1, limit = 10 }) => {
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
    staleTime: 0,
    refetchOnMount: true,
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
 * Admin Create Course Mutation
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
      window.location.reload();
      console.log("✅ Jadwal berhasil dibuat:", data.message);
    },
    onError: (error) => {
      console.error("❌ Error create course:", error.message || error);
    },
  });
};

/**
 * Admin Detail Course berdasarkan ID
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
 * Admin Update Course Mutation
 */
export const useAdminUpdateCourse = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, courseData }) => {
      const res = await courseService.adminUpdateCourse(id, courseData);
      return res;
    },
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({ queryKey: ["admin-courses"] });
      queryClient.invalidateQueries({
        queryKey: ["admin-course-detail", variables.id],
      });
      navigate("/admin/courses");
      console.log("✅ Jadwal berhasil diubah:", data.message);
    },
    onError: (error) => {
      console.error("❌ Error updating course:", error.message || error);
    },
  });
};

/**
 * Admin Delete Course Mutation
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

// MAHASISWA HOOKS
/**
 * Ambil daftar Course mahasiswa dengan pagination & search
 */
export const useMahasiswaCourse = ({ page = 1, limit = 10 }) => {
  const currentRole = useUserRole();
  const enabled = currentRole === "mahasiswa";

  const query = useQuery({
    queryKey: ["mahasiswa-courses", { page, limit }],
    queryFn: async () => {
      const res = await courseService.mahasiswaGetCourse({
        page,
        limit,
      });
      return res;
    },
    enabled,
    keepPreviousData: true,
    staleTime: 0,
    refetchOnMount: true,
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
 * Mahasiswa Create Course Mutation
 */
export const useMahasiswaCreateCourse = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (courseData) => {
      const res = await courseService.mahasiswaCreateCourse(courseData);
      return res;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["mahasiswa-courses"] });
      navigate("/mahasiswa/courses");
      window.location.reload();
      console.log("✅ Jadwal berhasil dibuat:", data.message);
    },
    onError: (error) => {
      console.error("❌ Error create course:", error.message || error);
    },
  });
};

/**
 * Mahasiswa Detail Course berdasarkan ID
 */
export const useMahasiswaCourseDetail = (id) => {
  const query = useQuery({
    queryKey: ["mahasiswa-course-detail", id],
    queryFn: async () => {
      const res = await courseService.mahasiswaGetCourseDetail(id);
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
 * Mahasiswa Update Course Mutation
 */
export const useMahasiswaUpdateCourse = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, courseData }) => {
      const res = await courseService.mahasiswaUpdateCourse(id, courseData);
      return res;
    },
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({ queryKey: ["mahasiswa-courses"] });
      queryClient.invalidateQueries({
        queryKey: ["mahasiswa-course-detail", variables.id],
      });
      navigate("/mahasiswa/courses");
      console.log("✅ Jadwal berhasil diubah:", data.message);
    },
    onError: (error) => {
      console.error("❌ Error updating course:", error.message || error);
    },
  });
};

/**
 * Mahasiswa Delete Course Mutation
 */
export const useMahasiswaDeleteCourse = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id) => {
      const res = await courseService.mahasiswaDeleteCourse(id);
      return res;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["mahasiswa-courses"] });
      console.log("✅ Course berhasil dihapus:", data.message);
    },
    onError: (error) => {
      console.error("❌ Error deleting course:", error.message);
    },
  });
};
