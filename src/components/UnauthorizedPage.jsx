import { useNavigate } from "react-router-dom";
import { ArrowLeft, Lock } from "lucide-react";
import { motion } from "framer-motion";

export default function Unauthorized() {
  const navigate = useNavigate();

  return (
    <div className="relative flex min-h-[calc(100vh-160px)] flex-col items-center justify-center overflow-hidden px-6 py-16">
      {/* Dekorasi */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1 }}
        className="pointer-events-none absolute -z-10 left-10 -top-20 h-60 w-60 rounded-full border-2 border-danger/20"
      />
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, delay: 0.2 }}
        className="pointer-events-none absolute -z-10 right-16 -bottom-24 h-80 w-80 rounded-full border-2 border-danger/20"
      />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2 }}
        className="pointer-events-none absolute -z-10 left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-danger/10"
      />

      {/* Content */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md text-center"
      >
        <motion.div
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 120 }}
          className="mb-2 flex justify-center"
        >
          <Lock size={64} className="text-danger" />
        </motion.div>

        <h2 className="mb-2 text-8xl font-extrabold leading-none text-danger">
          403
        </h2>

        <h3 className="mb-6 text-xl font-semibold text-danger">
          Akses Ditolak
        </h3>

        <motion.div
          initial={{ opacity: 0, rotate: -5 }}
          animate={{ opacity: 1, rotate: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mx-auto mb-8 h-24 w-24"
        >
          {/* Ilustrasi kunci */}
          <svg viewBox="0 0 96 96" className="h-full w-full">
            <circle cx="48" cy="56" r="28" fill="#fee2e2" />
            <rect x="32" y="44" width="32" height="28" rx="8" fill="#f87171" />
            <circle cx="48" cy="58" r="6" fill="#fff" />
            <rect x="44" y="34" width="8" height="14" rx="4" fill="#f87171" />
          </svg>
        </motion.div>

        <p className="mb-8 text-gray-600">
          Anda tidak memiliki izin untuk mengakses halaman ini.
        </p>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => navigate("/")}
          className="inline-flex items-center rounded-lg bg-danger px-5 py-3 font-medium text-white transition hover:bg-danger-hover"
        >
          <ArrowLeft size={18} className="mr-2 -ml-1" />
          Kembali ke Beranda
        </motion.button>
      </motion.div>

      {/* Footer */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 text-sm text-gray-500"
      >
        © 2026 - RemindMe.v2
      </motion.p>
    </div>
  );
}
