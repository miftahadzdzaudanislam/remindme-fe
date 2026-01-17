import { Route, Routes } from "react-router-dom";
import PublicLayout from "./Layout/publicLayout";
import Home from "./Pages/Home";
import NotFound from "./components/notfound";
import Login from "./Pages/auth/login";
import Register from "./Pages/auth/register";
import DashboardLayout from "./Layout/dashboardLayout";
import AdminDashboard from "./Pages/admin/AdminDashboard";
import MahasiswaDashboard from "./Pages/mahasiswa/MahasiswaDashboard";

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

          <Route path="users">
            <Route index element={"DaftarUsers"} />
            <Route path="details/:id" element={"DetailUser"} />
            <Route path="details/:id/login-history" element={"UserHistory"} />
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
