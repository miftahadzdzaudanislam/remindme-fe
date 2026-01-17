import { Bell, CalendarDays, ClipboardList } from "lucide-react";
import { motion } from "framer-motion";

export default function Feature() {
  const feature = [
    {
      icon: ClipboardList,
      title: "Manajemen Tugas Otomatis",
      desc: "Tambahkan tugas dan tentukan deadline-nya",
    },
    {
      icon: CalendarDays,
      title: "Integrasi Jadwal Kuliah",
      desc: "Singkronisasi dengan Google Calendar atau input manual",
    },
    {
      icon: Bell,
      title: "Pengingat Via Email",
      desc: "Notifikasi langsung ke Email sebelum H-3 deadline & hari H deadline",
    },
  ];

  const statistic = [
    { data: "Mahasiswa Aktif", count: 20 },
    { data: "Jadwal Kuliah Tercatat", count: 20 },
    { data: "Tugas Tercatat", count: 20 },
    { data: "Tugas Terselesaikan", count: 20 },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.3 },
    },
  };

  return (
    <>
      <section id="feature" className="py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-20">
            <h6 className="text-sm font-bold uppercase tracking-wider text-secondary">
              Features
            </h6>
            <h2 className="text-3xl font-bold mt-2 text-primary">
              Fitur Unggulan
            </h2>
          </div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {feature.map((f, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{
                  y: -8,
                  boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1)",
                }}
                className="group relative bg-light rounded-2xl p-8 pt-10 shadow-md me-20 mb-5"
              >
                {/* Icon floating */}
                <motion.div
                  whileHover={{ scale: 1.1, rotate: 6 }}
                  className="absolute -top-8 -right-20 flex w-40 h-40 items-center justify-center rounded-full bg-primary text-white shadow-lg md:h-30 md:w-30"
                >
                  <f.icon className="h-16 w-16" />
                </motion.div>

                {/* Content */}
                <h4 className="font-bold text-xl text-primary">{f.title}</h4>
                <p className="text-gray-600 mt-4 w-3/4 md:w-full">{f.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
        
        {/* Statistic */}
        <motion.div
          className="bg-primary text-white rounded-r-verybig py-16 mt-20 me-15 md:py-30"
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <div className="max-w-7xl mx-auto px-6">
            <motion.div
              className="grid grid-cols-1 md:grid-cols-4 gap-10 text-center"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              {statistic.map((s, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  whileHover={{ scale: 1.1 }}
                >
                  <h2 className="text-5xl md:text-4xl font-bold">{s.count}</h2>
                  <h4 className="mt-2 md:text-base font-medium text-white">
                    {s.data}
                  </h4>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </motion.div>
      </section>
    </>
  );
}
