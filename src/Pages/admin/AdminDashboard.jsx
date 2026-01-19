import { BookOpen, CheckSquare, ClipboardList, Users } from "lucide-react";
import { motion } from "framer-motion";
import useDocumentTitle from "@/_hooks/utils/useDocumentTitle";
import StatCard from "@/components/ui/statCard";
import Badge from "@/components/ui/badge";

export default function AdminDashboard() {
  useDocumentTitle("Dashboard Admin");

  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{
          opacity: 1,
          transition: { staggerChildren: 0.15 },
        }}
        className="min-h-screen space-y-6 rounded-xl p-6"
      >
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-2xl font-bold text-primary"
        >
          🛠️ Dashboard Admin
        </motion.h1>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          <StatCard
            icon={Users}
            title="Total Mahasiswa"
            value="150"
            color="border-indigo-300 bg-indigo-100 text-indigo-900"
          />

          <StatCard
            icon={BookOpen}
            title="Total Mata Kuliah"
            value="42"
            color="border-yellow-300 bg-yellow-100 text-yellow-800"
          />

          <StatCard
            icon={CheckSquare}
            title="Total Tugas"
            value="1,234"
            color="border-emerald-300 bg-emerald-100 text-emerald-800"
          />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-2xl border border-gray-300 bg-white p-6 shadow-md"
        >
          <div className="mb-4 flex items-center gap-3">
            <ClipboardList className="h-6 w-6 text-primary" />
            <h2 className="text-xl font-semibold text-primary">
              Login Terbaru
            </h2>
          </div>

          <div className="max-h-72 space-y-4 overflow-y-auto pr-2">
            <p className="text-center text-gray-500">
              Belum ada aktivitas Login.
            </p>

            <div className="space-y-1 rounded-lg bg-light p-5 hover:bg-primary/10">
              <div className="flex items-center justify-between gap-4">
                <div className="space-y-1">
                  <div className="text-sm font-semibold capitalize text-gray-800">
                    admin
                  </div>
                  <div className="text-xs text-gray-500">admin@gmail.com</div>
                  <div className="text-sm text-gray-600">
                    Terakhir Login: 10 Okt 2025
                  </div>
                </div>

                <Badge value="Admin" variant={"danger"} size="md" />
              </div>
            </div>

            <div className="space-y-1 rounded-lg bg-light p-5 hover:bg-primary/10">
              <div className="flex items-center justify-between gap-4">
                <div className="space-y-1">
                  <div className="text-sm font-semibold capitalize text-gray-800">
                    admin
                  </div>
                  <div className="text-xs text-gray-500">admin@gmail.com</div>
                  <div className="text-sm text-gray-600">
                    Terakhir Login: 10 Okt 2025
                  </div>
                </div>

                <Badge value="Admin" variant={"danger"} size="md" />
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </>
  );
}
