import Home from "../pages/Home";
import { createBrowserRouter } from "react-router";
import MainLayout from "../layout/MainLayout";
import Services from "../pages/Services";
import AddService from "../pages/AddService";
import ManageService from "../pages/ManageService";
import BookedServices from "../pages/BookedServices";
import ServiceToDo from "../pages/ServiceToDo";
import Login from "../pages/Login";
import Register from "../pages/Register";
import ServiceDetails from "../pages/ServiceDetails";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <h1>Something went wrong</h1>,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "services",
        element: <Services />,
      },
      {
        path: "services/:id",
        element: <ServiceDetails />,
      },
      {
        path: "dashboard/add-service",
        element: <AddService />,
      },
      {
        path: "dashboard/manage-service",
        element: <ManageService />,
      },
      {
        path: "dashboard/booked-services",
        element: <BookedServices />,
      },
      {
        path: "dashboard/service-to-do",
        element: <ServiceToDo />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "register",
        element: <Register />,
      },
      {
        path: "*",
        element: <h1>Page Not Found</h1>,
      },
    ],
  },
]);

export default router;
