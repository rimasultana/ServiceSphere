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
import PrivateRoute from "./PrivateRoute";
import NotFound from "../components/NotFound";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <NotFound />,
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
        element: (
          <PrivateRoute>
            <ServiceDetails />
          </PrivateRoute>
        ),
      },
      {
        path: "/add-service",
        element: (
          <PrivateRoute>
            <AddService />
          </PrivateRoute>
        ),
      },
      {
        path: "/manage-service",
        element: (
          <PrivateRoute>
            <ManageService />
          </PrivateRoute>
        ),
      },
      {
        path: "dashboard/booked-services",
        element: (
          <PrivateRoute>
            <BookedServices />
          </PrivateRoute>
        ),
      },
      {
        path: "dashboard/service-to-do",
        element: (
          <PrivateRoute>
            <ServiceToDo />
          </PrivateRoute>
        ),
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "register",
        element: <Register />,
      },
    ],
  },
]);

export default router;
