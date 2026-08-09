import { Navigate, Outlet } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";
const ProtectedRoute = () => {
  const { user, login, logout } = useAuthContext();
  if (!user) return <Navigate to="/login" />;
  return <Outlet />;
};

export default ProtectedRoute;
