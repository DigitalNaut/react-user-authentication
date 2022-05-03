import { useNavigate } from "react-router-dom";

import styles from "./Profile.module.css";
import { useAuth } from "../../auth/AuthContext";

export default function Profile() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <div className="container">
      <h1>Perfil de {user}</h1>
      <button className={styles.button} onClick={handleLogout}>
        Cerrar sesión
      </button>
    </div>
  );
}
