import { useMemo, useState } from "react";
import { CONFIG } from "@/utils/tableConfig";

/**
 * Hook generic untuk filter data berdasarkan tab dan custom filter function
 */
export function useFilteredData(data, filterFn) {
  const [activeTab, setActiveTab] = useState("semua");

  const filteredData = useMemo(() => {
    if (activeTab === "semua") return data;
    return filterFn(data, activeTab);
  }, [data, activeTab, filterFn]);

  return { filteredData, activeTab, setActiveTab };
}

/**
 * Hook untuk filter users berdasarkan tab status dan search
 */
export function useFilteredUsers(apiUsers) {
  const [activeTab, setActiveTab] = useState("semua");
  const [search, setSearch] = useState("");

  // Filter client-side: kombinasi status + search
  const filteredUsers = useMemo(() => {
    return apiUsers.filter((u) => {
      // Filter berdasarkan tab status
      const statusMatch =
        activeTab === "semua" ||
        u.status === CONFIG.tabs.find((t) => t.id === activeTab)?.status;

      // Filter berdasarkan search
      const searchMatch =
        !search ||
        u.name?.toLowerCase().includes(search.toLowerCase()) ||
        u.email?.toLowerCase().includes(search.toLowerCase()) ||
        u.nim?.toLowerCase().includes(search.toLowerCase());

      return statusMatch && searchMatch;
    });
  }, [apiUsers, activeTab, search]);

  return {
    filteredUsers,
    activeTab,
    setActiveTab,
    search,
    setSearch,
  };
}

/**
 * Hook untuk filter courses berdasarkan search (nama matkul, dosen, ruangan)
 */
export function useFilteredCourses(apiCourses) {
  const [search, setSearch] = useState("");

  const filteredCourses = useMemo(() => {
    return apiCourses.filter((c) => {
      const searchLower = search.toLowerCase();
      return (
        !search ||
        c.nama_matkul?.toLowerCase().includes(searchLower) ||
        c.nama_dosen?.toLowerCase().includes(searchLower) ||
        c.ruangan?.toLowerCase().includes(searchLower)
      );
    });
  }, [apiCourses, search]);

  return {
    filteredCourses,
    search,
    setSearch,
  };
}

/**
 * Hook untuk filter tasks berdasarkan search (judul tugas, matkul, prioritas)
 */
export function useFilteredTasks(apiTasks) {
  const [search, setSearch] = useState("");

  const filteredTasks = useMemo(() => {
    return apiTasks.filter((c) => {
      const searchLower = search.toLowerCase();
      return (
        !search ||
        c.nama_tugas?.toLowerCase().includes(searchLower) ||
        c.prioritas?.toLowerCase().includes(searchLower)
      );
    });
  }, [apiTasks, search]);

  return {
    filteredTasks,
    search,
    setSearch,
  };
}
