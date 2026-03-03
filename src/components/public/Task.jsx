import { useMahasiswaTask } from "@/_hooks/useTasks";
import { useCurrentUser } from "@/_hooks/useAuth";
import { motion } from "framer-motion";
import Badge from "@/components/ui/Badge";
import { formatDate } from "@/utils/dateFormatter";

export default function Task() {
  const { data: user, isLoading: isUserLoading } = useCurrentUser();

  const {
    tasks = [],
    isLoading,
    isError,
  } = useMahasiswaTask({ page: 1, limit: 3 });

  // Tunggu user profile selesai diambil dulu
  if (isUserLoading) return null;

  // Hanya tampil untuk mahasiswa
  if (user?.role !== "mahasiswa") return null;

  return (
    <section id="task" className="pt-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <h6 className="text-sm font-bold uppercase tracking-wider text-secondary">
            Schedule
          </h6>
          <h2 className="text-3xl font-bold mt-2 text-primary">
            Upcoming Task
          </h2>
        </motion.div>

        <motion.p
          className="text-center text-xl font-semibold mb-10"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          Selamat datang, <span className="text-primary">{user?.name}!</span>
        </motion.p>

        {isLoading ? (
          <motion.p
            className="text-center text-gray-500 mb-10"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            Memuat tugas...
          </motion.p>
        ) : isError ? (
          <motion.p
            className="text-center text-danger mb-10"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            Gagal memuat tugas.
          </motion.p>
        ) : tasks.length === 0 ? (
          <motion.p
            className="text-center text-gray-500 mb-10"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            Tidak ada tugas yang tersedia.
          </motion.p>
        ) : (
          <motion.div
            initial="hidden"
            whileInView="visible"
            variants={{
              visible: {
                transition: {
                  staggerChildren: 0.1,
                },
              },
            }}
            viewport={{ once: true }}
            className="relative"
          >
            {tasks.map((task) => {
              let badgeVariant = "info";
              let badgeText = "Prioritas Rendah";
              if (task.prioritas === "high") {
                badgeVariant = "danger";
                badgeText = "Prioritas Tinggi";
              } else if (task.prioritas === "medium") {
                badgeVariant = "warning";
                badgeText = "Prioritas Sedang";
              }

              return (
                <motion.div
                  key={task.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{
                    opacity: 1,
                    y: 0,
                    transition: { duration: 0.3 },
                  }}
                  whileHover={{ y: -4 }}
                  className="bg-light rounded-xl shadow p-10 border border-secondary/20 md:flex md:items-center mt-10 pt-10 relative md:mt-8"
                >
                  <span className="absolute -top-4 left-8 z-10">
                    <Badge value={badgeText} variant={badgeVariant} size="lg" />
                  </span>
                  <div className="w-full md:w-1/2">
                    <h4 className="text-xl font-bold">{task.nama_tugas}</h4>
                    <p className="text-gray-500 mt-2 hidden md:block">
                      {task.deskripsi || "-"}
                    </p>
                  </div>
                  <div className="flex w-full md:w-1/2 gap-8 mt-4 md:mt-0 md:ms-8">
                    <div className="w-1/2">
                      <p className="text-sm text-gray-500">Mata Kuliah</p>
                      <p className="font-medium">
                        {task.course?.nama_matkul || "-"}
                      </p>
                    </div>
                    <div className="w-1/2">
                      <p className="text-sm text-gray-500">Deadline</p>
                      <p className="text-red-600 font-semibold">
                        {task.deadline ? formatDate(task.deadline) : "-"}
                      </p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        )}
      </div>
    </section>
  );
}
