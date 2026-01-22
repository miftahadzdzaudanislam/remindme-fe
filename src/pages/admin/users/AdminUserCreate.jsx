import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  User,
  Mail,
  Phone,
  GraduationCap,
  Lock,
  ArrowLeft,
  Hash,
  ShieldCheck,
} from "lucide-react";
import { motion } from "framer-motion";
import useDocumentTitle from "@/_hooks/utils/useDocumentTitle";
import UserInput from "@/components/ui/UserInput";

export default function AdminUserCreate() {
  useDocumentTitle("Tambah Mahasiswa");
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      navigate("/admin/users");
    }, 1000);
  };

  return (
    <div className="min-h-screen space-y-4 rounded-xl p-3 md:p-6">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => navigate("/admin/users")}
          className="group p-2 rounded-lg border border-transparent text-primary hover:bg-primary/10 hover:border-primary/20 transition-all duration-200"
        >
          <ArrowLeft
            size={20}
            className="transition-colors duration-200 group-hover:text-primary"
          />
        </motion.button>

        <div>
          <h1 className="flex items-center gap-2 md:gap-3 text-xl md:text-2xl font-bold text-primary">
            <span>Tambah Mahasiswa</span>
          </h1>
          <p className="text-sm text-gray-600">
            Tambah mahasiswa baru ke dalam sistem
          </p>
        </div>
      </div>

      {/* Form */}
      <div className="flex justify-center">
        <form
          onSubmit={handleSubmit}
          className="mx-5 w-full bg-white rounded-xl border border-gray-200 p-6 shadow-xl space-y-6 md:p-8 lg:w-3/4"
        >
          {/* Nama lengkap */}
          <UserInput
            label="Nama Lengkap"
            icon={User}
            color="dark"
            name="name"
            placeholder="Masukan nama lengkap"
            required
          />

          {/* Email & NIM */}
          <div className="grid md:grid-cols-2 gap-5">
            <UserInput
              label="Email"
              icon={Mail}
              color="dark"
              type="email"
              name="email"
              placeholder="email@example.com"
              required
            />
            <UserInput
              label="NIM"
              icon={Hash}
              color="dark"
              name="nim"
              placeholder="01123456789"
              required
            />
          </div>

          {/* Phone & Jurusan */}
          <div className="grid md:grid-cols-2 gap-5">
            <UserInput
              label="Nomor Telepon"
              icon={Phone}
              color="dark"
              type="tel"
              name="telepon"
              placeholder="62XXXXXXXXXX"
              required
            />
            <UserInput
              label="Jurusan"
              icon={GraduationCap}
              color="dark"
              as="select"
              name="jurusan"
              required
              options={[
                { value: "", label: "-- Pilih Jurusan --" },
                { value: "Teknik Informatika", label: "Teknik Informatika" },
                { value: "Sistem Informasi", label: "Sistem Informasi" },
                { value: "Bisnis Digital", label: "Bisnis Digital" },
              ]}
            />
          </div>

          {/* Role & Status */}
          <div className="grid md:grid-cols-2 gap-5">
            <UserInput
              label="Role"
              icon={ShieldCheck}
              color="dark"
              as="select"
              name="role"
              required
              options={[
                { value: "", label: "-- Pilih Role --" },
                { value: "admin", label: "Admin" },
                { value: "mahasiswa", label: "Mahasiswa" },
              ]}
            />
            <UserInput
              label="Status"
              color="dark"
              as="select"
              name="status"
              required
              options={[
                { value: "", label: "-- Pilih Status --" },
                { value: "active", label: "Aktif" },
                { value: "inactive", label: "Nonaktif" },
                { value: "suspended", label: "Suspended" },
              ]}
            />
          </div>

          {/* Password */}
          <div className="grid md:grid-cols-2 gap-5">
            <UserInput
              label="Password"
              icon={Lock}
              color="dark"
              type="password"
              name="password"
              placeholder="••••••••"
              required
              passwordSuffix
            />
            <UserInput
              label="Confirm Password"
              icon={Lock}
              color="dark"
              type="password"
              name="password_confirmation"
              placeholder="••••••••"
              required
              passwordSuffix
            />
          </div>

          {/* Actions */}
          <div className="flex flex-col-reverse md:flex-row justify-end gap-3 pt-4">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="button"
              onClick={() => navigate("/admin/users")}
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
              {loading ? "Menambah..." : "Tambah User"}
            </motion.button>
          </div>
        </form>
      </div>
    </div>
  );
}
