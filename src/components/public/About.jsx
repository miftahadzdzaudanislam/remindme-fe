import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

export default function About() {
  const items = [
    {
      title: "Fokus pada Produktivitas Mahasiswa",
      content:
        "Kami memahami betapa padatnya jadwal kuliah dan tugas. Dengan RemindMe, kamu bisa lebih fokus belajar tanpa khawatir lupa deadline.",
    },
    {
      title: "Notifikasi Real-Time via Telegram",
      content:
        "Langsung dapat pengingat ke Telegram sesuai jadwal yang kamu tentukan sendiri—mulai dari H-3 hingga beberapa jam sebelum tenggat.",
    },
    {
      title: "Desain Simpel, Fitur Lengkap",
      content:
        "Antarmuka dirancang agar mudah digunakan. Tambah tugas, atur jadwal, dan pantau deadline dalam satu aplikasi.",
    },
    {
      title: "Dibuat oleh Mahasiswa, untuk Mahasiswa",
      content:
        "RemindMe lahir dari pengalaman nyata mahasiswa yang kesulitan mengatur tugas dan jadwal.",
    },
  ];

  const [active, setActive] = useState(0);

  return (
    <section id="about" className="py-20">
      <div className="max-w-full mx-auto px-6 grid lg:grid-cols-2 items-center lg:ps-6 lg:pe-0">
        {/* Accordion */}
        <div className="space-y-7 bg-primary p-7 rounded-2xl">
          {items.map((item, index) => (
            <div
              key={index}
              className="rounded-2xl bg-light border border-gray-200 overflow-hidden"
            >
              <button
                onClick={() => setActive(active === index ? null : index)}
                className="w-full flex items-center justify-between p-5 text-left font-semibold text-primary"
              >
                {item.title}
                <ChevronDown
                  className={`h-5 w-5 transition-transform ${
                    active === index ? "rotate-180" : ""
                  }`}
                />
              </button>

              <AnimatePresence>
                {active === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="px-5 pb-5 text-gray-600"
                  >
                    {item.content}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>

        {/* About Content */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="lg:bg-light py-16 px-7"
        >
          <span className="text-sm font-semibold uppercase text-primary">
            About Us
          </span>

          <h2 className="mt-3 text-3xl md:text-4xl font-bold leading-tight text-primary">
            Solusi Cerdas untuk Mahasiswa yang Sibuk
          </h2>

          <p className="mt-4 text-gray-600">
            Kami hadir untuk membantu mahasiswa mengelola tugas dan jadwal
            kuliah dengan lebih mudah. Dengan pengingat otomatis dan integrasi
            Telegram, kamu nggak perlu takut lagi lupa deadline.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
