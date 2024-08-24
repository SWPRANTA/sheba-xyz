import { SubmitHandler, useForm } from "react-hook-form";
import { Bounce, toast } from "react-toastify";
import useAuth from "../../hooks/useAuth";

type Inputs = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  role: string;
};

export default function CreateUser() {
  const {setUsers} = useAuth();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = (data) => processSignUp(data);
  const password = watch("password");

  const processSignUp = (data: Inputs) => {
    const formData = {
      name: data.name,
      email: data.email,
      password: data.password,
      role: data.role,
    };
    const btn = document.getElementById("signup_btn_admin");
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
          toast.success(`${result.message}`, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            transition: Bounce,
          });
          const fetchData = async () => {
            try {
              const response = await fetch("http://localhost:3001/users");
              const result = await response.json();
              if (result.status) {
                setUsers(result.users);
              } else {
                console.log(result.message);
              }
            } catch (error) {
              console.log(error);
            }
          };
          fetchData();

          (
            document.getElementById("signup_form_admin") as HTMLFormElement
          ).reset();
        } else {
          toast.error(`${result.message}`, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            transition: Bounce,
          });
        }
      } catch (error) {
        toast.error(`${error}`, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          transition: Bounce,
        });
      } finally {
        if (btn) {
          btn.removeAttribute("disabled");
          btn.innerText = "Sign Up";
        }
      }
    };
    fetchData();
  };

  return (
    <form
      id="signup_form_admin"
      onSubmit={handleSubmit(onSubmit)}
      className="mx-auto xl:w-2/3 w-full"
    >
      <div className="my-2">
        <input
          type="text"
          placeholder="User's Name"
          autoComplete="name"
          className="w-full p-2 border-2 rounded border-sky-600 focus:outline-sky-900"
          {...register("name", { required: true })}
        />
        {errors.name && <p className="text-red-500">User's name is required</p>}
      </div>

      <div className="my-2">
        <input
          type="email"
          placeholder="User's Email"
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
            validate: (value) => value === password || "Passwords do not match",
          })}
        />
        {errors.confirmPassword && (
          <p className="text-red-500">{errors.confirmPassword.message}</p>
        )}
      </div>
      <div className="my-2">
        <select
          {...register("role", { required: true })}
          defaultValue={``}
          className="w-full p-2 border-2 rounded border-sky-600 focus:outline-sky-900"
        >
          <option value="" disabled>
            Select User Role
          </option>
          <option value="user">User</option>
          <option value="staff">Staff</option>
          <option value="admin">Admin</option>
        </select>
      </div>
      <div className="my-2">
        <button
          id="signup_btn_admin"
          type="submit"
          className="w-full p-2 bg-sky-700 hover:bg-sky-800 text-white rounded-md"
        >
          Sign Up
        </button>
      </div>
    </form>
  );
}
