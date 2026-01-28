import useDocumentTitle from "@/_hooks/utils/useDocumentTitle";
import { useFilteredCourses } from "@/_hooks/utils/useFilteredData";
import DeleteModal from "@/components/modal/DeleteModal";
import TabFilter from "@/components/ui/TabFilter";
import { CONFIG } from "@/utils/tableConfig";
import { BookOpen, Edit, Loader2, Search, Trash2 } from "lucide-react";
import { useState } from "react";
import DataTable from "react-data-table-component";
import { Link } from "react-router-dom";
import {
  useMahasiswaCourse,
  useMahasiswaDeleteCourse,
} from "@/_hooks/useCourses";
import { formatHours } from "@/utils/dateFormatter";

export default function MahasiswaCourse() {
  useDocumentTitle("Kelola Mata Kuliah");

  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState(null);

  // Ambil data dari API
  const {
    courses: apiCourses,
    pagination,
    isLoading,
    isError,
  } = useMahasiswaCourse({ page, limit });

  // Hook untuk filter (sudah termasuk tab hari & search)
  const { filteredCourses, activeTab, setActiveTab, search, setSearch } =
    useFilteredCourses(apiCourses);

  // Filter berdasarkan tab hari
  const filteredData =
    activeTab === "semua"
      ? filteredCourses
      : filteredCourses.filter((c) => c.hari?.toLowerCase() === activeTab);

  // mutation untuk delete course
  const deleteCourseMutation = useMahasiswaDeleteCourse();

  const openDeleteModal = (course) => {
    setSelectedCourse(course);
    setDeleteModalOpen(true);
  };

  const handleDeleteCourse = async () => {
    await deleteCourseMutation.mutateAsync(selectedCourse.id);
    setDeleteModalOpen(false);
    setSelectedCourse(null);
  };

  const columns = [
    {
      name: "No.",
      cell: (_, index) => (page - 1) * limit + index + 1,
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
      width: "190px",
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
      selector: (row) =>
        `${formatHours(row.jam_mulai)} - ${formatHours(row.jam_selesai)} WIB`,
      sortable: true,
      width: "150px",
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
            onClick={() => openDeleteModal(row)}
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

        {/* Search Input */}
        <div className="mb-4">
          <div className="relative bg-white/50">
            <Search
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              size={18}
            />
            <input
              type="text"
              placeholder="Cari nama matkul, dosen, atau ruangan..."
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
          tabs={CONFIG.hari_tabs}
          activeTab={activeTab}
          onTabChange={(tabId) => {
            setActiveTab(tabId);
            setPage(1);
          }}
        />

        <div className="max-w-100 overflow-x-auto md:min-w-full rounded-lg border border-gray-200">
          <DataTable
            columns={columns}
            data={filteredData}
            pagination
            paginationPerPage={limit}
            paginationRowsPerPageOptions={[10, 25, 50]}
            paginationTotalRows={pagination?.total || filteredData.length}
            onChangePage={(p) => setPage(p)}
            onChangeRowsPerPage={(newLimit) => {
              setLimit(newLimit);
              setPage(1);
            }}
            noDataComponent={
              <div className="py-8 text-gray-500">
                {isError ? "Gagal memuat data" : "Tidak ada data mata kuliah"}
              </div>
            }
            progressPending={isLoading}
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
