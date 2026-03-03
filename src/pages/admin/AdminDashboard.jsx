import { BookOpen, CheckSquare, ClipboardList, Users } from "lucide-react";
import { motion } from "framer-motion";
import useDocumentTitle from "@/_hooks/utils/useDocumentTitle";
import StatCard from "@/components/ui/StatCard";
import Badge from "@/components/ui/Badge";
import { formatTimeAgo } from "@/utils/dateFormatter";
import { useAdminDashboard } from "@/_hooks/useDashboard";

export default function AdminDashboard() {
  useDocumentTitle("Dashboard Admin");

  const { data, isLoading, error } = useAdminDashboard();

  // Default value jika data belum ada
  const summary = data || {};
  const recentLogins = data?.last_login_users || [];

  const STATS = [
    {
      icon: Users,
      title: "Total Mahasiswa",
      value: summary.total_mahasiswa ?? 0,
      color: "border-indigo-300 bg-indigo-100 text-indigo-900",
    },
    {
      icon: BookOpen,
      title: "Total Mata Kuliah",
      value: summary.total_courses ?? 0,
      color: "border-yellow-300 bg-yellow-100 text-yellow-800",
    },
    {
      icon: CheckSquare,
      title: "Total Tugas",
      value: summary.total_tasks ?? 0,
      color: "border-emerald-300 bg-emerald-100 text-emerald-800",
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, transition: { staggerChildren: 0.15 } }}
      className="min-h-screen space-y-6 rounded-xl p-6"
    >
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center gap-4 text-2xl font-bold text-primary"
      >
        🛠️ Dashboard Admin
      </motion.h1>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        {STATS.map((stat, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <StatCard
              icon={stat.icon}
              title={stat.title}
              value={stat.value.toLocaleString()}
              color={stat.color}
            />
          </motion.div>
        ))}
      </div>

      {/* Recent Login Activity */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="rounded-2xl border border-gray-300 bg-white p-6 shadow-md"
      >
        <div className="mb-4 flex items-center gap-3">
          <ClipboardList className="h-6 w-6 text-primary" />
          <h2 className="text-xl font-semibold text-primary">Login Terbaru</h2>
        </div>

        {isLoading ? (
          <div className="text-center text-gray-500">Memuat data...</div>
        ) : error ? (
          <div className="text-center text-red-500">
            Gagal memuat data dashboard.
          </div>
        ) : (
          <div className="max-h-72 space-y-4 overflow-y-auto pr-2">
            {recentLogins.length === 0 ? (
              <p className="text-center text-gray-500">
                Belum ada aktivitas Login.
              </p>
            ) : (
              recentLogins.map((user) => (
                <motion.div
                  key={user.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="space-y-1 rounded-lg bg-light p-5 transition hover:bg-primary/10"
                >
                  <div className="flex items-center justify-between gap-4">
                    <div className="space-y-1">
                      <div className="text-sm font-semibold capitalize text-gray-800">
                        {user.name}
                      </div>
                      <div className="text-xs text-gray-500">{user.email}</div>
                      <div className="text-sm text-gray-600">
                        Terakhir Login: {formatTimeAgo(user.terakhir_login)}
                      </div>
                    </div>
                    <Badge
                      value={user.role}
                      variant={user.role === "admin" ? "danger" : "info"}
                      size="md"
                    />
                  </div>
                </motion.div>
              ))
            )}
          </div>
        )}
      </motion.div>
    </motion.div>
  );
}
