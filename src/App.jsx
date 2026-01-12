import { Route, Routes } from "react-router-dom";
import PublicLayout from "./Layout/publicLayout";
import Home from "./Pages/Home";
import NotFound from "./components/notfound";
import AdminLayout from "./Layout/adminLayout";
import MahasiswaLayout from "./Layout/mahasiswaLayout";
import Login from "./Pages/auth/login";
import Register from "./Pages/auth/register";

function App() {
  return (
    <>
      <Routes>
        <Route element={<PublicLayout />}>
          <Route index element={<Home />} />
        </Route>

        <Route path="admin" element={<AdminLayout />} >
          <Route index element={""} />
        </Route>

        <Route path="mahasiswa" element={<MahasiswaLayout />} >
          <Route index element={""} />
        </Route>

        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />

        <Route path="*" element={<NotFound />} /> 
      </Routes>
    </>
  );
}

export default App;
