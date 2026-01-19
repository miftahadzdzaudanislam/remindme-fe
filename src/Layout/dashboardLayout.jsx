import Sidebar from "@/components/ui/sidebar";
import { useState } from "react";
import { Outlet } from "react-router-dom";

export default function DashboardLayout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <Sidebar onToggle={setIsSidebarOpen} />

      {/* Main Content */}
      <div
        className={`flex-1 transition-all duration-300 ${
          isSidebarOpen ? "md:ml-64" : "md:ml-20"
        }`}
      >
        {/* Header */}
        <header className="sticky top-0 z-10 flex h-16 items-center justify-between border-b bg-white pe-6 ps-20 shadow-sm md:p-6">
          <div className="flex items-center gap-2">
            <h2 className="text-lg font-semibold text-gray-800">
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
        <main className="min-h-[calc(100vh-4rem)] bg-linear-to-br from-indigo-50 via-white to-emerald-50">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
