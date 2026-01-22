import { Calendar, CheckSquare, TrendingUp } from "lucide-react";
import { motion } from "framer-motion";
import useDocumentTitle from "@/_hooks/utils/useDocumentTitle";
import StatCard from "@/components/ui/StatCard";
import KalenderMini from "@/components/ui/MiniCalendar";
import { DUMMY_COURSES, DUMMY_TASKS } from "@/utils/dataDummy";
import { formatDate, getTodayIndonesian } from "@/utils/dateFormatter";
import { useMemo } from "react";

export default function MahasiswaDashboard() {
  useDocumentTitle("Dashboard Mahasiswa");

  const userId = 2; // User ID yang sedang login

  // Filter data untuk user yang sedang login
  const userTasks = DUMMY_TASKS.filter((task) => task.user_id === userId);
  const userCourses = DUMMY_COURSES.filter(
    (course) => course.user_id === userId,
  );

  // Hitung progress tugas
  const taskProgress = useMemo(() => {
    if (userTasks.length === 0) return 0;

    const completedTasks = userTasks.filter((task) => task.is_done).length;
    return Math.round((completedTasks / userTasks.length) * 100);
  }, [userTasks]);

  // Dapatkan tugas terdekat (belum selesai, diurutkan berdasarkan deadline)
  const upcomingTasks = useMemo(() => {
    return userTasks
      .filter((task) => !task.is_done)
      .sort((a, b) => new Date(a.deadline) - new Date(b.deadline))
      .slice(0, 2);
  }, [userTasks]);

  // Dapatkan jadwal hari ini
  const todaySchedule = useMemo(() => {
    const today = getTodayIndonesian();
    return userCourses.filter((course) => course.hari === today);
  }, [userCourses]);

  return (
    <>
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
                Kamu sudah menyelesaikan {taskProgress}% tugas.
              </p>
              <div className="w-full bg-indigo-200 rounded-full h-2">
                <div
                  className="bg-indigo-800 h-2 rounded-full transition-all duration-500"
                  style={{ width: `${taskProgress}%` }}
                ></div>
              </div>
              <p className="text-xs opacity-75">
                {userTasks.filter((t) => t.is_done).length} dari{" "}
                {userTasks.length} tugas selesai
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
                upcomingTasks.map((task) => {
                  const course = DUMMY_COURSES.find(
                    (c) => c.id === task.course_id,
                  );
                  return (
                    <div key={task.id} className="bg-yellow-50 p-2 rounded-lg">
                      <p className="font-semibold text-sm">{task.nama_tugas}</p>
                      <p className="text-xs opacity-75">
                        {course?.nama_matkul} <br /> Deadline:{" "}
                        {formatDate(task.deadline)}
                      </p>
                    </div>
                  );
                })
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
                      {course.jam_mulai} - {course.jam_selesai} |{" "}
                      {course.ruangan}
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

        <KalenderMini tugas={userTasks} />
      </motion.div>
    </>
  );
}
