/** Referencias:
 * Autenticación de usuarios con React.js y JWT https://www.youtube.com/watch?v=ON87B1PJIlY
 * React Router Tutorial - 15 - Authentication and Protected Routes: https://www.youtube.com/watch?v=X8eAbu1RWZ4
 * Secure Authentication for Web Apps & APIs Using JWTs: https://frontendmasters.com/courses/secure-auth-jwt/
 */

import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import {
  getToken,
  getUser,
  initAxiosInterceptors,
  setToken,
} from "./jwtHelper";

const AuthContext = createContext(null);

initAxiosInterceptors(); // inicializar interceptores de axios para mandar el token en cada petición

export function AuthProvider({ children }) {
  const [user, setUser] = useState();

  function finishAuthentication(token) {
    setToken(token);
    setUser({
      name: getUser(token),
      token,
    });
  }

  async function login({ username, password }, success, error) {
    console.log("Haciendo login con usuario", username);

    try {
      // La llamada real sería un POST con el payload de {user, password}
      const { status, data } = await axios.get(
        `http://localhost:3001/login/${username}`
      );

      const { token } = data;

      if (status === 200) {
        finishAuthentication(token);
        success();
      }
    } catch (err) {
      console.error(err);
      error("No se pudo iniciar sesión");
    }
  }

  function logout() {
    setUser(null);
    localStorage.removeItem("token");
  }

  useEffect(function restoreSession() {
    const token = getToken();

    if (token) {
      const name = getUser(token);

      setUser({
        name,
        token,
      });
    } else setUser(null);
  }, []);

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
