import { useState } from "react";
import { Users, Edit, Loader2, Search } from "lucide-react";
import Badge from "@/components/ui/Badge";
import useDocumentTitle from "@/_hooks/utils/useDocumentTitle";
import { useAdminChangeStatusUser, useAdminUser } from "@/_hooks/useUsers";
import TabFilter from "@/components/ui/TabFilter";
import DataTable from "react-data-table-component";
import { CONFIG } from "@/utils/tableConfig";
import ChangeStatusModal from "@/components/modal/ChangeStatusModal";
import { useFilteredUsers } from "@/_hooks/utils/useFilteredData";

export default function AdminUser() {
  useDocumentTitle("Kelola Mahasiswa");

  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [selectedUser, setSelectedUser] = useState(null);
  const [statusModalOpen, setStatusModalOpen] = useState(false);

  // ambil data dari API
  const { users, pagination, isLoading, isError } = useAdminUser({
    page,
    limit,
  });

  // gunakan hook untuk filter
  const { filteredUsers, activeTab, setActiveTab, search, setSearch } =
    useFilteredUsers(users);

  // mutation untuk change status
  const changeStatusMutation = useAdminChangeStatusUser();

  const closeModals = () => {
    setStatusModalOpen(false);
    setSelectedUser(null);
  };

  const handleChangeStatus = async ({ status }) => {
    if (!selectedUser?.id) return;
    try {
      await changeStatusMutation.mutateAsync({
        userId: selectedUser.id,
        status,
      });
      closeModals();
    } catch (err) {
      console.error("Gagal ubah status:", err?.message);
    }
  };

  const columns = [
    {
      name: "No.",
      cell: (_, index) => (page - 1) * limit + index + 1,
      sortable: false,
      width: "60px",
    },
    {
      name: "Nama",
      selector: (row) => row.name || "-",
      sortable: true,
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
      width: "110px",
    },
    {
      name: "Jurusan",
      selector: (row) => CONFIG.jurusanMap[row.jurusan] || row.jurusan,
      sortable: true,
      width: "160px",
    },
    {
      name: "Role",
      selector: (row) => row.role,
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
      selector: (row) => row.status,
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
            onClick={() => {
              setSelectedUser(row);
              setStatusModalOpen(true);
            }}
            className="text-primary hover:text-primary-hover"
            title="Ubah Status"
          >
            <Edit size={18} />
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
      </div>

      {/* Search Input */}
      <div className="mb-4">
        <div className="relative bg-white/50">
          <Search
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            size={18}
          />
          <input
            type="text"
            placeholder="Cari nama, email, atau NIM..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1);
            }}
            className="w-full px-4 py-2 pl-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>
      </div>

      {/* Tabs */}
      <TabFilter
        tabs={CONFIG.tabs}
        activeTab={activeTab}
        onTabChange={(tabId) => {
          setActiveTab(tabId);
          setPage(1);
        }}
      />

      {/* Table */}
      <div className="w-100 md:min-w-full rounded-lg border border-gray-200">
        <DataTable
          columns={columns}
          data={filteredUsers}
          pagination
          paginationServer
          paginationPerPage={limit}
          paginationRowsPerPageOptions={[10, 25, 50]}
          paginationTotalRows={pagination?.total || 0}
          onChangePage={(p) => setPage(p)}
          onChangeRowsPerPage={(newLimit) => {
            setLimit(newLimit);
            setPage(1);
          }}
          progressPending={isLoading}
          noDataComponent={
            <div className="py-8 text-gray-500">
              {isError ? "Gagal memuat data" : "Tidak ada data mahasiswa"}
            </div>
          }
          progressComponent={
            <div className="flex justify-center py-10">
              <Loader2 className="animate-spin h-6 w-6 text-primary" />
              <p className="ps-1">Loading...</p>
            </div>
          }
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
    </div>
  );
}
