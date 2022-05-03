import { NavLink } from "react-router-dom";

import styles from "./Navbar.module.css";
import { useAuth } from "../../auth/AuthContext";

function FancyLink({ to, children }) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) => (isActive ? styles.activeLink : styles.link)}
    >
      {children}
    </NavLink>
  );
}

function UserCard({ user }) {
  return <div className={styles.userCard}>👤 {user}</div>;
}

export default function Navbar() {
  const { user } = useAuth();

  return (
    <div className={styles.container}>
      <nav>
        <FancyLink to="/">Home</FancyLink>
        <FancyLink to="/profile">🔒 Perfil</FancyLink>
        {user && <FancyLink to="/gallery">🔒 Gallery</FancyLink>}
      </nav>
      <nav>
        {!user && <FancyLink to="/login">Iniciar sesión</FancyLink>}
        {user && (
          <>
            <UserCard user={user} />
            <FancyLink to="/logout">Cerrar sesión</FancyLink>
          </>
        )}
      </nav>
    </div>
  );
}
