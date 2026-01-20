export const CONFIG = {
  // jurusan
  jurusanMap: {
    ti: "Teknik Informatika",
    si: "Sistem Informasi",
    bd: "Bisnis Digital",
  },

  // tab status
  tabs: [
    { id: "semua", label: "Semua" },
    { id: "aktif", label: "Aktif", status: "active" },
    { id: "tidakaktif", label: "Tidak Aktif", status: "inactive" },
    { id: "suspended", label: "Suspended", status: "suspended" },
  ],

  // table style
  tableStyles: {
    cells: { style: { paddingTop: "14px", paddingBottom: "14px" } },
    headCells: {
      style: {
        backgroundColor: "var(--color-primary, #2563eb)",
        color: "#fff",
        fontWeight: 700,
      },
    },
  },

  // user status variant
  userStatusVariant: {
    active: "success",
    inactive: "warning",
    suspended: "danger",
  },

  // Prioritas variant
  prioritasVariant: {
    low: "info",
    medium: "warning",
    high: "danger",
  },
};
