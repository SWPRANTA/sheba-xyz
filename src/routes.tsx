import { createBrowserRouter } from "react-router-dom";
import Home from "./pages/Home";
import Error from "./pages/Error";
import Login from "./pages/Login";
import Services from "./pages/Services";
import Staffs from "./pages/Staffs";
import ServiceDetails from "./pages/ServiceDetails";
import StaffDetails from "./pages/StaffDetails";
import SignUp from "./pages/SignUp";

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
    element: <SignUp />,
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
  {
    path: "/staff-details/:id",
    element: <StaffDetails />,
    errorElement: <Error />,
  },
]);
