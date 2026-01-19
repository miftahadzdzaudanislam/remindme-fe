import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useState, useMemo } from "react";

// Dummy data
const DUMMY_USERS = [
  {
    id: 1,
    name: "John Doe",
    email: "john@example.com",
    status: "semua",
    role: "user",
    createdAt: "2025-01-15",
  },
  {
    id: 2,
    name: "Jane Smith",
    email: "jane@example.com",
    status: "aktif",
    role: "user",
    createdAt: "2025-01-10",
  },
  {
    id: 3,
    name: "Bob Johnson",
    email: "bob@example.com",
    status: "tidak_aktif",
    role: "moderator",
    createdAt: "2025-01-05",
  },
  {
    id: 4,
    name: "Alice Brown",
    email: "alice@example.com",
    status: "suspended",
    role: "user",
    createdAt: "2024-12-20",
  },
];

// Service API (sesuaikan dengan struktur project Anda)
const userService = {
  adminGetUsers: async (params) => {
    // Simulasi delay API
    await new Promise((resolve) => setTimeout(resolve, 500));

    // Dummy response
    return {
      data: DUMMY_USERS,
      pagination: {
        page: params.page || 1,
        limit: params.limit || 10,
        total: DUMMY_USERS.length,
        totalPages: 1,
      },
    };
  },
  adminDeleteUser: async (id) => {
    // Simulasi delay API
    await new Promise((resolve) => setTimeout(resolve, 500));
    return { success: true, id };
  },
};

export const useAdminUsers = (page = 1, limit = 10, search = "") => {
  const [activeTab, setActiveTab] = useState("semua");

  const query = useQuery({
    queryKey: ["adminUsers", page, limit, search, activeTab],
    queryFn: async () => {
      const response = await userService.adminGetUsers({
        page,
        limit,
        search,
        status: activeTab,
      });
      return response;
    },
    keepPreviousData: true,
    staleTime: 30000,
    retry: 1,
  });

  const filteredUsers = useMemo(() => {
    return query.data?.data || [];
  }, [query.data]);

  return {
    users: filteredUsers,
    pagination: query.data?.pagination || {},
    activeTab,
    setActiveTab,
    isLoading: query.isLoading,
    isFetching: query.isFetching,
    error: query.error,
  };
};

export const useAdminDeleteUserMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: userService.adminDeleteUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["adminUsers"] });
      console.log("✅ User berhasil dihapus");
    },
    onError: (error) => {
      console.error("❌ Delete user error:", error);
    },
  });
};
