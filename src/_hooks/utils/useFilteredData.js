import { useMemo, useState } from "react";

export function useFilteredData(data, filterFn) {
  const [activeTab, setActiveTab] = useState("semua");

  // useMemo digunakan supaya proses filter tidak dihitung ulang
  // kecuali data, activeTab, atau filterFn berubah
  const filteredData = useMemo(() => {
    if (activeTab === "semua") return data;

    return filterFn(data, activeTab);
  }, [data, activeTab, filterFn]);

  // - filteredData → data yang sudah difilter
  // - activeTab → tab/filter yang sedang aktif
  // - setActiveTab → function untuk mengganti tab/filter
  return { filteredData, activeTab, setActiveTab };
}
