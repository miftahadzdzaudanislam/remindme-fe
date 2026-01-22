import useDocumentTitle from "@/_hooks/utils/useDocumentTitle";
import { DUMMY_COURSES } from "@/utils/dataDummy";
import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  BookOpen,
  Calendar,
  Type,
} from "lucide-react";
import UserInput from "@/components/ui/UserInput";

export default function MahasiswaTaskEdit() {
  useDocumentTitle("Edit Tugas");

  const userId = 2;
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const courseOptions = useMemo(
    () => [
      { value: "", label: "-- Pilih Mata Kuliah --" },
      ...DUMMY_COURSES.filter((c) => c.user_id === userId).map((c) => ({
        value: c.id,
        label: c.nama_matkul,
      })),
    ],
    [],
  );

  const priorityOptions = [
    { value: "low", label: "🔵 Low" },
    { value: "medium", label: "🟡 Medium" },
    { value: "high", label: "🔴 High" },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      navigate("/mahasiswa/tasks");
    }, 1000);
  };

  return (
    <div className="min-h-screen space-y-4 rounded-xl p-3 md:p-6">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => navigate("/mahasiswa/tasks")}
          className="group p-2 rounded-lg border border-transparent text-primary hover:bg-primary/10 hover:border-primary/20 transition-all duration-200"
        >
          <ArrowLeft
            size={20}
            className="transition-colors duration-200 group-hover:text-primary"
          />
        </motion.button>

        <div>
          <h1 className="text-xl md:text-2xl font-bold text-primary">
            Edit Tugas
          </h1>
          <p className="text-sm text-gray-600">
            Isi judul, deskripsi dan deadline tugas
          </p>
        </div>
      </div>

      {/* Form */}
      <div className="flex justify-center">
        <form
          onSubmit={handleSubmit}
          className="mx-5 w-full bg-white rounded-xl border border-gray-200 p-6 shadow-xl space-y-6 md:p-8 lg:w-3/4"
        >
          {/* Judul Tugas dan Matkul */}
          <div className="grid md:grid-cols-2 gap-5">
            <UserInput
              label="Judul Tugas"
              icon={Type}
              color="dark"
              name="nama_tugas"
              placeholder="Masukkan judul tugas"
              required
            />
            <UserInput
              label="Nama Mata Kuliah"
              icon={BookOpen}
              color="dark"
              as="select"
              name="course_id"
              required
              options={courseOptions}
            />
          </div>

          {/* Deskripsi */}
          <UserInput
            label="Deskripsi"
            color="dark"
            as="textarea"
            name="deskripsi"
            placeholder="Detail tugas"
            rows={5}
          />

          {/* Deadline dan Prioritas */}
          <div className="grid md:grid-cols-2 gap-5">
            <UserInput
              label="Deadline"
              icon={Calendar}
              color="dark"
              type="date"
              name="deadline"
              required
            />
            <UserInput
              label="Prioritas"
              color="dark"
              as="select"
              name="prioritas"
              required
              options={priorityOptions}
            />
          </div>

          {/* Actions */}
          <div className="flex flex-col-reverse md:flex-row justify-end gap-3 pt-4">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="button"
              onClick={() => navigate("/mahasiswa/tasks")}
              className="px-6 py-3 rounded-lg border border-gray-300 text-dark font-medium transition bg-gray-100 hover:bg-gray-200"
            >
              Batal
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={loading}
              className="px-6 py-3 rounded-lg bg-primary text-white font-medium hover:bg-primary/90 transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Menyimpan..." : "Simpan Tugas"}
            </motion.button>
          </div>
        </form>
      </div>
    </div>
  );
}