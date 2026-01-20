import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { motion } from "framer-motion";

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="relative flex min-h-[calc(100vh-160px)] flex-col items-center justify-center overflow-hidden px-6 py-16">
      {/* Dekorasi */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1 }}
        className="pointer-events-none absolute -z-10 left-10 -top-20 h-60 w-60 rounded-full border-2 border-primary/20"
      />
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, delay: 0.2 }}
        className="pointer-events-none absolute -z-10 right-16 -bottom-24 h-80 w-80 rounded-full border-2 border-secondary/20"
      />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2 }}
        className="pointer-events-none absolute -z-10 left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-primary/10"
      />

      {/* Content */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md text-center"
      >
        <motion.h1
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 120 }}
          className="mb-2 text-8xl font-extrabold leading-none text-primary"
        >
          404
        </motion.h1>

        <h2 className="mb-6 text-xl font-semibold text-secondary">
          Halaman tidak ditemukan
        </h2>

        {/* Ilustrasi */}
        <motion.div
          initial={{ opacity: 0, rotate: -5 }}
          animate={{ opacity: 1, rotate: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mx-auto mb-8 h-36 w-52"
        >
          <svg viewBox="0 0 260 180" className="h-full w-full">
            <defs>
              <linearGradient id="grad" x1="0" x2="1">
                <stop offset="0%" stopColor="#3B76BA" />
                <stop offset="100%" stopColor="#1E63B0" />
              </linearGradient>
            </defs>
            <rect
              x="10"
              y="30"
              width="240"
              height="120"
              rx="14"
              fill="url(#grad)"
              opacity="0.18"
            />
            <g stroke="#1E63B0" strokeWidth="6" strokeLinecap="round">
              <path d="M60 70 L40 100 H80 L60 130" fill="none" />
              <path d="M200 70 L180 100 H220 L200 130" fill="none" />
            </g>
            <circle
              cx="130"
              cy="100"
              r="20"
              fill="none"
              stroke="#3B76BA"
              strokeWidth="6"
            />
          </svg>
        </motion.div>

        <p className="mb-8 text-gray-600">
          Maaf, kami tidak dapat menemukan halaman yang kamu minta.
        </p>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => navigate("/")}
          className="inline-flex items-center rounded-lg bg-primary px-5 py-3 font-medium text-white transition hover:bg-secondary"
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
