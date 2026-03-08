import { useInactivityLogout } from "@/_hooks/utils/useInactive";
import GuestRoute from "@/components/auth/GuestRoute";
import ProtectedRoute from "@/components/auth/ProtectedRoute";
import RoleRoute from "@/components/auth/RoleRoute";
import NotFound from "@/components/NotFoundPage";
import Unauthorized from "@/components/UnauthorizedPage";
import DashboardLayout from "@/layout/DashboardLayout";
import PublicLayout from "@/layout/PublicLayout";
import AdminDashboard from "@/pages/admin/AdminDashboard";
import AdminCourse from "@/pages/admin/courses/AdminCourse";
import AdminCourseCreate from "@/pages/admin/courses/AdminCourseCreate";
import AdminCourseEdit from "@/pages/admin/courses/AdminCourseEdit";
import AdminTask from "@/pages/admin/tasks/AdminTask";
import AdminTaskCreate from "@/pages/admin/tasks/AdminTaskCreate";
import AdminTaskEdit from "@/pages/admin/tasks/AdminTaskEdit";
import AdminUser from "@/pages/admin/users/AdminUser";
// import AdminUserCreate from "@/pages/admin/users/AdminUserCreate";
import Login from "@/pages/auth/Login";
import Register from "@/pages/auth/Register";
import Home from "@/pages/Home";
import MahasiswaCourse from "@/pages/mahasiswa/courses/MahasiswaCourse";
import MahasiswaCourseCreate from "@/pages/mahasiswa/courses/MahasiswaCourseCreate";
import MahasiswaCourseEdit from "@/pages/mahasiswa/courses/MahasiswaCourseEdit";
import MahasiswaDashboard from "@/pages/mahasiswa/MahasiswaDashboard";
import MahasiswaTask from "@/pages/mahasiswa/tasks/MahasiswaTask";
import MahasiswaTaskCreate from "@/pages/mahasiswa/tasks/MahasiswaTaskCreate";
import MahasiswaTaskEdit from "@/pages/mahasiswa/tasks/MahasiswaTaskEdit";
import { Loader2 } from "lucide-react";
import { Route, Routes } from "react-router-dom";

function App() {
  const inactivity = useInactivityLogout() || {};
  const { authLoading = false } = inactivity;

  if (authLoading) return (
    <div>
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 size={60} className="animate-spin text-primary" />
      </div>
    </div>
  );

  return (
    <>
      <Routes>
        {/* PUBLIC ROUTES */}
        <Route element={<PublicLayout />}>
          <Route index element={<Home />} />
        </Route>

        {/* PROTECTED ROUTES */}
        <Route element={<ProtectedRoute />}>
          <Route element={<RoleRoute allowedRoles={["admin"]} />}>
            {/* ADMIN ROUTES */}
            <Route path="admin" element={<DashboardLayout />}>
              <Route index element={<AdminDashboard />} />

              <Route path="profile">
                <Route index element={"AdminProfile"} />
                <Route path="edit" element={"AdminEditProfile"} />
              </Route>

              <Route path="users">
                <Route index element={<AdminUser />} />
                {/* <Route path="create" element={<AdminUserCreate />} /> */}
                <Route path="details/:id" element={"DetailUser"} />
                <Route
                  path="details/:id/login-history"
                  element={"UserHistory"}
                />
              </Route>

              <Route path="courses">
                <Route index element={<AdminCourse />} />
                <Route path="create" element={<AdminCourseCreate />} />
                <Route path="edit/:id" element={<AdminCourseEdit />} />
                <Route path="details/:id" element={"DetailCourse"} />
              </Route>

              <Route path="tasks">
                <Route index element={<AdminTask />} />
                <Route path="create" element={<AdminTaskCreate />} />
                <Route path="edit/:id" element={<AdminTaskEdit />} />
                <Route path="details/:id" element={"DetailTask"} />
              </Route>
            </Route>
          </Route>

          <Route element={<RoleRoute allowedRoles={["mahasiswa"]} />}>
            {/* MAHASISwA ROUTES */}
            <Route path="mahasiswa" element={<DashboardLayout />}>
              <Route index element={<MahasiswaDashboard />} />

              <Route path="profile">
                <Route index element={"MahasiswaProfile"} />
                <Route path="edit" element={"MahasiswaEditProfile"} />
              </Route>

              <Route path="courses">
                <Route index element={<MahasiswaCourse />} />
                <Route path="create" element={<MahasiswaCourseCreate />} />
                <Route path="edit/:id" element={<MahasiswaCourseEdit />} />
                <Route path="details/:id" element={"DetailCourse"} />
              </Route>

              <Route path="tasks">
                <Route index element={<MahasiswaTask />} />
                <Route path="create" element={<MahasiswaTaskCreate />} />
                <Route path="edit/:id" element={<MahasiswaTaskEdit />} />
                <Route path="details/:id" element={"DetailTask"} />
              </Route>
            </Route>
          </Route>
        </Route>

        {/* AUTH ROUTES */}
        <Route element={<GuestRoute />}>
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
        </Route>

        <Route path="unauthorized" element={<Unauthorized />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
