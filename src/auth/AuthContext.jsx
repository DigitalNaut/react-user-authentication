import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import { getUser } from "./jwtHelper";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState();

  function getToken() {
    // Recupera el token del localStorage
    return localStorage.getItem("token");
  }

  function finishAuthentication(token) {
    localStorage.setItem("token", token);
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
