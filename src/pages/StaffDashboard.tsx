import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import useAuth from "../hooks/useAuth";
import { useEffect } from "react";
import StaffPayment from "../components/Staff/StaffPayment";
import StaffAppointments from "../components/Staff/StaffAppointments";

const StaffDashboard = () => {
  const { user, logOut } = useAuth();
  const navigate = useNavigate();
  useEffect(() => {
    if (user?.role === "user") {
      navigate("/dashboard");
    } else if (user?.role === "admin") {
      navigate("/admin-dashboard");
    } else if (user?.role === "staff") {
      navigate("/staff-dashboard");
    }
  }, [user?.role, navigate]);
  return (
    <div>
      <Navbar />
      <div className="container mx-auto p-2">
        <div className="flex justify-between items-center mt-10">
          <h1>
            Welcome{" "}
            <span className="capitalize text-sky-500">{user?.name}</span>
          </h1>
          <button
            onClick={logOut}
            className="border p-2 rounded-md text-white bg-rose-600 hover:bg-rose-800"
          >
            Log Out
          </button>
        </div>

        <div className="w-full grid grid-cols-1 gap-10 mt-5">
          <div className="shadow p-2 rounded border border-purple-600">
            <h2 className="">Payments History</h2>
            <StaffPayment />
          </div>

          <div className="shadow p-2 rounded border border-lime-600">
            <h2 className="">Appointments History</h2>
            <StaffAppointments />
          </div>
        </div>
      </div>
    </div>
  );
};

export default StaffDashboard;
