import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { useAuth } from "../../auth/AuthContext";
import styles from "./Logout.module.css";

function redirectTimer(timeout, callback) {
  const timer = setTimeout(() => {
    console.log(`Ding!`);
    callback();
  }, timeout);

  console.log(`Created timer ${timer}`);
  return timer;
}

export default function Logout() {
  const { logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    logout();

    const timer = redirectTimer(2000, () => navigate("/"));

    return () => {
      console.log(`Cancelando el timer ${timer}`);
      clearTimeout(timer);
    };
  }, [logout, navigate]);

  return (
    <div className={styles.container}>
      <h1>Logout</h1>
      <p>Has cerrado sesión</p>
      <p>La página cambiará en 2 segundos</p>
    </div>
  );
}
