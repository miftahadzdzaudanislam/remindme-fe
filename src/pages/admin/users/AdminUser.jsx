import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { Users, Edit, Trash2, Loader2 } from "lucide-react";
import Badge from "@/components/ui/Badge";
import useDocumentTitle from "@/_hooks/utils/useDocumentTitle";
import DataTable from "react-data-table-component";
import ChangeStatusModal from "@/components/ChangeStatusModal";
import DeleteUserModal from "@/components/DeleteUserModal";
import { CONFIG } from "@/utils/tableConfig";
import { DUMMY_USERS } from "@/utils/dataDummy";

export default function AdminUser() {
  useDocumentTitle("Kelola Mahasiswa");

  const [activeTab, setActiveTab] = useState("semua");
  const [users, setUsers] = useState(DUMMY_USERS);
  const [selectedUser, setSelectedUser] = useState(null);
  const [statusModalOpen, setStatusModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);

  const filteredUsers = useMemo(() => {
    if (activeTab === "semua") return users;

    const tab = CONFIG.tabs.find((t) => t.id === activeTab);

    return users.filter((u) => u.status === tab?.status);
  }, [users, activeTab]);

  const openModal = (user, type) => {
    setSelectedUser(user);
    type === "status" ? setStatusModalOpen(true) : setDeleteModalOpen(true);
  };

  const closeModals = () => {
    setStatusModalOpen(false);
    setDeleteModalOpen(false);
    setSelectedUser(null);
  };

  const handleChangeStatus = ({ status }) => {
    setUsers((prev) =>
      prev.map((u) => (u.id === selectedUser.id ? { ...u, status } : u)),
    );
    closeModals();
  };

  const handleDeleteUser = () => {
    setUsers((prev) => prev.filter((u) => u.id !== selectedUser.id));
    closeModals();
  };

  const columns = [
    {
      name: "No.",
      cell: (_, index) => index + 1,
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
      selector: (row) => CONFIG.jurusanMap[row.jurusan] || row.jurusan,
      sortable: true,
      wrap: true,
    },
    {
      name: "Role",
      cell: (row) => {
        const userRole = row.role || "mahasiswa";
        const variant = userRole === "admin" ? "danger" : "info";
        return <Badge value={userRole} variant={variant} size="sm" />;
      },
      sortable: true,
      width: "120px",
    },
    {
      name: "Status",
      cell: (row) => (
        <Badge
          value={row.status}
          variant={CONFIG.userStatusVariant[row.status]}
          size="sm"
        />
      ),
      sortable: true,
      width: "110px",
    },
    {
      name: "Aksi",
      cell: (row) => (
        <div className="flex justify-center gap-2 w-full">
          <button
            onClick={() => openModal(row, "status")}
            className="text-primary hover:text-primary-hover"
            title="Ubah Status"
          >
            <Edit size={18} />
          </button>
          <button
            onClick={() => openModal(row, "delete")}
            className="text-danger hover:text-danger-hover cursor-pointer"
            title="Hapus User"
          >
            <Trash2 size={18} />
          </button>
        </div>
      ),
      width: "90px",
      ignoreRowClick: true,
    },
  ];

  return (
    <div className="min-h-screen space-y-4 rounded-xl p-3 md:p-6">
      {/* Header */}
      <div className="flex flex-col justify-between mb-10 items-start gap-4 md:items-center md:flex-row">
        <h1 className="flex text-xl md:text-2xl font-bold text-primary gap-2 md:gap-3 items-center">
          <Users size={24} className="md:w-7 md:h-7" />
          <span>Daftar Mahasiswa</span>
        </h1>
        <Link
          to="create"
          className="inline-flex items-center justify-center px-3 py-2 rounded-lg transition font-medium text-xs text-white bg-primary drop-shadow-2xl shadow-primary hover:scale-105 hover:bg-primary-hover md:text-sm w-full md:w-auto md:px-4"
        >
          Tambah User +
        </Link>
      </div>

      {/* Tabs */}
      <div className="flex rounded-lg bg-gray-200 p-1 gap-1 overflow-x-auto">
        {CONFIG.tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex-1 rounded-lg px-2 md:px-4 py-2 transition font-medium text-xs md:text-sm whitespace-nowrap ${
              activeTab === tab.id
                ? "bg-primary shadow text-light"
                : "text-gray-700 hover:text-gray-900 hover:bg-gray-300"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Table */}
      <div className="max-w-110 overflow-x-auto md:min-w-full rounded-lg border border-gray-200">
        <DataTable
          columns={columns}
          data={filteredUsers}
          pagination
          paginationServer
          paginationPerPage={10}
          paginationRowsPerPageOptions={[10, 25, 50]}
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
          customStyles={CONFIG.tableStyles}
        />
      </div>

      {/* Modals */}
      <ChangeStatusModal
        open={statusModalOpen}
        currentStatus={selectedUser?.status}
        onClose={closeModals}
        onConfirm={handleChangeStatus}
      />

      <DeleteUserModal
        open={deleteModalOpen}
        onClose={closeModals}
        onConfirm={handleDeleteUser}
      />
    </div>
  );
}
