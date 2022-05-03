import { Outlet } from "react-router-dom";
import Navbar from "./Navbar/Navbar";

export default function WithNavbar() {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
}
