import { useForm, SubmitHandler } from "react-hook-form";
import Navbar from "../components/Navbar";
import { Link } from "react-router-dom";

type Inputs = {
  email: string;
  password: string;
};

export default function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = (data) => console.log(data);

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
