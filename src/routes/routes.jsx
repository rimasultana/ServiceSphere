import { createBrowserRouter } from "react-router";
import MainLayout from "../layout/MainLayout";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      { path: "/", element: <h1>Home Page</h1> },
      { path: "about", element: <h1>About Page</h1> },
      { path: "contact", element: <h1>Contact Page</h1> },
      { path: "*", element: <h1>Page Not Found</h1> },
    ],
  },
]);

export default router;
