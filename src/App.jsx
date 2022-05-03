import { Routes, Route } from "react-router-dom";

import "./App.css";
import Blurb from "./components/Blurb/Blurb";
import Login from "./components/Login/Login";
import Profile from "./components/Profile/Profile";
import ProtectedRoutes from "./components/ProtectedRoutes";
import WithNavbar from "./components/WithNavbar";
import Logout from "./components/Logout/Logout";
import Gallery from "./components/Gallery/Gallery";

export default function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Blurb />} />
        <Route path="/" element={<WithNavbar />}>
          <Route path="" element={<ProtectedRoutes />}>
            <Route path="profile" element={<Profile />} />
            <Route path="gallery" element={<Gallery />} />
          </Route>
          <Route path="/login" element={<Login />} />
          <Route path="/logout" element={<Logout />} />
        </Route>
        <Route path="*" element={<h1>404 No encontrado</h1>} />
      </Routes>
    </div>
  );
}
