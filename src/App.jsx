import { Routes, Route } from "react-router-dom";

import "./App.css";
import Blurb from "./components/Blurb/Blurb";
import Navbar from "./components/Navbar/Navbar";
import Login from "./components/Login/Login";
import Profile from "./components/Profile/Profile";
import ProtectedRoutes from "./components/ProtectedRoutes";
import Logout from "./components/Logout/Logout";

export default function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/" element={<Blurb />} />
        <Route path="/profile" element={<ProtectedRoutes />}>
          <Route path="" element={<Profile />} />
        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="*" element={<h1>404 No encontrado</h1>} />
      </Routes>
    </div>
  );
}
