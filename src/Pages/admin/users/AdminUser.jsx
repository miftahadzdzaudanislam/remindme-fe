import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { Users, Edit, Trash2, Loader2 } from "lucide-react";
import Badge from "@/components/ui/badge";
import useDocumentTitle from "@/_hooks/utils/useDocumentTitle";
import DataTable from "react-data-table-component";

const DUMMY_USERS = [
  {
    id: 1,
    nama: "John Doe",
    email: "john@example.com",
    nim: "2021001",
    jurusan: "ti",
    role: "mahasiswa",
    status: "active",
    terakhirLogin: "2025-01-18",
  },
  {
    id: 2,
    nama: "Jane Smith",
    email: "jane@example.com",
    nim: "2021002",
    jurusan: "si",
    role: "mahasiswa",
    status: "active",
    terakhirLogin: "2025-01-17",
  },
  {
    id: 3,
    nama: "Bob Johnson",
    email: "bob@example.com",
    nim: "2021003",
    jurusan: "ti",
    role: "admin",
    status: "inactive",
    terakhirLogin: "2025-01-05",
  },
  {
    id: 4,
    nama: "Alice Brown",
    email: "alice@example.com",
    nim: "2021004",
    jurusan: "bd",
    role: "mahasiswa",
    status: "suspended",
    terakhirLogin: "2024-12-20",
  },
];

const jurusanMap = {
  ti: "Teknik Informatika",
  si: "Sistem Informasi",
  bd: "Bisnis Digital",
};

const tableStyles = {
  cells: {
    style: {
      paddingTop: "14px",
      paddingBottom: "14px",
    },
  },
  headCells: {
    style: {
      backgroundColor: "var(--color-primary, #2563eb)",
      color: "#fff",
      fontWeight: 700,
    },
  },
};

export default function AdminUser() {
  useDocumentTitle("Kelola Mahasiswa");
  const [activeTab, setActiveTab] = useState("semua");
  const [users, setUsers] = useState(DUMMY_USERS);

  const filteredUsers = useMemo(() => {
    if (activeTab === "semua") return users;
    const statusMap = {
      aktif: "active",
      tidakaktif: "inactive",
      suspended: "suspended",
    };
    return users.filter((u) => u.status === statusMap[activeTab]);
  }, [users, activeTab]);

  const deleteUser = (id) => {
    if (window.confirm("Apakah Anda yakin ingin menghapus user ini?")) {
      setUsers((prev) => prev.filter((u) => u.id !== id));
    }
  };

  const columns = [
    {
      name: "No.",
      cell: (row, index) => index + 1,
      sortable: false,
      width: "60px",
    },
    {
      name: "Nama",
      selector: (row) => row.nama || "-",
      sortable: true,
      wrap: true,
      width: "110px",
    },
    {
      name: "Email",
      selector: (row) => row.email,
      sortable: true,
      wrap: true,
    },
    {
      name: "NIM",
      selector: (row) => row.nim,
      sortable: true,
      width: "120px",
    },
    {
      name: "Jurusan",
      selector: (row) => jurusanMap[row.jurusan] || row.jurusan,
      sortable: true,
      wrap: true,
    },
    {
      name: "Role",
      selector: (row) => row.role,
      sortable: true,
      width: "120px",
    },
    {
      name: "Status",
      selector: (row) => row.status,
      sortable: true,
      cell: (row) => (
        <Badge
          value={row.status}
          variant={
            row.status === "active"
              ? "success"
              : row.status === "inactive"
                ? "warning"
                : "danger"
          }
          size="sm"
        />
      ),
      width: "140px",
    },
    {
      name: "Aksi",
      cell: (row) => (
        <div className="flex justify-end gap-2 w-full">
          <Link
            to={`${row.id}/edit`}
            className="text-warning hover:text-warning-hover"
          >
            <Edit size={18} />
          </Link>
          <button
            onClick={() => deleteUser(row.id)}
            className="text-danger hover:text-danger-hover"
          >
            <Trash2 size={18} />
          </button>
        </div>
      ),
      width: "70px",
      ignoreRowClick: true,
      style: { justifyContent: "flex-end" },
    },
  ];

  const tabs = ["semua", "aktif", "tidakaktif", "suspended"];

  return (
    <div className="min-h-screen space-y-4 rounded-xl p-3 md:p-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <h1 className="flex text-xl md:text-2xl font-bold text-primary gap-2 md:gap-3 items-center">
          <Users size={24} className="md:w-7 md:h-7" />
          <span>Daftar Mahasiswa</span>
        </h1>
        <Link
          to="create"
          className="inline-flex items-center px-3 md:px-4 py-2 rounded-lg transition text-white bg-primary hover:bg-primary-hover text-xs md:text-sm font-medium w-full md:w-auto justify-center"
        >
          Tambah User +
        </Link>
      </div>

      <div className="flex rounded-lg bg-gray-200 p-1 gap-1 overflow-x-auto">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`flex-1 rounded-lg px-2 md:px-4 py-2 transition font-medium text-xs md:text-sm whitespace-nowrap ${
              activeTab === tab
                ? "bg-primary shadow text-light"
                : "text-gray-700 hover:text-gray-900 hover:bg-gray-300"
            }`}
          >
            {tab === "semua"
              ? "Semua"
              : tab === "aktif"
                ? "Aktif"
                : tab === "tidakaktif"
                  ? "Tidak Aktif"
                  : "Suspended"}
          </button>
        ))}
      </div>

      <div className="max-w-110 overflow-x-auto md:min-w-full">
        <DataTable
          columns={columns}
          data={filteredUsers}
          pagination
          paginationServer
          paginationPerPage={10}
          paginationRowsPerPageOptions={[10, 20, 50]}
          noDataComponent={
            <div className="py-8 text-gray-500">Tidak ada data mahasiswa</div>
          }
          progressComponent={
            <div className="flex justify-center py-10">
              <Loader2 className="animate-spin h-6 w-6 text-primary" />
            </div>
          }
          responsive
          striped
          highlightOnHover
          customStyles={tableStyles}
        />
      </div>
    </div>
  );
}
