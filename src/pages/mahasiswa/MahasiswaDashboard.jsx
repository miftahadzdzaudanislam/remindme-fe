import { Calendar, CheckSquare, TrendingUp } from "lucide-react";
import { motion } from "framer-motion";
import useDocumentTitle from "@/_hooks/utils/useDocumentTitle";
import StatCard from "@/components/ui/StatCard";
import KalenderMini from "@/components/ui/MiniCalendar";
import { formatDate, formatHours } from "@/utils/dateFormatter";
import { useMahasiswaDashboard } from "@/_hooks/useDashboard";

export default function MahasiswaDashboard() {
  useDocumentTitle("Dashboard Mahasiswa");

  const { data, isLoading, error } = useMahasiswaDashboard();

  // Ambil data dari response API
  const summary = data?.task_progress ?? { total: 0, done: 0, progress: 0 };
  const upcomingTasks = data?.upcoming_tasks ?? [];
  const todaySchedule = data?.today_courses ?? [];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, transition: { staggerChildren: 0.15 } }}
      className="min-h-screen space-y-6 rounded-xl p-6"
    >
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-2xl font-bold text-primary"
      >
        🎓 Dashboard Mahasiswa
      </motion.h1>

      {isLoading ? (
        <div className="text-center text-gray-500">Memuat data...</div>
      ) : error ? (
        <div className="text-center text-red-500">
          Gagal memuat data dashboard.
        </div>
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, transition: { staggerChildren: 0.15 } }}
          className="grid grid-cols-1 gap-6 md:grid-cols-3"
        >
          {/* Progress Tugas */}
          <StatCard
            icon={TrendingUp}
            title="Progress Tugas"
            color="border-indigo-300 bg-indigo-100 text-indigo-900"
          >
            <div className="space-y-2">
              <p className="text-sm">
                Kamu sudah menyelesaikan {summary.progress ?? 0}% tugas.
              </p>
              <div className="w-full bg-indigo-200 rounded-full h-2">
                <div
                  className="bg-indigo-800 h-2 rounded-full transition-all duration-500"
                  style={{ width: `${summary.progress ?? 0}%` }}
                ></div>
              </div>
              <p className="text-xs opacity-75">
                {summary.done ?? 0} dari {summary.total ?? 0} tugas selesai
              </p>
            </div>
          </StatCard>

          {/* Tugas Terdekat */}
          <StatCard
            icon={CheckSquare}
            title="Tugas Terdekat"
            color="border-yellow-300 bg-yellow-100 text-yellow-800"
          >
            <div className="space-y-2">
              {upcomingTasks.length > 0 ? (
                upcomingTasks.map((task) => (
                  <div key={task.id} className="bg-yellow-50 p-2 rounded-lg">
                    <p className="font-semibold text-sm">{task.nama_tugas}</p>
                    <p className="text-xs opacity-75">
                      {task.nama_matkul} Deadline: {formatDate(task.deadline)}
                    </p>
                  </div>
                ))
              ) : (
                <p className="text-sm">Tidak ada tugas yang belum selesai.</p>
              )}
            </div>
          </StatCard>

          {/* Jadwal Hari Ini */}
          <StatCard
            icon={Calendar}
            title="Jadwal Hari Ini"
            color="border-emerald-300 bg-emerald-100 text-emerald-800"
          >
            <div className="space-y-2">
              {todaySchedule.length > 0 ? (
                todaySchedule.map((course) => (
                  <div key={course.id} className="bg-emerald-50 p-2 rounded-lg">
                    <p className="font-semibold text-sm">
                      {course.nama_matkul}
                    </p>
                    <p className="text-xs opacity-75">
                      {formatHours(course.jam_mulai)} -{" "}
                      {formatHours(course.jam_selesai)} WIB | {course.ruangan}
                    </p>
                    <p className="text-xs opacity-75">{course.nama_dosen}</p>
                  </div>
                ))
              ) : (
                <p className="text-sm">Tidak ada jadwal hari ini.</p>
              )}
            </div>
          </StatCard>
        </motion.div>
      )}

      {/* KalenderMini bisa diisi dengan upcomingTasks jika ingin */}
      <KalenderMini tugas={upcomingTasks} />
    </motion.div>
  );
}
