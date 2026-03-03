import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Hero() {
  const slides = [
    {
      tag: "FITUR UNGGUlAN",
      title: "Reminder Tugas & Jadwal Kuliah Mahasiswa",
      desc: "Kelola waktu kuliahmu dengan lebih mudah! Dengan aplikasi ini, kamu bisa mencatat tugas, menyusun jadwal kuliah, dan mendapatkan notifikasi deadline langsung ke Telegram.",
      image: "/carousel/banner-item-01.jpg",
    },
    {
      tag: "RINGAN & AKRAB",
      title: "Kuliah Tenang, Tugas Aman",
      desc: "Capek lupa deadline atau keteteran jadwal? Aplikasi ini bantu kamu mencatat jadwal kuliah, bikin reminder tugas, dan ngirim notifikasi otomatis ke Telegram. Gampang banget, tinggal atur - kami yang ingetin!",
      image: "/carousel/banner-item-02.jpg",
    },
    {
      tag: "PROMOSI & MENARIK",
      title: "Jadi Mahasiswa Super Produktif!",
      desc: "Gunakan aplikasi Reminder Tugas untuk mencatat semua deadline, jadwal kuliah, dan dapatkan pengingat otomatis lewat Telegram. Belajar lebih fokus, tanpa takut lupa tugas lagi.",
      image: "/carousel/banner-item-03.jpg",
    },
  ];

  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 6000);

    return () => clearInterval(timer);
  }, [slides.length]);

  return (
    <section
      id="hero"
      className="bg-linear-to-br from-secondary to-primary text-white rounded-br-verybig overflow-hidden pb-20 pt-8"
    >
      <div className="max-w-7xl mx-auto px-13 md:px-25">
        <div className="relative mt-20 max-w-full mx-auto h-105 overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              className="absolute inset-0 bg-cover bg-center rounded-2xl"
              style={{
                backgroundImage: `url(${slides[current].image})`,
              }}
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ duration: 1.2, ease: "easeInOut" }}
            >
              {/* Overlay */}
              <div className="absolute inset-0 bg-black/20 rounded-2xl" />

              {/* Content */}
              <div className="relative z-10 h-full flex items-center">
                <div className="px-10 max-w-xl">
                  <motion.span
                    className="inline-block mb-4 rounded-full bg-primary px-4 py-1 text-sm font-semibold"
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.3 }}
                  >
                    {slides[current].tag}
                  </motion.span>

                  <motion.h1
                    className="text-xl md:text-4xl font-bold leading-tight"
                    initial={{ y: 30, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.4 }}
                  >
                    {slides[current].title}
                  </motion.h1>

                  <motion.p
                    className="mt-4 text-blue-100 text-md"
                    initial={{ y: 30, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.5 }}
                  >
                    {slides[current].desc}
                  </motion.p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Indicators */}
          <div className="absolute bottom-4 left-1/2 z-20 flex -translate-x-1/2 gap-2">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrent(index)}
                className={`h-2.5 rounded-full transition ${
                  index === current ? "bg-white w-6" : "bg-white/40 w-2.5"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
