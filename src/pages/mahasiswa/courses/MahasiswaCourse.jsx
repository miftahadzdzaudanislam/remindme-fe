import useDocumentTitle from "@/_hooks/utils/useDocumentTitle";
import { useFilteredData } from "@/_hooks/utils/useFilteredData";
import DeleteModal from "@/components/modal/DeleteModal";
import TabFilter from "@/components/ui/TabFilter";
import { DUMMY_COURSES } from "@/utils/dataDummy";
import { CONFIG } from "@/utils/tableConfig";
import { getTodayIndonesian } from "@/utils/dateFormatter";
import { BookOpen, Edit, Loader2, Trash2 } from "lucide-react";
import { useState } from "react";
import DataTable from "react-data-table-component";
import { Link } from "react-router-dom";

const HARI_TABS = [
  { id: "semua", label: "Semua" },
  { id: "senin", label: "Senin" },
  { id: "selasa", label: "Selasa" },
  { id: "rabu", label: "Rabu" },
  { id: "kamis", label: "Kamis" },
  { id: "jumat", label: "Jumat" },
  { id: "sabtu", label: "Sabtu" },
];

export default function MahasiswaCourse() {
  useDocumentTitle("Kelola Mata Kuliah");

  const userId = 2;
  const [courses, setCourses] = useState(
    DUMMY_COURSES.filter((course) => course.user_id === userId)
  );
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState(null);

  const { filteredData, activeTab, setActiveTab } = useFilteredData(
    courses,
    (data, tab) => data.filter((course) => course.hari === tab),
    getTodayIndonesian()
  );

  const handleDeleteCourse = () => {
    setCourses((prev) => prev.filter((c) => c.id !== selectedCourse.id));
    setDeleteModalOpen(false);
    setSelectedCourse(null);
  };

  const columns = [
    {
      name: "No.",
      cell: (_, index) => index + 1,
      width: "60px",
    },
    {
      name: "Matkul",
      selector: (row) => row.nama_matkul || "-",
      sortable: true,
      wrap: true,
    },
    {
      name: "Dosen",
      selector: (row) => row.nama_dosen,
      sortable: true,
      width: "160px",
    },
    {
      name: "Hari",
      selector: (row) => row.hari,
      sortable: true,
      cell: (row) => <span className="capitalize">{row.hari}</span>,
      width: "80px",
    },
    {
      name: "Waktu",
      selector: (row) => `${row.jam_mulai} - ${row.jam_selesai} WIB`,
      sortable: true,
      wrap: true,
    },
    {
      name: "Ruangan",
      selector: (row) => row.ruangan,
      sortable: true,
      width: "120px",
    },
    {
      name: "Aksi",
      cell: (row) => (
        <div className="flex justify-center gap-2 w-full">
          <Link
            to={`edit/${row.id}`}
            className="text-primary hover:text-primary-hover"
            title="Edit Jadwal"
          >
            <Edit size={18} />
          </Link>
          <button
            onClick={() => {
              setSelectedCourse(row);
              setDeleteModalOpen(true);
            }}
            className="text-danger hover:text-danger-hover cursor-pointer"
            title="Hapus Jadwal"
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
            <BookOpen size={24} className="md:w-7 md:h-7" />
            <span>Daftar Jadwal Saya</span>
          </h1>
          <Link
            to="create"
            className="inline-flex items-center justify-center px-3 py-2 rounded-lg transition font-medium text-xs text-white bg-primary drop-shadow-2xl shadow-primary hover:scale-105 hover:bg-primary-hover md:text-sm w-full md:w-auto md:px-4"
          >
            Tambah Jadwal +
          </Link>
        </div>

        <TabFilter tabs={HARI_TABS} activeTab={activeTab} onTabChange={setActiveTab} />

        <div className="max-w-110 overflow-x-auto md:min-w-full rounded-lg border border-gray-200">
          <DataTable
            columns={columns}
            data={filteredData}
            pagination
            paginationPerPage={10}
            paginationRowsPerPageOptions={[10, 25, 50]}
            noDataComponent={
              <div className="py-8 text-gray-500">Tidak ada data mata kuliah</div>
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
        onConfirm={handleDeleteCourse}
      />
    </>
  );
}