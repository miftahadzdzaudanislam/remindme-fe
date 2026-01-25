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
