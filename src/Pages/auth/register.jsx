import { Link } from "react-router-dom";
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
} from "lucide-react";
import { useState } from "react";

const InputField = ({
  label,
  icon: Icon,
  name,
  type = "text",
  placeholder,
  value,
  onChange,
  children,
}) => (
  <div>
    <label className="block mb-2 text-sm font-medium text-white">
      {label}
    </label>
    <div className="relative">
      <Icon
        size={20}
        className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"
      />
      <input
        name={name}
        type={type}
        required
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="w-full pl-11 pr-10 py-3 bg-white/70 border border-white/40 rounded-lg focus:outline-none focus:ring-2 focus:ring-light/50 transition"
      />
      {children}
    </div>
  </div>
);

export default function Register() {
  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    nim: "",
    email: "",
    jurusan: "",
    phone_number: "62",
    password: "",
    password_confirmation: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "phone_number") {
      const val = value.startsWith("62") ? value : `62${value.replace(/^62*/, "")}`;
      setFormData((p) => ({ ...p, phone_number: val }));
      return;
    }

    setFormData((p) => ({ ...p, [name]: value }));
  };

  const togglePassword = () => setShowPassword((p) => !p);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-linear-to-br from-secondary to-blue-700 p-4 overflow-hidden">
      {/* Background */}
      <motion.div
        animate={{ scale: [1, 1.1, 1] }}
        transition={{ duration: 6, repeat: Infinity }}
        className="absolute -top-10 -left-10 h-40 w-40 bg-white/30 rounded-full blur-2xl"
      />
      <motion.div
        animate={{ scale: [1, 1.15, 1] }}
        transition={{ duration: 7, repeat: Infinity }}
        className="absolute bottom-0 right-0 h-56 w-56 bg-cyan-200/30 rounded-full blur-3xl"
      />

      {/* Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative z-10 w-full max-w-2xl rounded-2xl bg-light/30 backdrop-blur-xl border border-white/30 shadow-2xl p-8 space-y-6"
      >
        {/* Header */}
        <div className="text-center">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-white text-primary shadow-lg">
            <UserPlus size={28} />
          </div>
          <h1 className="text-3xl font-bold text-light">
            Create your account
          </h1>
          <p className="mt-2 text-sm text-dark">
            Enter your details below
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          <InputField
            label="Full Name"
            icon={User}
            name="name"
            placeholder="Enter your full name"
            value={formData.name}
            onChange={handleChange}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <InputField
              label="NIM"
              icon={Hash}
              name="nim"
              placeholder="01123456789"
              value={formData.nim}
              onChange={handleChange}
            />

            <InputField
              label="Email"
              icon={Mail}
              name="email"
              type="email"
              placeholder="email@example.com"
              value={formData.email}
              onChange={handleChange}
            />

            {/* Jurusan */}
            <div>
              <label className="block mb-2 text-sm font-medium text-white">
                Jurusan
              </label>
              <div className="relative">
                <GraduationCap
                  size={20}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"
                />
                <select
                  name="jurusan"
                  required
                  value={formData.jurusan}
                  onChange={handleChange}
                  className="w-full pl-11 pr-4 py-3 bg-white/70 border border-white/40 rounded-lg focus:ring-2 focus:ring-light/50 appearance-none"
                >
                  <option value="">-- Pilih Jurusan --</option>
                  <option value="Teknik Informatika">Teknik Informatika</option>
                  <option value="Sistem Informasi">Sistem Informasi</option>
                  <option value="Bisnis Digital">Bisnis Digital</option>
                </select>
              </div>
            </div>

            <InputField
              label="Phone Number"
              icon={Phone}
              name="phone_number"
              placeholder="62XXXXXXXXXX"
              value={formData.phone_number}
              onChange={handleChange}
            />

            {/* Password */}
            <InputField
              label="Password"
              icon={Lock}
              name="password"
              type={showPassword ? "text" : "password"}
              placeholder="••••••••"
              value={formData.password}
              onChange={handleChange}
            >
              <button
                type="button"
                onClick={togglePassword}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </InputField>

            <InputField
              label="Confirm Password"
              icon={Lock}
              name="password_confirmation"
              type={showPassword ? "text" : "password"}
              placeholder="••••••••"
              value={formData.password_confirmation}
              onChange={handleChange}
            />
          </div>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full rounded-lg bg-primary py-3 font-semibold text-white shadow-lg"
          >
            Create Account
          </motion.button>
        </form>

        {/* Footer */}
        <p className="text-center text-sm text-white/90">
          Already have an account?{" "}
          <Link to="/login" className="font-bold hover:underline">
            Log in
          </Link>
        </p>
      </motion.div>
    </div>
  );
}
