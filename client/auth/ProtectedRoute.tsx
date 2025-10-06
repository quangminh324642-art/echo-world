import { ReactNode } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { Role, useAuth } from "./AuthContext";

export default function ProtectedRoute({ role = "student", children }: { role?: Role; children: ReactNode }) {
  const { isAuthenticated, hasRole } = useAuth();
  const location = useLocation();
  if (!isAuthenticated || !hasRole(role)) {
    const redirect = encodeURIComponent(location.pathname + location.search);
    return <Navigate to={`/login?redirect=${redirect}`} replace />;
    }
  return <>{children}</>;
}
