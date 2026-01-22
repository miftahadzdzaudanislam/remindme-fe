import useDocumentTitle from "@/_hooks/utils/useDocumentTitle";
import { useFilteredData } from "@/_hooks/utils/useFilteredData";
import DeleteModal from "@/components/modal/DeleteModal";
import Badge from "@/components/ui/Badge";
import TabFilter from "@/components/ui/TabFilter";
import { DUMMY_TASKS, DUMMY_COURSES } from "@/utils/dataDummy";
import { formatDate } from "@/utils/dateFormatter";
import { CONFIG } from "@/utils/tableConfig";
import { CheckSquare, Edit, Loader2, Trash2 } from "lucide-react";
import { useMemo, useState } from "react";
import DataTable from "react-data-table-component";
import { Link } from "react-router-dom";

const STATUS_TABS = [
  { id: "semua", label: "Semua" },
  { id: "pending", label: "Pending" },
  { id: "done", label: "Done" },
];

export default function MahasiswaTask() {
  useDocumentTitle("Kelola Tugas");

  const userId = 2;
  const [tasks, setTasks] = useState(
    DUMMY_TASKS.filter((task) => task.user_id === userId)
  );
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);

  const tasksWithMeta = useMemo(
    () =>
      tasks.map((task) => ({
        ...task,
        course: DUMMY_COURSES.find((c) => c.id === task.course_id),
      })),
    [tasks]
  );

  const { filteredData, activeTab, setActiveTab } = useFilteredData(
    tasksWithMeta,
    (data, tab) => {
      if (tab === "done") return data.filter((task) => task.is_done);
      if (tab === "pending") return data.filter((task) => !task.is_done);
      return data;
    }
  );

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
      cell: (row) => {
        const statusLabel = row.is_done ? "Done" : "Pending";
        const dotColor = row.is_done ? "bg-success" : "bg-warning";
        return (
          <div className="flex items-center gap-2">
            <span className={`w-2 h-2 rounded-full ${dotColor}`}></span>
            <span>{statusLabel}</span>
          </div>
        );
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
            onClick={() => {
              setSelectedTask(row);
              setDeleteModalOpen(true);
            }}
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

        <TabFilter tabs={STATUS_TABS} activeTab={activeTab} onTabChange={setActiveTab} />

        <div className="max-w-100 overflow-x-auto md:min-w-full rounded-lg border border-gray-200">
          <DataTable
            columns={columns}
            data={filteredData}
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

      <DeleteModal
        open={deleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        onConfirm={handleDeleteTask}
      />
    </>
  );
}