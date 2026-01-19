import { useState } from "react";

/**
 * Custom hook untuk mengatur state buka / tutup menu
 * Cocok untuk navbar, sidebar, atau mobile menu
 */
export const useMenuState = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen); // fungsi toggle menu
  const closeMenu = () => setIsOpen(false); // fungsi tutup menu

  return { isOpen, toggleMenu, closeMenu };
};
