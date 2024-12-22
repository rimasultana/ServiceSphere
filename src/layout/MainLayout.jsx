import { Outlet } from "react-router";
const MainLayout = () => {
  return (
    <>
      <h1>this is nav</h1>
      <Outlet />
      <h1>this is footer</h1>
    </>
  );
};

export default MainLayout;
