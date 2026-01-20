import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import MenuItem from "../ui/menuItem";
import { useMenuState } from "../../_hooks/utils/useMenuState";
import { useScrollToSection } from "../../_hooks/utils/useScrollToSection";
import { useScrollDetection } from "../../_hooks/utils/useScrollDetection";

export default function MainHeader() {
  const menus = [
    { label: "Home", id: "hero" },
    { label: "Task", id: "task" },
    { label: "Feature", id: "feature" },
    { label: "About", id: "about" },
  ];

  const { isOpen, toggleMenu, closeMenu } = useMenuState();
  const { scrollToSection } = useScrollToSection();
  const { scrolled, activeId } = useScrollDetection(menus);

  const handleMenuClick = (id, isMobile = false) => {
    scrollToSection(id, isMobile, closeMenu);
  };

  return (
    <>
      <motion.header
        className="fixed top-0 w-full z-50 rounded-b-2xl overflow-hidden"
        animate={{
          backgroundColor: scrolled
            ? "rgba(255,255,255,0.9)"
            : "rgba(255,255,255,0)",
          boxShadow: scrolled ? "0 4px 12px rgba(0,0,0,0.08)" : "none",
        }}
        transition={{ duration: 0.3 }}
      >
        <div className="max-w-7xl mx-auto px-6">
          <nav className="flex items-center h-20">
            {/* Logo */}
            <Link className="flex items-center gap-1 mx-auto md:mx-0" to="/">
              <img
                src="/images/logo-remindme.png"
                className={`h-10 transition ${scrolled ? "" : "brightness-0 invert"}`}
                alt="RemindMe Logo"
              />
              <span
                className={`font-semibold text-xl ${scrolled ? "text-primary" : "text-white"}`}
              >
                RemindMe
              </span>
            </Link>

            {/* Desktop Menu */}
            <ul className="hidden md:flex ml-auto gap-3 font-medium">
              {menus.map((m) => (
                <li key={m.id}>
                  <MenuItem
                    id={m.id}
                    label={m.label}
                    isActive={activeId === m.id}
                    scrolled={scrolled}
                    onClick={(id) => handleMenuClick(id, false)}
                  />
                </li>
              ))}
              <li>
                <Link
                  to="/login"
                  className={`px-4 py-2 rounded-2xl transition ${
                    scrolled
                      ? "text-white bg-primary hover:bg-primary-hover"
                      : "text-primary bg-light hover:bg-white"
                  }`}
                >
                  Login
                </Link>
              </li>
              <li>
                <Link
                  to="/register"
                  className={`px-4 py-1 rounded-lg transition ${scrolled ? "text-primary" : "text-white"}`}
                >
                  Register
                </Link>
              </li>
            </ul>

            {/* Burger Button */}
            <button
              onClick={toggleMenu}
              className="md:hidden absolute right-4 w-10 h-10 flex items-center justify-start"
              aria-label="Toggle menu"
            >
              {[0, 1, 2].map((i) => (
                <span
                  key={i}
                  className={`absolute h-0.5 rounded-full transition-all ${
                    scrolled ? "bg-primary" : "bg-white"
                  } ${
                    i === 0
                      ? `w-6 ${isOpen ? "rotate-45" : "-translate-y-2"}`
                      : i === 1
                        ? `w-8 ${isOpen ? "opacity-0" : ""}`
                        : `w-6 ${isOpen ? "-rotate-45" : "translate-y-2"}`
                  }`}
                />
              ))}
            </button>
          </nav>
        </div>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              className="fixed inset-0 md:hidden bg-dark/30 z-40 mt-20"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />
            <motion.div
              className="fixed top-20 left-3 right-3 md:hidden bg-light rounded-b-2xl z-50 shadow-lg overflow-hidden"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <ul className="text-center font-medium">
                {menus.map((m) => (
                  <li key={m.id}>
                    <MenuItem
                      id={m.id}
                      label={m.label}
                      isActive={activeId === m.id}
                      isMobile
                      scrolled={scrolled}
                      onClick={(id) => handleMenuClick(id, true)}
                    />
                  </li>
                ))}
                <li>
                  <Link
                    to="/login"
                    onClick={closeMenu}
                    className="block py-4 transition text-primary border-b border-gray-300"
                  >
                    Login
                  </Link>
                </li>
                <li>
                  <Link
                    to="/register"
                    onClick={closeMenu}
                    className="block py-4 transition text-primary"
                  >
                    Register
                  </Link>
                </li>
              </ul>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
