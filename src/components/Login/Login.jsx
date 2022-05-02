import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

import styles from "./Login.module.css";
import { useAuth } from "../../auth/AuthContext";

export default function Login() {
  const [user, setUser] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();
  const { state } = useLocation();

  const redirectPath = state?.from || "/";
  const unauthorized = state?.unauthorized;

  const handleLogin = (event) => {
    event.preventDefault();

    login(user);
    navigate(redirectPath, { replace: true });
  };

  return (
    <>
      {unauthorized && (
        <p className={styles.banner}>
          ⚠ Debes iniciar sesión para continuar a {redirectPath}
        </p>
      )}
      <div className={styles.container}>
        <h1>Login</h1>
        <form className={styles.form} onSubmit={handleLogin}>
          <label className={styles.label}>Usuario</label>
          <input
            className={styles.input}
            type="text"
            required
            value={user}
            onChange={(event) => setUser(event.currentTarget.value)}
          />
          <button className={styles.button} type="submit">
            Login
          </button>
        </form>
      </div>
    </>
  );
}
