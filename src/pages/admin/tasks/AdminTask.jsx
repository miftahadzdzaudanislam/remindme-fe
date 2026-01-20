import useDocumentTitle from "@/_hooks/utils/useDocumentTitle";
import DeleteModal from "@/components/DeleteModal";
import Badge from "@/components/ui/Badge";
import { DUMMY_TASKS, DUMMY_USERS, DUMMY_COURSES } from "@/utils/dataDummy";
import { formatDate } from "@/utils/dataFormatter";
import { CONFIG } from "@/utils/tableConfig";
import { CheckSquare, Edit, Loader2, Trash2 } from "lucide-react";
import { useMemo, useState } from "react";
import DataTable from "react-data-table-component";
import { Link } from "react-router-dom";

export default function AdminTask() {
  useDocumentTitle("Kelola Tugas");

  const [tasks, setTasks] = useState(DUMMY_TASKS);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);

  // Gabungkan data tugas dengan user & matkul
  const tasksWithMeta = useMemo(() => {
    return tasks.map((task) => ({
      ...task,
      user: DUMMY_USERS.find((u) => u.id === task.user_id),
      course: DUMMY_COURSES.find((c) => c.id === task.course_id),
    }));
  }, [tasks]);

  const openDeleteModal = (task) => {
    setSelectedTask(task);
    setDeleteModalOpen(true);
  };

  const handleDeleteTask = () => {
    setTasks((prev) => prev.filter((t) => t.id !== selectedTask.id));
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
      name: "Mahasiswa",
      selector: (row) => row.user?.nama || "-",
      sortable: true,
      wrap: true,
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
      cell: (row) => {
        const statusLabel = row.is_done ? "Done" : "Pending";
        const variant = row.is_done ? "success" : "warning";
        return <Badge value={statusLabel} variant={variant} size="sm" />;
      },
      sortable: true,
      width: "110px",
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
            <span>Daftar Tugas Mahasiswa</span>
          </h1>
          <Link
            to="create"
            className="inline-flex items-center justify-center px-3 py-2 rounded-lg transition font-medium text-xs text-white bg-primary drop-shadow-2xl shadow-primary hover:scale-105 hover:bg-primary-hover md:text-sm w-full md:w-auto md:px-4"
          >
            Tambah Tugas +
          </Link>
        </div>

        {/* Table */}
        <div className="max-w-110 overflow-x-auto md:min-w-full rounded-lg border border-gray-200">
          <DataTable
            columns={columns}
            data={tasksWithMeta}
            pagination
            paginationPerPage={10}
            paginationRowsPerPageOptions={[10, 25, 50]}
            noDataComponent={
              <div className="py-8 text-gray-500">Tidak ada data tugas</div>
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

      {/* Delete Modal */}
      <DeleteModal
        open={deleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        onConfirm={handleDeleteTask}
      />
    </>
  );
}
