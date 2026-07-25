import useUserStore from "./Store/UserStore";
import { Navigate, Outlet } from "react-router-dom";

export function ProtectedRoute() {
  const user = useUserStore((state) => state.user);
  return user ? <Outlet /> : <Navigate to='/' replace />
}