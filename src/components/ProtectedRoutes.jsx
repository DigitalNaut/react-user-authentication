import { useEffect } from "react";
import { Outlet, useNavigate, useLocation } from "react-router-dom";

import { useAuth } from "../auth/AuthContext";

export default function ProtectedRoutes() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { pathname } = useLocation();

  useEffect(() => {
    if (!user)
      navigate("/login", {
        replace: true,
        state: { from: pathname, unauthorized: true },
      });
  }, [navigate, user, pathname]);

  if (user) return <Outlet />;
}
