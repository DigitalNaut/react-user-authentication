import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { useAuth } from "../../auth/AuthContext";
import styles from "./Logout.module.css";

export default function Logout() {
  const { logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    logout();
    setTimeout(() => navigate("/"), 2000);
  }, [logout, navigate]);

  return (
    <div className={styles.container}>
      <h1>Logout</h1>
      <p>Has cerrado sesión</p>
      <p>La página cambiará en 2 segundos</p>
    </div>
  );
}
