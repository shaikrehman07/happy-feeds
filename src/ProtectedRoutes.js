import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { LoginContext } from "./LoginStatus";

function ProtectedRoutes() {
  const { loggedIn } = useContext(LoginContext);
  return loggedIn ? <Outlet /> : <Navigate to="/login" />;
}

export default ProtectedRoutes;
