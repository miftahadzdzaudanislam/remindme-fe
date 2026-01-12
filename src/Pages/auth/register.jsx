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
import { useState } from "react";
import InputFieldAuth from "../../components/ui/input";

export default function Register() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle register logic
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-linear-to-br from-secondary to-blue-700 p-4 overflow-hidden">
      {/* Background Ornaments */}
      <motion.div
        animate={{ opacity: [0.3, 0.5, 0.3] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute -top-10 -left-10 h-40 w-40 bg-white/30 rounded-full blur-2xl"
      />
      <motion.div
        animate={{ opacity: [0.2, 0.4, 0.2] }}
        transition={{ duration: 3, repeat: Infinity }}
        className="absolute bottom-0 right-0 h-56 w-56 bg-cyan-200/30 rounded-full blur-3xl"
      />

      {/* Back Button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => navigate("/")}
        className="absolute top-6 left-6 z-20 flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur-sm border border-white/30 rounded-lg text-white hover:bg-white/30 transition"
      >
        <ArrowLeft size={18} />
        <span className="text-sm font-medium">Back to Home</span>
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
          <h1 className="text-3xl font-bold text-light">Create your account</h1>
          <p className="text-sm text-dark mt-2">Enter your details below</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          <InputFieldAuth
            label="Full Name"
            icon={User}
            name="name"
            placeholder="Enter your full name"
            required
          />

          <div className="grid md:grid-cols-2 gap-5">
            <InputFieldAuth
              label="NIM"
              icon={Hash}
              name="nim"
              placeholder="01123456789"
              required
            />

            <InputFieldAuth
              label="Email"
              icon={Mail}
              type="email"
              name="email"
              placeholder="email@example.com"
              required
            />

            <InputFieldAuth label="Jurusan" icon={GraduationCap}>
              <select
                name="jurusan"
                className="w-full pl-11 pr-10 py-3 bg-white/70 border border-white/40 rounded-lg focus:outline-none focus:ring-2 focus:ring-light/50 transition appearance-none"
                required
              >
                <option value="">-- Pilih Jurusan --</option>
                <option value="Teknik Informatika">Teknik Informatika</option>
                <option value="Sistem Informasi">Sistem Informasi</option>
                <option value="Bisnis Digital">Bisnis Digital</option>
              </select>
            </InputFieldAuth>

            <InputFieldAuth
              label="Phone Number"
              icon={Phone}
              type="number"
              name="phone_number"
              placeholder="62XXXXXXXXXX"
              required
            />

            <InputFieldAuth
              label="Password"
              icon={Lock}
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="••••••••"
              required
            >
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="••••••••"
                className="w-full pl-11 pr-10 py-3 bg-white/70 border border-white/40 rounded-lg focus:outline-none focus:ring-2 focus:ring-light/50 transition"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 transition"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </InputFieldAuth>

            <InputFieldAuth
              label="Confirm Password"
              icon={Lock}
              type={showPassword ? "text" : "password"}
              name="password_confirmation"
              placeholder="••••••••"
              required
            />
          </div>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            className="w-full bg-primary text-white py-3 rounded-lg font-semibold hover:bg-primary/90 transition shadow-lg"
          >
            Create Account
          </motion.button>
        </form>

        <p className="text-center text-sm text-white/90">
          Already have an account?{" "}
          <Link to="/login" className="font-bold text-white hover:underline">
            Log in
          </Link>
        </p>
      </motion.div>
    </div>
  );
}
