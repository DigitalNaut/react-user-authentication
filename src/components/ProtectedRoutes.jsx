import { useEffect } from "react";
import { Outlet, useNavigate, useLocation } from "react-router-dom";

import { useAuth } from "../auth/AuthContext";

export default function ProtectedRoutes() {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { user } = useAuth();

  useEffect(() => {
    if (user === null)
      // No hay usuario guardado si es nulo
      navigate("/login", {
        replace: true,
        state: { from: pathname, unauthorized: true },
      });
  }, [user, navigate, pathname]);

  if (user) return <Outlet />;
}
