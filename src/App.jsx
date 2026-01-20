import NotFound from "@/components/NotFoundPage";
import DashboardLayout from "@/layout/DashboardLayout";
import PublicLayout from "@/layout/PublicLayout";
import AdminDashboard from "@/pages/admin/AdminDashboard";
import AdminCourse from "@/pages/admin/courses/AdminCourse";
import AdminTask from "@/pages/admin/tasks/AdminTask";
import AdminUser from "@/pages/admin/users/AdminUser";
import Login from "@/pages/auth/Login";
import Register from "@/pages/auth/Register";
import Home from "@/pages/Home";
import MahasiswaDashboard from "@/pages/mahasiswa/MahasiswaDashboard";
import { Route, Routes } from "react-router-dom";

function App() {
  return (
    <>
      <Routes>
        {/* PUBLIC ROUTES */}
        <Route element={<PublicLayout />}>
          <Route index element={<Home />} />
        </Route>

        {/* ADMIN ROUTES */}
        <Route path="admin" element={<DashboardLayout />}>
          <Route index element={<AdminDashboard />} />

          <Route path="profile">
            <Route index element={"AdminProfile"} />
            <Route path="edit" element={"AdminEditProfile"} />
          </Route>

          <Route path="users">
            <Route index element={<AdminUser />} />
            <Route path="create" element={"CreateUser"} />
            <Route path="details/:id" element={"DetailUser"} />
            <Route path="details/:id/login-history" element={"UserHistory"} />
          </Route>

          <Route path="courses">
            <Route index element={<AdminCourse />} />
            <Route path="create" element={"CreateCourse"} />
            <Route path="edit/:id" element={"EditCourse"} />
            <Route path="details/:id" element={"DetailCourse"} />
          </Route>

          <Route path="tasks">
            <Route index element={<AdminTask />} />
            <Route path="create" element={"CreateTask"} />
            <Route path="edit/:id" element={"EditTask"} />
            <Route path="details/:id" element={"DetailTask"} />
          </Route>
        </Route>

        {/* MAHASISwA ROUTES */}
        <Route path="mahasiswa" element={<DashboardLayout />}>
          <Route index element={<MahasiswaDashboard />} />

          <Route path="profile">
            <Route index element={"MahasiswaProfile"} />
            <Route path="edit" element={"MahasiswaEditProfile"} />
          </Route>

          <Route path="courses">
            <Route index element={"DaftarCourses"} />
            <Route path="create" element={"CreateCourse"} />
            <Route path="edit/:id" element={"EditCourse"} />
            <Route path="details/:id" element={"DetailCourse"} />
          </Route>

          <Route path="tasks">
            <Route index element={"DaftarTasks"} />
            <Route path="create" element={"CreateTask"} />
            <Route path="edit/:id" element={"EditTask"} />
            <Route path="details/:id" element={"DetailTask"} />
          </Route>
        </Route>

        {/* AUTH ROUTES */}
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />

        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
