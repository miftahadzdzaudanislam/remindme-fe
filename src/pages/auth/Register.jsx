import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Mail,
  Lock,
  UserPlus,
  User,
  Phone,
  GraduationCap,
  Hash,
  ArrowLeft,
  AlertCircle,
} from "lucide-react";
import useDocumentTitle from "@/_hooks/utils/useDocumentTitle";
import UserInput from "@/components/ui/UserInput";
import { useForm } from "react-hook-form";
import { useRegister } from "@/_hooks/useAuth";
import { useEffect } from "react";

export default function Register() {
  useDocumentTitle("Register");
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitted },
    watch,
    resetField,
  } = useForm({
    defaultValues: {
      name: "",
      nim: "",
      email: "",
      jurusan: "",
      telepon: "",
      password: "",
      password_confirmation: "",
    },
    mode: "onSubmit",
    reValidateMode: "onChange",
  });

  const registerMutation = useRegister();
  const { isPending, isError, error } = registerMutation;
  const password = watch("password");

  // Reset password fields saat register gagal
  useEffect(() => {
    if (isError) {
      resetField("password");
      resetField("password_confirmation");
    }
  }, [isError, resetField]);

  const onSubmit = (data) => {
    registerMutation.mutate(data);
  };

  return (
    <>
      <div className="relative min-h-screen flex items-center justify-center bg-linear-to-br from-secondary to-blue-700 p-4 overflow-hidden">
        {/* Background Ornaments */}
        <motion.div
          animate={{ opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute -top-10 -left-10 h-60 w-60 bg-white/30 rounded-full blur-2xl"
        />
        <motion.div
          animate={{ opacity: [0.2, 0.9, 0.2] }}
          transition={{ duration: 3, repeat: Infinity }}
          className="absolute bottom-0 right-0 h-56 w-56 bg-cyan-200/30 rounded-full blur-3xl"
        />

        {/* Back Button */}
        <motion.button
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => navigate("/login")}
          disabled={isPending}
          className="absolute top-6 left-6 z-20 flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur-sm border border-white/30 rounded-lg text-white hover:bg-white/30 transition disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <ArrowLeft size={18} />
          <span className="text-sm font-medium">Kembali ke Login</span>
        </motion.button>

        {/* Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative z-10 w-full max-w-2xl bg-light/30 backdrop-blur-xl border border-white/30 rounded-2xl shadow-2xl p-8 space-y-6"
        >
          {/* Header */}
          <div className="text-center">
            <div className="mx-auto mb-4 h-14 w-14 flex items-center justify-center rounded-full bg-white text-primary shadow-lg">
              <UserPlus size={28} />
            </div>
            <h1 className="text-3xl font-bold text-light">Buat Akun</h1>
            <p className="text-sm text-white mt-2">Masukan data dibawah ini</p>
          </div>

          {/* Error Server */}
          {isError && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-start gap-3 bg-red-500/20 border border-red-400/50 rounded-lg p-4"
            >
              <AlertCircle size={20} className="text-red-300 mt-0.5 shrink-0" />
              <div className="flex-1">
                <p className="text-red-200 text-sm font-medium">
                  {error?.response?.data?.message ||
                    error?.message ||
                    "Registrasi gagal. Silakan coba lagi."}
                </p>
              </div>
            </motion.div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            <UserInput
              label="Nama Lengkap"
              icon={User}
              type="text"
              placeholder="Masukan nama lengkap anda"
              disabled={isPending}
              {...register("name", { required: "Nama lengkap wajib diisi" })}
              error={isSubmitted && errors.name?.message}
            />

            <div className="grid md:grid-cols-2 gap-5">
              <UserInput
                label="NIM"
                icon={Hash}
                type="text"
                placeholder="01123456789"
                disabled={isPending}
                {...register("nim", {
                  required: "NIM wajib diisi",
                  pattern: {
                    value: /^[0-9]{8,}$/,
                    message: "NIM harus angka minimal 8 digit",
                  },
                })}
                error={isSubmitted && errors.nim?.message}
              />

              <UserInput
                label="Email"
                icon={Mail}
                type="email"
                placeholder="email@example.com"
                disabled={isPending}
                {...register("email", {
                  required: "Email wajib diisi",
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "Email tidak valid",
                  },
                })}
                error={isSubmitted && errors.email?.message}
              />

              <UserInput
                label="Jurusan"
                icon={GraduationCap}
                as="select"
                disabled={isPending}
                {...register("jurusan", { required: "Jurusan wajib dipilih" })}
                error={isSubmitted && errors.jurusan?.message}
                options={[
                  { value: "", label: "-- Pilih Jurusan --" },
                  { value: "ti", label: "Teknik Informatika" },
                  { value: "si", label: "Sistem Informasi" },
                  { value: "bd", label: "Bisnis Digital" },
                ]}
              />

              <UserInput
                label="Nomor Telepon"
                icon={Phone}
                type="tel"
                placeholder="62XXXXXXXXXX"
                disabled={isPending}
                {...register("telepon", {
                  required: "Nomor telepon wajib diisi",
                  pattern: {
                    value: /^62[0-9]{9,12}$/,
                    message: "Telepon di awali dengan 62 dan 11-14 digit",
                  },
                })}
                error={isSubmitted && errors.telepon?.message}
              />

              <UserInput
                label="Password"
                icon={Lock}
                type="password"
                placeholder="••••••••"
                passwordSuffix
                disabled={isPending}
                {...register("password", {
                  required: "Password wajib diisi",
                  minLength: {
                    value: 8,
                    message: "Password minimal 8 karakter",
                  },
                })}
                error={isSubmitted && errors.password?.message}
              />

              <UserInput
                label="Konfirmasi Password"
                icon={Lock}
                type="password"
                placeholder="••••••••"
                passwordSuffix
                disabled={isPending}
                {...register("password_confirmation", {
                  required: "Konfirmasi password wajib diisi",
                  validate: (value) =>
                    value === password || "Password tidak cocok",
                })}
                error={isSubmitted && errors.password_confirmation?.message}
              />
            </div>

            <motion.button
              whileHover={{ scale: !isPending ? 1.02 : 1 }}
              whileTap={{ scale: !isPending ? 0.98 : 1 }}
              type="submit"
              disabled={isPending}
              className="w-full bg-primary text-white py-3 rounded-lg font-semibold hover:bg-primary/90 transition shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isPending ? (
                <div className="flex items-center justify-center gap-2">
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Loading...
                </div>
              ) : (
                "Buat Akun"
              )}
            </motion.button>
          </form>

          <p className="text-center text-sm text-white/90">
            Sudah punya akun?{" "}
            <Link to="/login" className="font-bold text-white hover:underline">
              Log in
            </Link>
          </p>
        </motion.div>
      </div>
    </>
  );
}
