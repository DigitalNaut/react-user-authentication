import decode from "jwt-decode";
import axios from "axios";

export function getTokenExpirationDate(token) {
  const decoded = decode(token);

  if (!decoded.exp) return null;

  const date = new Date(0);
  date.setUTCSeconds(decoded.exp);

  return date;
}

export function getToken() {
  // Recupera el token del localStorage
  return localStorage.getItem("token");
}

export function setToken(token) {
  localStorage.setItem("token", token);
}

export function isTokenExpired(token) {
  const date = getTokenExpirationDate(token);

  if (date === null) return false;

  return !(date.valueOf() > new Date().valueOf);
}

export function getUser(token) {
  try {
    return decode(token).user;
  } catch (error) {
    return null;
  }
}

// Permite incluir el token de sesión en cada llamada al backend
export function initAxiosInterceptors() {
  axios.interceptors.request.use(
    (config) => {
      const token = getToken();

      // Revisa la petición en la página http://localhost:3000/gallery
      // Verás que contiene el token de autorización del usuario en el header
      if (token) config.headers.Authorization = `Bearer ${token}`;

      return config;
    },
    (error) => {
      console.error("Ocurrió un error en la petición:", error);
    }
  );
}
