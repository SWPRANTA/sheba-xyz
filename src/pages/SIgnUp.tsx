import { useForm, SubmitHandler } from "react-hook-form";
import Navbar from "../components/Navbar";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import useAuth from "../hooks/useAuth";

type Inputs = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
};

export default function SignUp() {
  const [signUpErrorr, setSignUpError] = useState("");
  const { setUser } = useAuth();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = (data) => processSignUp(data);

  // Watch the password field to compare it with confirmPassword
  const password = watch("password");
  const processSignUp = (data: Inputs) => {
    const formData = {
      name: data.name,
      email: data.email,
      password: data.password,
      role: "user",
    };
    const btn = document.getElementById("signup_btn");
    if (btn) {
      btn.innerText = "Signing Up...";
      btn.setAttribute("disabled", "true");
    }

    const fetchData = async () => {
      try {
        const response = await fetch(
          `http://localhost:3001/user/registration`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
          }
        );
        const result = await response.json();
        if (result.status) {
          setUser(result.user);
          localStorage.setItem("uId", result.user._id);
          setSignUpError(result.message);
          if (result.user.role === "user") {
            navigate("/dashboard");
          } else if (result.user.role === "admin") {
            navigate("/admin-dashboard");
          } else if (result.user.role === "staff") {
            navigate("/staff-dashboard");
          }
          (document.getElementById("signup_form") as HTMLFormElement).reset();
          if (btn) {
            btn.removeAttribute("disabled");
            btn.innerText = "Sign Up";
          }
        } else {
          setSignUpError(result.message);
          (document.getElementById("signup_form") as HTMLFormElement).reset();
          if (btn) {
            btn.removeAttribute("disabled");
            btn.innerText = "Sign Up";
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
        id="signup_form"
        onSubmit={handleSubmit(onSubmit)}
        className="mx-auto flex content-center items-center lg:w-1/3 xl:w-1/2 w-full h-96 px-5"
      >
        <div className="w-full">
          <h1 className="text-center text-xl my-5">Create an Account</h1>
          <div className="my-2">
            <input
              type="text"
              placeholder="Your Name"
              autoComplete="name"
              className="w-full p-2 border-2 rounded border-sky-600 focus:outline-sky-900"
              {...register("name", { required: true })}
            />
            {errors.name && (
              <p className="text-red-500">Your Name is required</p>
            )}
          </div>

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
            <input
              type="password"
              placeholder="Confirm Password"
              autoComplete="current-password webauthn"
              className="w-full p-2 border-2 rounded border-sky-600 focus:outline-sky-900"
              {...register("confirmPassword", {
                required: true,
                validate: (value) =>
                  value === password || "Passwords does not match",
              })}
            />
            {errors.confirmPassword && (
              <p className="text-red-500">{errors.confirmPassword.message}</p>
            )}
          </div>
          <div className="my-2">
            <p className="my-5 text-red-500">{signUpErrorr}</p>
            <p className="my-5 text-sky-950">
              Already have an account?{" "}
              <Link to={"/login"} className="underline">
                Login
              </Link>
            </p>
            <button
              id="signup_btn"
              type="submit"
              className="w-full p-2 bg-sky-700 hover:bg-sky-800 text-white rounded-md"
            >
              Sign Up
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
