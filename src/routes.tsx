import { createBrowserRouter } from "react-router-dom";
import Home from "./pages/Home";
import Error from "./pages/Error";
import Login from "./pages/Login";
import Services from "./pages/Services";
import Staffs from "./pages/Staffs";
import ServiceDetails from "./pages/ServiceDetails";
import StaffDetails from "./pages/StaffDetails";
import SignUp from "./pages/SignUp";
import PrivateOutlet from "./components/PrivateOutlet";
import DashBoard from "./pages/DashBoard";
import AdminDashboard from "./pages/AdminDashboard";
import StaffDashboard from "./pages/StaffDashboard";

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
    path: "/staff-details/:id",
    element: <StaffDetails />,
    errorElement: <Error />,
  },
  {
    path: "/staffs",
    element: <Staffs />,
    errorElement: <Error />,
  },

  //Private routes
  {
    path: "/staff-dashboard",
    element: <PrivateOutlet />, // Protect the dashboard route
    children: [
      {
        path: "/staff-dashboard", // or any child routes of the dashboard
        element: <StaffDashboard />,
      },
    ],
    errorElement: <Error />,
  },
  {
    path: "/admin-dashboard",
    element: <PrivateOutlet />, // Protect the dashboard route
    children: [
      {
        path: "/admin-dashboard", // or any child routes of the dashboard
        element: <AdminDashboard/>,
      },
    ],
    errorElement: <Error />,
  },
  {
    path: "/dashboard",
    element: <PrivateOutlet />, // Protect the dashboard route
    children: [
      {
        path: "/dashboard", // or any child routes of the dashboard
        element: <DashBoard />,
      },
    ],
    errorElement: <Error />,
  },
]);
