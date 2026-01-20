import { Calendar, CheckSquare, TrendingUp } from "lucide-react";
import { motion } from "framer-motion";
import useDocumentTitle from "@/_hooks/utils/useDocumentTitle";
import StatCard from "@/components/ui/StatCard_temp";

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.15 },
  },
};

export default function MahasiswaDashboard() {
  useDocumentTitle("Dashboard Mahasiswa");

  return (
    <>
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-3xl font-bold text-indigo-800"
      >
        🎓 Dashboard Mahasiswa
      </motion.h1>

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 gap-6 md:grid-cols-3"
      >
        {/* Progress Tugas */}
        <StatCard
          icon={TrendingUp}
          title="📊 Progress Tugas"
          color="border-indigo-300 bg-indigo-100 text-indigo-900"
        >
          <div className="w-full bg-indigo-200 rounded-full h-2">
            <p className="w-full">Kamu sudah menyelesaikan 0% tugas.</p>
            <div
              className="bg-indigo-600 h-2 rounded-full"
              style={{ width: "0%" }}
            ></div>
          </div>
        </StatCard>

        {/* Tugas Terdekat */}
        <StatCard
          icon={CheckSquare}
          title="📌 Tugas Terdekat"
          color="border-yellow-300 bg-yellow-100 text-yellow-800"
        >
          <div className="space-y-2">
            <div className="bg-yellow-50 p-2 rounded-lg">
              <p className="font-semibold text-sm">Tugas 2</p>
              <p className="text-xs opacity-75">Deadline: 15/1/2026</p>
            </div>
            <div className="bg-yellow-50 p-2 rounded-lg">
              <p className="font-semibold text-sm">Tugas 1</p>
              <p className="text-xs opacity-75">Deadline: 19/1/2026</p>
            </div>
          </div>
        </StatCard>

        {/* Jadwal Hari Ini */}
        <StatCard
          icon={Calendar}
          title="📅 Jadwal Hari Ini"
          color="border-emerald-300 bg-emerald-100 text-emerald-800"
        >
          <div>
            <p>Tidak ada jadwal hari ini.</p>
          </div>
        </StatCard>
      </motion.div>
    </>
  );
}
