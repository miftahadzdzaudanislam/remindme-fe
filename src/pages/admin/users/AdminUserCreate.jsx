import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAdminCreateUser } from "@/_hooks/useUsers";
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
import { useForm } from "react-hook-form";

export default function AdminUserCreate() {
  useDocumentTitle("Tambah Mahasiswa");
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [roleValue, setRoleValue] = useState("");
  const createUserMutation = useAdminCreateUser();

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitted, isSubmitting },
  } = useForm({
    mode: "onChange",
    defaultValues: {
      name: "",
      email: "",
      nim: "",
      telepon: "",
      jurusan: "",
      role: "",
      status: "",
      password: "",
      password_confirmation: "",
    },
  });

  // Pantau perubahan role
  const role = watch("role");

  useEffect(() => {
    setRoleValue(role);
    if (role === "admin") {
      setValue("status", "active");
    }
  }, [role, setValue]);

  const onSubmit = async (data) => {
    setError("");

    // Ambil FormData langsung dari form HTML
    const payload = new FormData();
    for (const key in data) {
      payload.append(key, data[key]);
    }

    // Validasi password konfirmasi
    if (payload.get("password") !== payload.get("password_confirmation")) {
      setError("Password tidak cocok");
      return;
    }

    await createUserMutation.mutateAsync(payload);
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
          onSubmit={handleSubmit(onSubmit)}
          className="mx-5 w-full bg-white rounded-xl border border-gray-200 p-6 shadow-xl space-y-6 md:p-8 lg:w-3/4"
        >
          {/* Nama lengkap */}
          <UserInput
            label="Nama Lengkap"
            icon={User}
            color="dark"
            placeholder="Masukan nama lengkap"
            required
            {...register("name", { required: "Nama lengkap wajib diisi" })}
            error={isSubmitted && errors.name?.message}
          />

          {/* Email & NIM */}
          <div className="grid md:grid-cols-2 gap-5">
            <UserInput
              label="Email"
              icon={Mail}
              color="dark"
              type="email"
              placeholder="email@example.com"
              required
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
              label="NIM"
              icon={Hash}
              color="dark"
              placeholder="01123456789"
              required
              inputMode="numeric"
              onInput={(e) =>
                (e.target.value = e.target.value.replace(/[^0-9]/g, ""))
              }
              {...register("nim", {
                required: "NIM wajib diisi",
                pattern: {
                  value: /^[0-9]{8,}$/,
                  message: "NIM harus angka minimal 8 digit",
                },
              })}
              error={isSubmitted && errors.nim?.message}
            />
          </div>

          {/* Phone & Jurusan */}
          <div className="grid md:grid-cols-2 gap-5">
            <UserInput
              label="Nomor Telepon"
              icon={Phone}
              color="dark"
              type="tel"
              placeholder="62XXXXXXXXXX"
              required
              inputMode="numeric"
              onInput={(e) =>
                (e.target.value = e.target.value.replace(/[^0-9]/g, ""))
              }
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
              label="Jurusan"
              icon={GraduationCap}
              color="dark"
              as="select"
              required
              {...register("jurusan", { required: "Jurusan wajib dipilih" })}
              error={isSubmitted && errors.jurusan?.message}
              options={[
                { value: "", label: "-- Pilih Jurusan --" },
                { value: "ti", label: "Teknik Informatika" },
                { value: "si", label: "Sistem Informasi" },
                { value: "bd", label: "Bisnis Digital" },
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
              required
              {...register("role", { required: "Role wajib dipilih" })}
              error={isSubmitted && errors.role?.message}
              options={[
                { value: "", label: "-- Pilih Role --" },
                { value: "mahasiswa", label: "Mahasiswa" },
                { value: "admin", label: "Admin" },
              ]}
            />
            <UserInput
              label="Status"
              color="dark"
              as="select"
              required
              disabled={roleValue === "admin"} // Status disabled jika admin
              {...register("status", { required: "Status wajib dipilih" })}
              error={isSubmitted && errors.status?.message}
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
              placeholder="••••••••"
              required
              passwordSuffix
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
              label="Confirm Password"
              icon={Lock}
              color="dark"
              type="password"
              placeholder="••••••••"
              required
              passwordSuffix
              {...register("password_confirmation", {
                required: "Konfirmasi password wajib diisi",
              })}
              error={isSubmitted && errors.password_confirmation?.message}
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
              onClick={() => navigate("/admin/users")}
              className="px-6 py-3 rounded-xl border border-gray-300 text-dark font-medium transition bg-gray-100 hover:bg-gray-200"
            >
              Batal
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={isSubmitting || createUserMutation.isLoading}
              className="px-6 py-3 rounded-xl bg-primary text-white font-medium hover:bg-primary/90 transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {createUserMutation.isLoading || isSubmitting
                ? "Menambah..."
                : "Tambah User"}
            </motion.button>
          </div>
        </form>
      </div>
    </div>
  );
}
