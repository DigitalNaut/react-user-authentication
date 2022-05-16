import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

import styles from "./Login.module.css";
import { useAuth } from "../../auth/AuthContext";

export default function Login() {
  const [username, setUser] = useState("");
  const { login } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { state } = useLocation();
  const navigate = useNavigate();

  const redirectPath = state?.from || "/";
  const unauthorized = state?.unauthorized;

  const handleLogin = (event) => {
    event.preventDefault();
    setLoading(true);

    login(
      {
        username,
        password: "",
      },
      () => {
        navigate(redirectPath);
      },
      (err) => {
        setLoading(false);
        setError(err);
      }
    );
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
        {error && <p className={styles.banner}>{error}</p>}
        {loading && <p>Loading...</p>}
        {!loading && (
          <form className={styles.form} onSubmit={handleLogin}>
            <label className={styles.label}>Usuario</label>
            <input
              className={styles.input}
              type="text"
              required
              value={username}
              onChange={(event) => setUser(event.currentTarget.value)}
            />
            <button className={styles.button} type="submit">
              Login
            </button>
          </form>
        )}
      </div>
    </>
  );
}
