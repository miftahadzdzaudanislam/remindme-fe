/**
 * Custom hook untuk melakukan smooth scroll ke section tertentu
 * Mendukung offset navbar dan perilaku khusus untuk mobile menu
 */
export const useScrollToSection = () => {
  /**
   * Scroll ke section berdasarkan ID
   * @param {string} id - ID element tujuan
   * @param {boolean} isMobile - Apakah aksi berasal dari menu mobile
   * @param {Function} onMobile - Callback untuk aksi mobile (misal: tutup menu)
   */
  const scrollToSection = (id, isMobile = false, onMobile) => {
    const el = document.getElementById(id);
    if (!el) return;

    // Fungsi inti untuk melakukan scroll
    const action = () => {
      const top = el.getBoundingClientRect().top + window.pageYOffset - 120;
      window.scrollTo({ top, behavior: "smooth" }); // scroll ke tujuan
    };

    if (isMobile) {
      onMobile?.();
      setTimeout(action, 100);
    } else {
      action();
    }
  };

  return { scrollToSection };
};
