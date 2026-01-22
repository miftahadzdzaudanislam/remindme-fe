import useDocumentTitle from "@/_hooks/utils/useDocumentTitle";
import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  BookOpen,
  Clock,
  User,
  House,
  Briefcase,
} from "lucide-react";
import UserInput from "@/components/ui/UserInput";
import { DUMMY_USERS } from "@/utils/dataDummy";

export default function AdminCourseCreate() {
  useDocumentTitle("Tambah Jadwal");
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  // Mapping data users untuk options select
  const userOptions = useMemo(
    () => [
      { value: "", label: "-- Pilih Mahasiswa --" },
      ...DUMMY_USERS.filter((u) => u.role === "mahasiswa").map((u) => ({
        value: u.id,
        label: `${u.nama} - ${u.nim}`,
      })),
    ],
    [],
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      navigate("/admin/courses");
    }, 1000);
  };

  return (
    <div className="min-h-screen space-y-4 rounded-xl p-3 md:p-6">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => navigate("/admin/courses")}
          className="group p-2 rounded-lg border border-transparent text-primary hover:bg-primary/10 hover:border-primary/20 transition-all duration-200"
        >
          <ArrowLeft
            size={20}
            className="transition-colors duration-200 group-hover:text-primary"
          />
        </motion.button>

        <div>
          <h1 className="flex items-center gap-2 md:gap-3 text-xl md:text-2xl font-bold text-primary">
            <span>Tambah Jadwal</span>
          </h1>
          <p className="text-sm text-gray-600">
            Isi nama, hari dan jam mata kuliah
          </p>
        </div>
      </div>

      {/* Form */}
      <div className="flex justify-center">
        <form
          onSubmit={handleSubmit}
          className="mx-auto w-4/5 max-w-5xl bg-white rounded-xl border border-gray-200 p-6 shadow-xl space-y-6 md:p-8 lg:w-3/4"
        >
          {/* Nama Mahasiswa */}
          <UserInput
            label="Nama Mahasiswa"
            icon={User}
            color="dark"
            as="select"
            name="user_id"
            required
            options={userOptions}
          />

          {/* Nama Mata Kuliah */}
          <UserInput
            label="Nama Mata Kuliah"
            icon={BookOpen}
            color="dark"
            name="nama_matkul"
            placeholder="Masukkan nama mata kuliah"
            required
          />

          {/* Nama Dosen */}
          <UserInput
            label="Nama Dosen"
            icon={Briefcase}
            color="dark"
            name="nama_dosen"
            placeholder="Masukkan nama dosen mata kuliah"
            required
          />

          {/* Jam Mulai dan Selesai */}
          <div className="grid md:grid-cols-2 gap-5">
            <UserInput
              label="Jam Mulai"
              icon={Clock}
              color="dark"
              type="time"
              name="jam_mulai"
              required
            />
            <UserInput
              label="Jam Selesai"
              icon={Clock}
              color="dark"
              type="time"
              name="jam_selesai"
              required
            />
          </div>

          {/* Ruangan */}
          <UserInput
            label="Ruangan"
            icon={House}
            color="dark"
            name="ruangan"
            placeholder="Contoh: Ruang A101"
            required
          />

          {/* Actions */}
          <div className="flex flex-col-reverse md:flex-row justify-end gap-3 pt-4">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="button"
              onClick={() => navigate("/admin/courses")}
              className="px-6 py-3 rounded-xl border border-gray-300 text-dark font-medium transition bg-gray-100 hover:bg-gray-200"
            >
              Batal
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={loading}
              className="px-6 py-3 rounded-xl bg-primary text-white font-medium hover:bg-primary/90 transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Menambah..." : "Tambah Jadwal"}
            </motion.button>
          </div>
        </form>
      </div>
    </div>
  );
}
