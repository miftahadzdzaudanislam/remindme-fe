import Sidebar from "@/components/ui/Sidebar";
import { useState } from "react";
import { Outlet } from "react-router-dom";
import { Link } from "react-router-dom";
import { Heart } from "lucide-react";

export default function DashboardLayout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const currentYear = new Date().getFullYear();

  return (
    <div className="flex min-h-screen flex-col bg-gray-50">
      {/* Sidebar */}
      <div className="flex flex-1">
        <Sidebar onToggle={setIsSidebarOpen} />

        {/* Main Content */}
        <div
          className={`flex-1 flex flex-col transition-all duration-300 ${
            isSidebarOpen ? "md:ml-64" : "md:ml-20"
          }`}
        >
          {/* Header */}
          <header className="sticky top-0 z-10 flex h-16 items-center justify-between border-b bg-white pe-6 ps-20 shadow-sm md:p-6">
            <div className="flex items-center gap-2">
              <h2 className="text-lg font-semibold text-primary">
                Dashboard Admin
              </h2>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-sm text-gray-600">
                Selamat datang, Admin 👋
              </span>
            </div>
          </header>

          {/* Page Content */}
          <main className="flex-1 bg-linear-to-br from-indigo-50 via-white to-emerald-50">
            <Outlet />
          </main>

          {/* Footer */}
          <footer className="bg-slate-100 border-t w-full border-gray-200 py-4 px-4 sm:px-6">
            <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-center sm:justify-between gap-2 text-sm text-gray-600">
              <div className="flex items-center gap-1 text-center sm:text-left">
                <span>Made with</span>
                <Heart size={14} className="text-red-500 fill-red-500 mx-1" />
                <span>by MiftahAdz</span>
              </div>

              <div className="flex flex-wrap items-center gap-3 justify-center sm:justify-end text-center mt-2 sm:mt-0">
                <span className="hidden sm:inline text-gray-300">|</span>
                <span>{currentYear} RemindMe Panel</span>
                <span className="bg-primary text-white text-xs font-semibold px-2 py-0.5 rounded">
                  v2.0
                </span>
              </div>
            </div>
          </footer>
        </div>
      </div>
    </div>
  );
}
