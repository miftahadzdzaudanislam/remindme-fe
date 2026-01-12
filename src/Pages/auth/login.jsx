import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Mail, Lock, Eye, EyeOff } from "lucide-react";
import { useState } from "react";

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle login logic here
  };

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-secondary to-blue-700 flex items-center justify-center p-4 overflow-hidden">
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

      {/* Login Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative z-10 w-full max-w-md bg-light/30 backdrop-blur-xl border border-white/30 rounded-2xl shadow-2xl p-8 space-y-6"
      >
        {/* Header */}
        <div className="text-center">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-white text-primary shadow-lg">
            <Lock size={28} />
          </div>
          <h1 className="text-3xl font-bold text-light">Welcome to RemindMe</h1>
          <p className="text-sm text-dark mt-2">Log in to your account</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Email */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-white mb-2">
              Email Address
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={20} />
              <input
                id="email"
                type="email"
                required
                autoFocus
                placeholder="name@example.com"
                className="w-full pl-11 pr-4 py-3 bg-white/70 border border-white/40 rounded-lg focus:outline-none focus:ring-2 focus:ring-light/50 transition"
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <div className="flex justify-between mb-2">
              <label htmlFor="password" className="text-sm font-medium text-white">
                Password
              </label>
              <Link to="/forgot-password" className="text-xs text-white/80 hover:text-white hover:underline">
                Forgot password?
              </Link>
            </div>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={20} />
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                required
                placeholder="••••••••"
                className="w-full pl-11 pr-11 py-3 bg-white/70 border border-white/40 rounded-lg focus:outline-none focus:ring-2 focus:ring-light/50 transition"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 transition"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          {/* Remember Me */}
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="remember"
              className="w-4 h-4 rounded border-2 border-white/60 bg-white/70 accent-primary focus:ring-2 focus:ring-white/50 cursor-pointer"
            />
            <label htmlFor="remember" className="text-sm text-white/90 cursor-pointer select-none">
              Remember me
            </label>
          </div>

          {/* Submit */}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            className="w-full bg-primary text-white py-3 rounded-lg font-semibold hover:bg-primary/90 transition shadow-lg"
          >
            Login
          </motion.button>
        </form>

        {/* Sign Up Link */}
        <p className="text-center text-sm text-white/90">
          Don't have an account?{" "}
          <Link to="/register" className="text-white font-bold hover:underline">
            Sign up
          </Link>
        </p>
      </motion.div>
    </div>
  );
}