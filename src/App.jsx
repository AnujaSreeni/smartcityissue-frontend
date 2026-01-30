import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ProtectedRoute from "./components/ProtectedRoute";
import AdminDashboard from "./pages/AdminDashboard";
import DepartmentDashboard from "./pages/DepartmentDashboard";
import UserDashboard from "./pages/UserDashboard";
import CreateComplaint from "./pages/CreateComplaint";

function App() {
  return (
    <Routes>
      {/* Public routes */}
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/complaint" element={<CreateComplaint />} />

      <Route
          path="/user"
          element={
            <ProtectedRoute allowedRoles={["citizen"]}>
              <UserDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/department"
          element={
            <ProtectedRoute allowedRoles={["department"]}>
              <DepartmentDashboard />
            </ProtectedRoute>
          }
        />
      </Routes>
  );
}

export default App;

