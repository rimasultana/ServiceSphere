import { Outlet } from "react-router";
import Navbar from "../components/Navbar";
const MainLayout = () => {
  return (
    <>
      <h1>this is nav</h1>
      <Navbar />
      <Outlet />
      <h1>this is footer</h1>
    </>
  );
};

export default MainLayout;
