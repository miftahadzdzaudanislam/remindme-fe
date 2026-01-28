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
 * Hook untuk filter courses berdasarkan tab hari dan search 
 * (nama matkul, dosen, ruangan)
 */
export function useFilteredCourses(apiCourses) {
  const [activeTab, setActiveTab] = useState("semua");
  const [search, setSearch] = useState("");

  const filteredCourses = useMemo(() => {
    return apiCourses.filter((c) => {
      // Filter berdasarkan tab hari
      const hariMatch =
        activeTab === "semua" ||
        (c.hari && c.hari.toLowerCase() === activeTab);

      // Filter berdasarkan search
      const searchLower = search.toLowerCase();
      const searchMatch =
        !search ||
        c.nama_matkul?.toLowerCase().includes(searchLower) ||
        c.nama_dosen?.toLowerCase().includes(searchLower) ||
        c.ruangan?.toLowerCase().includes(searchLower);

      return hariMatch && searchMatch;
    });
  }, [apiCourses, activeTab, search]);

  return {
    filteredCourses,
    activeTab,
    setActiveTab,
    search,
    setSearch,
  };
}

/**
 * Hook untuk filter tasks berdasarkan 
 * tab status (done/pending) dan search (judul tugas, matkul, prioritas)
 */
export function useFilteredTasks(apiTasks) {
  const [activeTab, setActiveTab] = useState("semua");
  const [search, setSearch] = useState("");

  const filteredTasks = useMemo(() => {
    return apiTasks.filter((t) => {
      // Filter berdasarkan tab status
      const statusMatch =
        activeTab === "semua" ||
        (activeTab === "done" && t.is_done) ||
        (activeTab === "pending" && !t.is_done);

      // Filter berdasarkan search
      const searchLower = search.toLowerCase();
      const searchMatch =
        !search ||
        t.nama_tugas?.toLowerCase().includes(searchLower) ||
        t.nama_matkul?.toLowerCase().includes(searchLower) ||
        t.prioritas?.toLowerCase().includes(searchLower);

      return statusMatch && searchMatch;
    });
  }, [apiTasks, activeTab, search]);

  return {
    filteredTasks,
    activeTab,
    setActiveTab,
    search,
    setSearch,
  };
}
