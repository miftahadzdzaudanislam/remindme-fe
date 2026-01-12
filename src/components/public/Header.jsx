import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { Link as ScrollLink } from "react-scroll";

export default function MainHeader() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const menus = [
    { label: "Home", id: "hero" },
    { label: "Task", id: "task" },
    { label: "Feature", id: "feature" },
    { label: "About", id: "about" },
  ];

  // Detect scroll
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Menu Navbar
  const MenuItem = ({ id, label, isMobile = false }) => {
    const baseClass = isMobile
      ? "block py-4 transition border-b border-gray-300"
      : "px-5 py-2 rounded-3xl transition";

    const activeClass = isMobile
      ? "bg-primary text-white"
      : scrolled
      ? "bg-primary text-white"
      : "bg-light/30 text-white";

    const inactiveClass = isMobile
      ? "text-primary hover:bg-gray-100"
      : scrolled
      ? "text-primary"
      : "text-light";

    return (
      <ScrollLink
        to={id}
        spy={true}
        smooth={true}
        offset={-80}
        duration={500}
        onClick={() => isMobile && setIsOpen(false)}
        activeClass={activeClass
          .split(" ")
          .filter((c) => !inactiveClass.includes(c))
          .join(" ")}
        className={`${baseClass} cursor-pointer ${inactiveClass}`}
      >
        {label}
      </ScrollLink>
    );
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
        onScroll={() => setScrolled(window.scrollY > 20)}
      >
        <div className="max-w-7xl mx-auto px-6">
          <nav className="flex items-center h-20">
            {/* Logo */}
            <a className="flex items-center gap-1 mx-auto md:mx-0" href="/">
              <img
                src="/images/logo-remindme.png"
                className={`h-10 transition ${
                  scrolled ? "" : "brightness-0 invert"
                }`}
                alt="RemindMe Logo"
              />
              <span
                className={`font-semibold text-xl ${
                  scrolled ? "text-primary" : "text-white"
                }`}
              >
                RemindMe
              </span>
            </a>

            {/* Desktop Menu */}
            <ul className="hidden md:flex ml-auto gap-3 font-medium">
              {menus.map((m) => (
                <li key={m.id}>
                  <MenuItem id={m.id} label={m.label} />
                </li>
              ))}
              <li>
                <Link
                  to="/login"
                  className={`px-4 py-2 rounded-2xl transition ${
                    scrolled
                      ? "text-white bg-primary hover:bg-secondary"
                      : "text-primary bg-light hover:bg-white"
                  }`}
                >
                  Login
                </Link>
              </li>
              <li>
                <Link
                  to="/register"
                  className={`px-4 py-1 rounded-lg transition ${
                    scrolled
                      ? "text-primary"
                      : "text-white"
                  }`}
                >
                  Register
                </Link>
              </li>
            </ul>

            {/* Burger Button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
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
              className="fixed inset-0 md:hidden bg-black/20 z-40 mt-20"
              onClick={() => setIsOpen(false)}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />

            <motion.div
              className="fixed top-20 left-3 right-3 md:hidden bg-light rounded-b-2xl z-50 shadow-lg"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <ul className="text-center font-medium">
                {menus.map((m) => (
                  <li key={m.id}>
                    <MenuItem id={m.id} label={m.label} isMobile />
                  </li>
                ))}
                <li>
                  <Link
                    to="/login"
                    className="block py-4 transition text-primary border-b border-gray-300"
                  >
                    Login
                  </Link>
                </li>
                <li>
                  <Link
                    to="/register"
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
