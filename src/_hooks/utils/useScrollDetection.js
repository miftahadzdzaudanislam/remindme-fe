import { useScroll, useMotionValueEvent } from "framer-motion";
import { useState } from "react";

/**
 * Custom hook untuk:
 * - Mendeteksi apakah halaman sudah di-scroll
 * - Menentukan section/menu yang sedang aktif
 *
 * @param {Array} menus - daftar menu berisi id section
 */
export const useScrollDetection = (menus) => {
  const [scrolled, setScrolled] = useState(false);
  const [activeId, setActiveId] = useState("hero");
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    setScrolled(latest > 20); // jika scroll lebih dari 20px, maka true

    // menentukan section yang aktif
    const current = menus
      .map(({ id }) => {
        const el = document.getElementById(id);
        if (!el) return { id, top: Infinity };

        return { id, top: el.getBoundingClientRect().top - 120 };
      })
      .filter((x) => x.top <= 0) // ambil section yang sudah melewati atas layar
      .sort((a, b) => b.top - a.top)[0]; // urutkan yang paling dekat ke atas

    if (current?.id) setActiveId(current.id);
  });

  return { scrolled, activeId };
};
