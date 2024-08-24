import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import useAuth from "../hooks/useAuth";
import { useEffect } from "react";
import CreateUser from "../components/Admin/CreateUser";
import { ToastContainer } from "react-toastify";
import ViewUsers from "../components/Admin/ViewUsers";
import CreateCategory from "../components/Admin/CreateCAtegory";
import ViewCategory from "../components/Admin/ViewCategory";

const Admin = () => {
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

        <div className="grid lg:grid-cols-2 grid-cols-1 gap-8 my-10">
          {/* User Module */}
          <div className="min-w-full p-3 shadow rounded border text-center">
            <h2 className="felx items-center bg-slate-700 justify-center text-white">
              User Module
            </h2>
            <CreateUser />

            <ViewUsers />
          </div>

          {/* Category Module */}
          <div className="min-w-full p-3 shadow rounded border text-center">
            <h2 className="felx items-center bg-slate-700 justify-center text-white">
              Category Module
            </h2>
            <CreateCategory />

            <ViewCategory />
          </div>

          {/* Slot Module */}
          <div className="min-w-full p-3 shadow rounded border text-center">
            <h2 className="felx items-center bg-slate-700 justify-center text-white">
              Slot Module
            </h2>
            <CreateCategory />

            <ViewCategory />
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Admin;
