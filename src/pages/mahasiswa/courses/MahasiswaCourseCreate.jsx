import useDocumentTitle from "@/_hooks/utils/useDocumentTitle";
import { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  BookOpen,
  Clock,
  House,
  Briefcase,
  CalendarDays,
} from "lucide-react";
import UserInput from "@/components/ui/UserInput";
import { toMinutes } from "@/utils/dateFormatter";
import { useForm } from "react-hook-form";
import { useMahasiswaCreateCourse } from "@/_hooks/useCourses";

export default function MahasiswaCourseCreate() {
  useDocumentTitle("Tambah Jadwal");

  const navigate = useNavigate();
  const [error, setError] = useState("");
  const createCourseMutation = useMahasiswaCreateCourse();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitted, isSubmitting },
  } = useForm({
    mode: "onChange",
    defaultValues: {
      nama_matkul: "",
      nama_dosen: "",
      hari: "",
      jam_mulai: "",
      jam_selesai: "",
      ruangan: "",
    },
  });

  const onSubmit = async (data) => {
    setError("");

    if (toMinutes(data.jam_selesai) <= toMinutes(data.jam_mulai)) {
      setError("Jam selesai harus lebih dari jam mulai");
      return;
    }

    // Ambil FormData langsung dari form HTML
    const payload = new FormData();
    for (const key in data) {
      payload.append(key, data[key]);
    }

    await createCourseMutation.mutateAsync(payload);
  };

  return (
    <div className="min-h-screen space-y-4 rounded-xl p-3 md:p-6">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => navigate("/mahasiswa/courses")}
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
          onSubmit={handleSubmit(onSubmit)}
          className="mx-5 w-full bg-white rounded-xl border border-gray-200 p-6 shadow-xl space-y-6 md:p-8 lg:w-3/4"
        >
          {/* Nama Mata Kuliah */}
          <UserInput
            label="Nama Mata Kuliah"
            icon={BookOpen}
            color="dark"
            placeholder="Masukkan nama mata kuliah"
            required
            {...register("nama_matkul", {
              required: "Nama mata kuliah wajib diisi",
            })}
            error={isSubmitted && errors.nama_matkul?.message}
          />

          {/* Nama Dosen */}
          <UserInput
            label="Nama Dosen"
            icon={Briefcase}
            color="dark"
            placeholder="Masukkan nama dosen mata kuliah"
            required
            {...register("nama_dosen", { required: "Nama dosen wajib diisi" })}
            error={isSubmitted && errors.nama_dosen?.message}
          />

          {/* Hari */}
          <UserInput
            label="Hari"
            icon={CalendarDays}
            color="dark"
            as="select"
            required
            {...register("hari", { required: "Hari wajib dipilih" })}
            error={isSubmitted && errors.hari?.message}
            options={[
              { value: "", label: "-- Pilih Hari --" },
              { value: "senin", label: "Senin" },
              { value: "selasa", label: "Selasa" },
              { value: "rabu", label: "Rabu" },
              { value: "kamis", label: "Kamis" },
              { value: "jumat", label: "Jumat" },
              { value: "sabtu", label: "Sabtu" },
            ]}
          />

          {/* Jam Mulai dan Selesai */}
          <div className="grid md:grid-cols-2 gap-5">
            <UserInput
              label="Jam Mulai"
              icon={Clock}
              color="dark"
              type="time"
              required
              {...register("jam_mulai", { required: "Jam mulai wajib diisi" })}
              error={isSubmitted && errors.jam_mulai?.message}
            />
            <UserInput
              label="Jam Selesai"
              icon={Clock}
              color="dark"
              type="time"
              required
              {...register("jam_selesai", {
                required: "Jam selesai wajib diisi",
              })}
              error={isSubmitted && errors.jam_selesai?.message}
            />
          </div>

          {/* Ruangan */}
          <UserInput
            label="Ruangan"
            icon={House}
            color="dark"
            placeholder="Contoh: Ruang A101"
            required
            {...register("ruangan", { required: "Ruangan wajib diisi" })}
            error={isSubmitted && errors.ruangan?.message}
          />

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
              onClick={() => navigate("/mahasiswa/courses")}
              className="px-6 py-3 rounded-xl border border-gray-300 text-dark font-medium transition bg-gray-100 hover:bg-gray-200"
            >
              Batal
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={isSubmitting || createCourseMutation.isLoading}
              className="px-6 py-3 rounded-xl bg-primary text-white font-medium hover:bg-primary/90 transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {createCourseMutation.isLoading || isSubmitting
                ? "Menambah..."
                : "Tambah Jadwal"}
            </motion.button>
          </div>
        </form>
      </div>
    </div>
  );
}
