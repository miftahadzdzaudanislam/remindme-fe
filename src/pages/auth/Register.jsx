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
  Eye,
  EyeOff,
  ArrowLeft,
} from "lucide-react";
import useDocumentTitle from "@/_hooks/utils/useDocumentTitle";
import UserInput from "@/components/ui/UserInput";

export default function Register() {
  useDocumentTitle("Register");

  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle register logic
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
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => navigate("/login")}
          className="absolute top-6 left-6 z-20 flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur-sm border border-white/30 rounded-lg text-white hover:bg-white/30 transition"
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
            <h1 className="text-3xl font-bold text-light">
              Buat Akun
            </h1>
            <p className="text-sm text-white mt-2">Masukan data dibawah ini</p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            <UserInput
              label="Nama Lengkap"
              icon={User}
              name="name"
              placeholder="Masukan nama lengkap anda"
              required
            />

            <div className="grid md:grid-cols-2 gap-5">
              <UserInput
                label="NIM"
                icon={Hash}
                name="nim"
                placeholder="01123456789"
                required
              />

              <UserInput
                label="Email"
                icon={Mail}
                type="email"
                name="email"
                placeholder="email@example.com"
                required
              />

              <UserInput
                label="Jurusan"
                icon={GraduationCap}
                as="select"
                name="jurusan"
                required
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
                name="telepon"
                placeholder="62XXXXXXXXXX"
                required
              />

              <UserInput
                label="Password"
                icon={Lock}
                type="password"
                name="password"
                placeholder="••••••••"
                required
                passwordSuffix
              />

              <UserInput
                label="Konfirmasi Password"
                icon={Lock}
                type="password"
                name="password_confirmation"
                placeholder="••••••••"
                required
                passwordSuffix
              />
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              className="w-full bg-primary text-white py-3 rounded-lg font-semibold hover:bg-primary/90 transition shadow-lg"
            >
              Buat Akun
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
