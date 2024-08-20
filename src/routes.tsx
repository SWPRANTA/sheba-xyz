import { createBrowserRouter } from "react-router-dom";
import Home from "./pages/Home";
import Error from "./pages/Error";
import Login from "./pages/Login";
import SIgnUp from "./pages/SIgnUp";
import Services from "./pages/Services";
import Staffs from "./pages/Staffs";
import ServiceDetails from "./pages/ServiceDetails";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    errorElement: <Error />,
  },
  {
    path: "/login",
    element: <Login />,
    errorElement: <Error />,
  },
  {
    path: "/signup",
    element: <SIgnUp />,
    errorElement: <Error />,
  },
  {
    path: "/services",
    element: <Services />,
    errorElement: <Error />,
  },
  {
    path: "/service-details/:id",
    element: <ServiceDetails />,
    errorElement: <Error />,
  },
  {
    path: "/staffs",
    element: <Staffs />,
    errorElement: <Error />,
  },
]);
