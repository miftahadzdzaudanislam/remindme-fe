import useDocumentTitle from "@/_hooks/utils/useDocumentTitle";
import { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, BookOpen, Calendar, Type } from "lucide-react";
import UserInput from "@/components/ui/UserInput";
import { useMahasiswaCreateTask } from "@/_hooks/useTasks";
import { useForm } from "react-hook-form";
import { useMahasiswaCourse } from "@/_hooks/useCourses";

export default function MahasiswaTaskCreate() {
  useDocumentTitle("Tambah Tugas");

  const navigate = useNavigate();
  const [error, setError] = useState("");
  const createTaskMutation = useMahasiswaCreateTask();

  // Ambil data user dari API
  const { courses, isLoading: isCourseLoading } = useMahasiswaCourse({});

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitted, isSubmitting },
  } = useForm({
    mode: "onChange",
    defaultValues: {
      course_id: "",
      nama_tugas: "",
      deskripsi: "",
      deadline: "",
      prioritas: "medium",
    },
  });

  // Options untuk select
  const onSubmit = async (data) => {
    setError("");

    const deadlineDate = new Date(data.deadline);
    deadlineDate.setHours(0, 0, 0, 0);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (deadlineDate <= today) {
      setError("Deadline harus lebih dari hari ini");
      return;
    }

    // Ambil FormData langsung dari form HTML
    const payload = new FormData();
    for (const key in data) {
      if (key === "is_done") {
        payload.append(key, data[key] === "true" ? 1 : 0);
      } else {
        payload.append(key, data[key]);
      }
    }

    await createTaskMutation.mutateAsync(payload);
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
            Tambah Tugas
          </h1>
          <p className="text-sm text-gray-600">
            Isi judul, deskripsi dan deadline tugas
          </p>
        </div>
      </div>

      {/* Form */}
      <div className="flex justify-center">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="mx-5 w-full bg-white rounded-xl border border-gray-200 p-6 shadow-xl space-y-6 md:p-8 lg:w-3/4"
        >
          {/* Judul Tugas dan Matkul */}
          <div className="grid md:grid-cols-2 gap-5">
            <UserInput
              label="Judul Tugas"
              icon={Type}
              color="dark"
              placeholder="Masukkan judul tugas"
              required
              {...register("nama_tugas", { required: "Judul tugas diisi" })}
              error={isSubmitted && errors.nama_tugas?.message}
            />
            <UserInput
              label="Nama Mata Kuliah"
              icon={BookOpen}
              color="dark"
              as="select"
              required
              {...register("course_id", {
                required: "Mata kuliah wajib dipilih",
              })}
              error={isSubmitted && errors.course_id?.message}
              disabled={isCourseLoading}
              options={[
                { value: "", label: "-- Pilih Mata Kuliah --" },
                ...courses.map((c) => ({
                  value: c.id,
                  label: c.nama_matkul,
                })),
              ]}
            />
          </div>

          {/* Deskripsi */}
          <UserInput
            label="Deskripsi"
            color="dark"
            as="textarea"
            placeholder="Detail tugas"
            rows={5}
            {...register("deskripsi")}
          />

          {/* Deadline dan Prioritas */}
          <div className="grid md:grid-cols-2 gap-5">
            <UserInput
              label="Deadline"
              icon={Calendar}
              color="dark"
              type="date"
              required
              {...register("deadline", { required: "Deadline wajib diisi" })}
              error={isSubmitted && errors.deadline?.message}
            />
            <UserInput
              label="Prioritas"
              color="dark"
              as="select"
              required
              {...register("prioritas")}
              options={[
                { value: "low", label: "🔵 Low" },
                { value: "medium", label: "🟡 Medium" },
                { value: "high", label: "🔴 High" },
              ]}
            />
          </div>

          {/* Error Message */}
          {isSubmitted && error && (
            <div className="bg-red-100 text-red-700 rounded-lg p-3 mb-2">
              {error}
            </div>
          )}

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
              disabled={isSubmitting || createTaskMutation.isLoading}
              className="px-6 py-3 rounded-lg bg-primary text-white font-medium hover:bg-primary/90 transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {createTaskMutation.isLoading || isSubmitting
                ? "Menambah..."
                : "Tambah Tugas"}
            </motion.button>
          </div>
        </form>
      </div>
    </div>
  );
}
