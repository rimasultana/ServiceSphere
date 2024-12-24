import { Outlet } from "react-router";
import Navbar from "../components/Navbar";
const MainLayout = () => {
  return (
    <>
      <Navbar />
      <main className="w-11/12 mx-auto min-h-screen">
        <Outlet />
      </main>
      <h1>this is footer</h1>
    </>
  );
};

export default MainLayout;
