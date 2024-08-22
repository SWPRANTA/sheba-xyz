import { useForm, SubmitHandler } from "react-hook-form";
import Navbar from "../components/Navbar";
import { Link } from "react-router-dom";

type Inputs = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
};

export default function SignUp() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = (data) => console.log(data);

  // Watch the password field to compare it with confirmPassword
  const password = watch("password");

  return (
    <div>
      <Navbar />
      <form
        id="signup_form"
        onSubmit={handleSubmit(onSubmit)}
        className="mx-auto flex content-center items-center lg:w-1/3 xl:w-1/2 w-full h-96 px-5"
      >
        <div className="w-full">
          <h1 className="text-center text-xl my-5">Sign Up</h1>
          <div className="my-2">
            <input
              type="text"
              placeholder="Your Name"
              autoComplete="name"
              className="w-full p-2 border-2 rounded border-sky-600 focus:outline-sky-900"
              {...register("name", { required: true })}
            />
            {errors.name && <p className="text-red-500">Your Name is required</p>}
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
            {errors.password && <p className="text-red-500">Password is required</p>}
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
                  value === password || "Passwords do not match",
              })}
            />
            {errors.confirmPassword && (
              <p className="text-red-500">{errors.confirmPassword.message}</p>
            )}
          </div>
          <div className="my-2">
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
