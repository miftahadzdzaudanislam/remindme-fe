import { useCurrentUser } from "@/_hooks/useAuth";
import { useMenuState } from "@/_hooks/utils/useMenuState";
import { useScrollDetection } from "@/_hooks/utils/useScrollDetection";
import { useScrollToSection } from "@/_hooks/utils/useScrollToSection";
import MenuItem from "@/components/ui/MenuItem";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";

export default function MainHeader() {
  const { isOpen, toggleMenu, closeMenu } = useMenuState();
  const { scrollToSection } = useScrollToSection();
  const { data: user, isLoading } = useCurrentUser();

  const handleMenuClick = (id, isMobile = false) => {
    scrollToSection(id, isMobile, closeMenu);
  };

  const menus = [
    { label: "Home", id: "hero" },
    ...(user?.role === "mahasiswa" ? [{ label: "Task", id: "task" }] : []),
    { label: "Feature", id: "feature" },
    { label: "About", id: "about" },
  ];

  const { scrolled, activeId } = useScrollDetection(menus);

  // Tentukan dashboard path sesuai role
  const dashboardPath = user?.role === "admin" ? "/admin" : "/mahasiswa";

  return (
    <>
      <motion.header
        className="fixed top-0 w-full z-50 rounded-b-2xl"
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
              {!isLoading && (
                <>
                  {user ? (
                    <li>
                      <Link
                        to={dashboardPath}
                        className={`inline-flex items-center justify-center transform px-4 py-2 rounded-3xl font-semibold transition-all duration-300 ease-in-out ${
                          scrolled
                            ? "bg-primary text-white shadow-md hover:shadow-lg hover:bg-primary-hover"
                            : "bg-light text-primary shadow hover:bg-white hover:shadow-md"
                        } active:scale-95 hover:scale-110`}
                      >
                        Dashboard
                      </Link>
                    </li>
                  ) : (
                    <>
                      <li>
                        <Link
                          to="/login"
                          className={`inline-flex items-center justify-center transform px-4 py-2 rounded-3xl font-semibold transition-all duration-300 ease-in-out ${
                            scrolled
                              ? "bg-primary text-white shadow-md hover:shadow-lg hover:bg-primary-hover"
                              : "bg-light text-primary shadow hover:bg-white hover:shadow-md"
                          } active:scale-95 hover:scale-110`}
                        >
                          Login
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="/register"
                          className={`inline-flex items-center justify-center transform px-4 py-2 rounded-3xl font-semibold transition-all duration-300 ease-in-out ${
                            scrolled
                              ? "text-primary hover:bg-primary/10"
                              : "text-white hover:bg-white/10"
                          } hover:scale-105 active:scale-95`}
                        >
                          Register
                        </Link>
                      </li>
                    </>
                  )}
                </>
              )}
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
              onClick={closeMenu}
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
                {!isLoading && (
                  <>
                    {user ? (
                      <li>
                        <Link
                          to={dashboardPath}
                          onClick={closeMenu}
                          className="block py-4 transition text-primary border-b border-gray-300"
                        >
                          Dashboard
                        </Link>
                      </li>
                    ) : (
                      <>
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
                      </>
                    )}
                  </>
                )}
              </ul>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
