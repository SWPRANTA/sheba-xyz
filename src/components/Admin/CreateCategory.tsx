import { SubmitHandler, useForm } from "react-hook-form";
import { Bounce, toast } from "react-toastify";
import useAuth from "../../hooks/useAuth";

type Inputs = {
  name: string;
};

export default function CreateCategory() {
  const {setCategories} = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = (data) => processCreateCategory(data);

  const processCreateCategory = (data: Inputs) => {
    const formData = {
      name: data.name
    };
    const btn = document.getElementById("add_category_btn");
    if (btn) {
      btn.innerText = "Adding...";
      btn.setAttribute("disabled", "true");
    }

    const fetchData = async () => {
      try {
        const response = await fetch(
          `http://localhost:3001/category`,
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
              const response = await fetch("http://localhost:3001/categories");
              const result = await response.json();
              if (result.status) {
                setCategories(result.categories);
              } else {
                console.log(result.message);
              }
            } catch (error) {
              console.log(error);
            }
          };
          fetchData();

          (
            document.getElementById("add_category_form_admin") as HTMLFormElement
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
          btn.innerText = "Add";
        }
      }
    };
    fetchData();
  };

  return (
    <form
      id="add_category_form_admin"
      onSubmit={handleSubmit(onSubmit)}
      className="mx-auto xl:w-2/3 w-full"
    >
      <div className="my-2">
        <input
          type="text"
          placeholder="Category Name"
          autoComplete="name"
          className="w-full p-2 border-2 rounded border-sky-600 focus:outline-sky-900"
          {...register("name", { required: true })}
        />
        {errors.name && <p className="text-red-500">This field is required</p>}
      </div>

      
      <div className="my-2">
        <button
          id="add_category_btn"
          type="submit"
          className="w-full p-2 bg-sky-700 hover:bg-sky-800 text-white rounded-md"
        >
          Add
        </button>
      </div>
    </form>
  );
}
