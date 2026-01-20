import useDocumentTitle from "@/_hooks/utils/useDocumentTitle";
import DeleteModal from "@/components/DeleteModal";
import { DUMMY_COURSES, DUMMY_USERS } from "@/utils/dataDummy";
import { CONFIG } from "@/utils/tableConfig";
import { BookOpen, Edit, Loader2, Trash2 } from "lucide-react";
import { useMemo, useState } from "react";
import DataTable from "react-data-table-component";
import { Link } from "react-router-dom";

export default function AdminCourse() {
  useDocumentTitle("Kelola Mata Kuliah");

  const [courses, setCourses] = useState(DUMMY_COURSES);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState(null);

  // Gabungkan data courses dengan user
  const coursesWithUser = useMemo(() => {
    return courses.map((course) => ({
      ...course,
      user: DUMMY_USERS.find((user) => user.id === course.user_id),
    }));
  }, [courses]);

  const openDeleteModal = (course) => {
    setSelectedCourse(course);
    setDeleteModalOpen(true);
  };

  const handleDeleteCourse = () => {
    setCourses((prev) => prev.filter((c) => c.id !== selectedCourse.id));
    setDeleteModalOpen(false);
    setSelectedCourse(null);
  };

  const columns = [
    {
      name: "No.",
      cell: (_, index) => index + 1,
      sortable: false,
      width: "60px",
    },
    {
      name: "Mahasiswa",
      selector: (row) => row.user?.nama || "-",
      sortable: true,
      wrap: true,
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
      width: "130px",
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
        {/* Header */}
        <div className="flex flex-col justify-between mb-10 items-start gap-4 md:items-center md:flex-row">
          <h1 className="flex text-xl md:text-2xl font-bold text-primary gap-2 md:gap-3 items-center">
            <BookOpen size={24} className="md:w-7 md:h-7" />
            <span>Daftar Jadwal Mahasiswa</span>
          </h1>
          <Link
            to="create"
            className="inline-flex items-center justify-center px-3 py-2 rounded-lg transition font-medium text-xs text-white bg-primary drop-shadow-2xl shadow-primary hover:scale-105 hover:bg-primary-hover md:text-sm w-full md:w-auto md:px-4"
          >
            Tambah Jadwal +
          </Link>
        </div>

        {/* Table */}
        <div className="max-w-110 overflow-x-auto md:min-w-full rounded-lg border border-gray-200">
          <DataTable
            columns={columns}
            data={coursesWithUser}
            pagination
            paginationPerPage={10}
            paginationRowsPerPageOptions={[10, 25, 50]}
            noDataComponent={
              <div className="py-8 text-gray-500">
                Tidak ada data mata kuliah
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

      {/* Delete Modal */}
      <DeleteModal
        open={deleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        onConfirm={handleDeleteCourse}
      />
    </>
  );
}
