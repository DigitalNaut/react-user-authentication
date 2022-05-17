import { useNavigate } from "react-router-dom";

import styles from "./Profile.module.css";
import { useAuth } from "../../auth/AuthContext";

export default function Profile() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="container">
      <h1>Perfil de {user.name}</h1>
      <h2>Tu token es:</h2>
      <p>{user.token}</p>
      <button className={styles.button} onClick={handleLogout}>
        Cerrar sesión
      </button>
    </div>
  );
}
