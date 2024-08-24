import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import useAuth from "../hooks/useAuth";
import { useEffect } from "react";

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
        <div className="">
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
      </div>
    </div>
  );
};

export default StaffDashboard;
