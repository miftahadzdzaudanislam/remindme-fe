import { useMahasiswaChangeStatusTask, useMahasiswaDeleteTask, useMahasiswaTask } from "@/_hooks/useTasks";
import useDocumentTitle from "@/_hooks/utils/useDocumentTitle";
import { useFilteredTasks } from "@/_hooks/utils/useFilteredData";
import DeleteModal from "@/components/modal/DeleteModal";
import Badge from "@/components/ui/Badge";
import TabFilter from "@/components/ui/TabFilter";
import ToggleStatus from "@/components/ui/ToggleStatus";
import { formatDate } from "@/utils/dateFormatter";
import { CONFIG } from "@/utils/tableConfig";
import { CheckSquare, Edit, Loader2, Search, Trash2 } from "lucide-react";
import { useState } from "react";
import DataTable from "react-data-table-component";
import { Link } from "react-router-dom";

export default function MahasiswaTask() {
  useDocumentTitle("Kelola Tugas");

  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);

  // Ambil data dari API
  const {
    tasks: apiTasks,
    pagination,
    isLoading,
    isError,
  } = useMahasiswaTask({ page, limit });

  // Hook untuk filter
  const { filteredTasks, activeTab, setActiveTab, search, setSearch } =
    useFilteredTasks(apiTasks);
  // Delete task Mutation
  const deleteTaskMutation = useMahasiswaDeleteTask();
  // Change task status Mutation
  const changeStatusMutation = useMahasiswaChangeStatusTask();

  const handleToggleStatus = (task) => {
    changeStatusMutation.mutate({ id: task.id, is_done: !task.is_done });
  };

  const openDeleteModal = (task) => {
    setSelectedTask(task);
    setDeleteModalOpen(true);
  };

  const handleDeleteTask = async () => {
    await deleteTaskMutation.mutateAsync(selectedTask.id);
    setDeleteModalOpen(false);
    setSelectedTask(null);
  };

  const columns = [
    {
      name: "No.",
      cell: (_, index) => index + 1,
      width: "60px",
    },
    {
      name: "Tugas",
      selector: (row) => row.nama_tugas,
      sortable: true,
      wrap: true,
    },
    {
      name: "Mata Kuliah",
      selector: (row) => row.course?.nama_matkul || "-",
      sortable: true,
      wrap: true,
    },
    {
      name: "Deadline",
      selector: (row) => row.deadline,
      sortable: true,
      cell: (row) => formatDate(row.deadline),
      width: "150px",
    },
    {
      name: "Prioritas",
      selector: (row) => row.prioritas,
      sortable: true,
      cell: (row) => (
        <Badge
          value={row.prioritas}
          variant={CONFIG.prioritasVariant[row.prioritas]}
          size="sm"
        />
      ),
      width: "110px",
    },
    {
      name: "Status",
      selector: (row) => row.is_done,
      cell: (row) => (
        <div className="flex items-center gap-2 w-full justify-center">
          <ToggleStatus
            is_done={row.is_done}
            onToggle={() => handleToggleStatus(row)}
            loading={changeStatusMutation.isLoading}
          />
        </div>
      ),
      sortable: true,
      width: "90px",
    },
    {
      name: "Aksi",
      cell: (row) => (
        <div className="flex justify-center gap-2 w-full">
          <Link
            to={`edit/${row.id}`}
            className="text-primary hover:text-primary-hover"
            title="Edit Tugas"
          >
            <Edit size={18} />
          </Link>
          <button
            onClick={() => openDeleteModal(row)}
            className="text-danger hover:text-danger-hover cursor-pointer"
            title="Hapus Tugas"
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
    <>
      <div className="min-h-screen space-y-4 rounded-xl p-3 md:p-6">
        {/* Header */}
        <div className="flex flex-col justify-between mb-10 items-start gap-4 md:items-center md:flex-row">
          <h1 className="flex text-xl md:text-2xl font-bold text-primary gap-2 md:gap-3 items-center">
            <CheckSquare size={24} className="md:w-7 md:h-7" />
            <span>Daftar Tugas Saya</span>
          </h1>
          <Link
            to="create"
            className="inline-flex items-center justify-center px-3 py-2 rounded-lg transition font-medium text-xs text-white bg-primary drop-shadow-2xl shadow-primary hover:scale-105 hover:bg-primary-hover md:text-sm w-full md:w-auto md:px-4"
          >
            Tambah Tugas +
          </Link>
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
              placeholder="Cari judul tugas atau prioritas..."
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
          tabs={CONFIG.status_tabs}
          activeTab={activeTab}
          onTabChange={(tabId) => {
            setActiveTab(tabId);
            setPage(1);
          }}
        />

        {/* Table */}
        <div className="max-w-100 overflow-x-auto md:min-w-full rounded-lg border border-gray-200">
          <DataTable
            columns={columns}
            data={filteredTasks}
            pagination
            paginationPerPage={limit}
            paginationRowsPerPageOptions={[10, 25, 50]}
            paginationTotalRows={pagination?.total || filteredTasks.length}
            onChangePage={(p) => setPage(p)}
            onChangeRowsPerPage={(newLimit) => {
              setLimit(newLimit);
              setPage(1);
            }}
            progressPending={isLoading}
            noDataComponent={
              <div className="py-8 text-gray-500">
                {isError ? "Gagal memuat data" : "Tidak ada data tugas"}
              </div>
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
      </div>

      <DeleteModal
        open={deleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        onConfirm={handleDeleteTask}
      />
    </>
  );
}
