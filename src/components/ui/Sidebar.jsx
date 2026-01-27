import {
  Home,
  BookOpen,
  CheckSquare,
  Users,
  Menu,
  X,
  User,
  LogOut,
} from "lucide-react";
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { getUserData, useLogout } from "@/_hooks/useAuth";

export default function Sidebar({ onToggle }) {
  const logoutMutation = useLogout();
  const [open, setOpen] = useState(true);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const { pathname } = useLocation();
  const user = getUserData();

  const displayEmail =
    user?.email?.charAt(0).toUpperCase() + user?.email?.slice(1) ||
    "admin@remindme.com";
  const displayName =
    user?.name?.charAt(0).toUpperCase() + user?.name?.slice(1) || "Admin";

  const menus = [
    { label: "Dashboard", icon: Home, to: "/admin" },
    { label: "Mahasiswa", icon: Users, to: "/admin/users" },
    { label: "Mata kuliah", icon: BookOpen, to: "/admin/courses" },
    { label: "Tugas", icon: CheckSquare, to: "/admin/tasks" },
    // Menu Mahasiswa
    // { label: "Dashboard", icon: Home, to: "/mahasiswa" },
    // { label: "Jadwal", icon: BookOpen, to: "/mahasiswa/courses" },
    // { label: "Tugas", icon: CheckSquare, to: "/mahasiswa/tasks" },
  ];

  const toggleSidebar = () => {
    setOpen(!open);
    onToggle?.(!open);
  };

  const handleLogout = () => {
    logoutMutation.mutate();
  };

  return (
    <>
      {/* Mobile Toggle */}
      <button
        onClick={() => setMobileOpen(!mobileOpen)}
        className={`fixed z-50 top-3.5 rounded-lg p-2 text-primary md:hidden
            ${mobileOpen ? "left-50" : "left-4"}    
        `}
      >
        {mobileOpen ? <X /> : <Menu />}
      </button>

      {/* Overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-30 bg-dark/30 md:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Sidebar */}
      <motion.aside
        animate={{ width: open ? 256 : 80 }}
        transition={{ duration: 0.25 }}
        className={`fixed left-0 top-0 z-40 flex h-screen flex-col bg-white shadow-lg rounded-r-xl md:rounded-r-none ${
          mobileOpen
            ? "translate-x-0 transition duration-150"
            : "-translate-x-full transition duration-150"
        } md:translate-x-0`}
      >
        {/* Header */}
        <div
          className={`flex h-16 items-center justify-between border-b mx-4 ${
            open ? "" : "justify-center"
          }`}
        >
          {open && (
            <div className="flex items-center gap-2">
              <img
                src="/images/logo-remindme.png"
                className="h-9 w-9 rounded"
                alt="logo"
              />
              <p className="font-semibold text-primary text-xl">RemindMe</p>
            </div>
          )}

          <button
            onClick={toggleSidebar}
            className="hidden rounded-lg p-2 text-primary hover:bg-gray-100 md:block"
          >
            <Menu size={18} />
          </button>
        </div>

        {/* Menu */}
        <nav className="flex-1 p-3">
          <p className="text-xs font-semibold text-gray-400 uppercase py-1.5 ms-3">
            menu
          </p>
          <ul className="space-y-1">
            {menus.map(({ label, icon: Icon, to }) => (
              <li key={label}>
                <Link
                  to={to}
                  className={`flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition
                    ${
                      pathname === to
                        ? "bg-indigo-100 text-primary font-semibold"
                        : "text-gray-700 hover:bg-gray-100"
                    }
                    ${open ? "" : "justify-center"}`}
                >
                  <Icon size={18} />
                  {open && label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Profile */}
        <div className="relative border-t p-3">
          <button
            onClick={() => setProfileOpen(!profileOpen)}
            className={`flex w-full items-center gap-3 rounded-lg p-2 hover:bg-gray-100
              ${open ? "" : "justify-center"}`}
          >
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-white">
              <User size={16} />
            </div>
            {open && (
              <div className="text-left text-sm">
                <p className="font-medium">{displayName}</p>
                <p className="text-xs text-gray-500">{displayEmail}</p>
              </div>
            )}
          </button>

          <AnimatePresence>
            {profileOpen && (
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 8 }}
                className={`absolute bottom-14 z-50 w-48 rounded-xl border bg-white shadow-lg
                  ${open ? "left-3" : "left-18"}`}
              >
                <Link
                  to="profile"
                  className="flex items-center gap-2 px-4 py-3 rounded-t-xl hover:bg-gray-100"
                >
                  <User size={16} /> Profile
                </Link>
                <button
                  onClick={handleLogout}
                  disabled={logoutMutation.isPending}
                  className="flex w-full items-center gap-2 px-4 py-3 rounded-b-xl text-red-600 hover:bg-red-50"
                >
                  <LogOut size={16} />
                  {logoutMutation.isPending ? "Logging out..." : "Logout"}
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.aside>
    </>
  );
}
