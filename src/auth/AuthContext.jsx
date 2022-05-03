import axios from "axios";
import { createContext, useContext, useState } from "react";
import decode from "jwt-decode";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  function getToken() {
    // Retrieves the user token from localStorage
    return localStorage.getItem("token");
  }

  function getUser() {
    return decode(getToken()).user;
  }

  function finishAuthentication(token) {
    localStorage.setItem("token", token);
    setUser(getUser());
  }

  async function login({ user, password }, success, error) {
    console.log("Haciendo login con usuario", user);

    try {
      const { status, data } = await axios.get(
        `http://localhost:3001/login/${user}`
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

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
