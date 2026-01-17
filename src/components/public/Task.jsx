import { motion } from "framer-motion";

export default function Task() {
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.3 },
    },
  };

  return (
    <section id="task" className="pt-24 pb-18 bg-white">
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
          Selamat datang, <span className="text-primary">Mahasiswa!</span>
        </motion.p>

        <motion.p
          className="text-center text-gray-500 mb-10"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          Tidak ada tugas yang tersedia.
        </motion.p>

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
          <motion.span
            variants={itemVariants}
            className="absolute -top-4 left-8 text-sm font-medium text-white bg-danger px-4 py-2 rounded-full inline-block z-10"
          >
            Prioritas Tinggi
          </motion.span>

          <motion.div
            variants={itemVariants}
            whileHover={{ y: -4 }}
            className="bg-light rounded-xl shadow p-10 border border-secondary/20 md:flex md:items-center mt-6 pt-10"
          >
            <div className="w-full md:w-1/2">
              <h4 className="text-xl font-bold">Judul Tugas</h4>
              <p className="text-gray-500 mt-2 hidden md:block">
                Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ullam quae aliquam molestias reiciendis ex iste mollitia delectus, perspiciatis architecto magnam omnis tempora aperiam deleniti deserunt in ratione? Mollitia, maiores reprehenderit.
              </p>
            </div>

            <div className="flex w-full md:w-1/2 gap-8 mt-4 md:mt-0 md:ms-8">
              <div className="w-1/2">
                <p className="text-sm text-gray-500">Mata Kuliah</p>
                <p className="font-medium">Pemrograman Web</p>
              </div>

              <div className="w-1/2">
                <p className="text-sm text-gray-500">Deadline</p>
                <p className="text-red-600 font-semibold">20 Juni 2026</p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}