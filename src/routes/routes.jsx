import { createBrowserRouter } from "react-router";
import MainLayout from "../layout/MainLayout";
import Home from "../pages/Home";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      { path: "/", element: <Home /> },
      { path: "about", element: <h1>About Page</h1> },
      { path: "contact", element: <h1>Contact Page</h1> },
      { path: "*", element: <h1>Page Not Found</h1> },
    ],
  },
]);

export default router;
