import { useForm, SubmitHandler } from "react-hook-form";
import Navbar from "../components/Navbar";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import useAuth from "../hooks/useAuth";

type Inputs = {
  email: string;
  password: string;
};

export default function Login() {
  const { user, setUser } = useAuth();
  const [loginErrorr, setLoginError] = useState("");
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";
  const navigate = useNavigate();
  useEffect(() => {
    if (user) {
      navigate(from, { replace: true });
    }
  }, [user, navigate, from]);
  
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = (data) => processLogIn(data);

  const processLogIn = (data: Inputs) => {
    const formData = {
      email: data.email,
      password: data.password,
    };
    const btn = document.getElementById("login_btn");
    if (btn) {
      btn.innerText = "Logging In...";
      btn.setAttribute("disabled", "true");
    }

    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:3001/user/login`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        });
        const result = await response.json();
        if (result.status) {
          setUser(result.user);
          setLoginError(result.message);
          localStorage.setItem("uId", result.user._id);
          if (result.user.role === "user") {
            navigate("/services");
          }else if (result.user.role === "admin") {
            navigate("/admin-dashboard");
          }else if (result.user.role === "staff") {
            navigate("/staff-dashboard");
          }

          (document.getElementById("login_form") as HTMLFormElement).reset();
          if (btn) {
            btn.removeAttribute("disabled");
            btn.innerText = "Log In";
          }
        } else {
          setLoginError(result.message);
          (document.getElementById("login_form") as HTMLFormElement).reset();
          if (btn) {
            btn.removeAttribute("disabled");
            btn.innerText = "Log In";
          }
        }
      } catch (error) {
        console.log(error);
        fetchData();
      }
    };
    fetchData();
  };

  return (
    <div>
      <Navbar />
      <form
        id="login_form"
        onSubmit={handleSubmit(onSubmit)}
        className="mx-auto flex content-center items-center lg:w-1/3 xl:w-1/2 w-full h-96 px-5"
      >
        <div className="w-full">
          <h1 className="text-center text-xl my-5">Sign In</h1>
          <div className="my-2">
            <input
              type="email"
              placeholder="Enter Email"
              autoComplete="email"
              className="w-full p-2 border-2 rounded border-sky-600 focus:outline-sky-900"
              {...register("email", { required: true })}
            />
            {errors.email && <p className="text-red-500">Email is required</p>}
          </div>
          <div className="my-2">
            <input
              type="password"
              placeholder="Enter Password"
              autoComplete="current-password"
              className="w-full p-2 border-2 rounded border-sky-600 focus:outline-sky-900"
              {...register("password", { required: true })}
            />
            {errors.password && (
              <p className="text-red-500">Password is required</p>
            )}
          </div>
          <div className="my-2">
            <p className="my-5 text-red-500">{loginErrorr}</p>
            <p className="my-5 text-sky-950">
              Don't have an account?{" "}
              <Link to={"/signup"} className="underline">
                Register as user
              </Link>
            </p>
            <button
              id="login_btn"
              type="submit"
              className="w-full p-2 bg-sky-700 hover:bg-sky-800 text-white rounded-md"
            >
              Sign In
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
