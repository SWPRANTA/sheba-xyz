import { SubmitHandler, useForm } from "react-hook-form";
import { Bounce, toast } from "react-toastify";
import useAuth from "../../hooks/useAuth";

type Inputs = {
  name: string;
  category: string;
  details: string;
  image: string;
  attribute: string;
  attributeTitle: string;
};

export default function CreateService() {
  const { setServices, categories } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = (data) => processCreateService(data);

  const processCreateService = (data: Inputs) => {
    const formData = {
      name: data.name,
      category: data.category,
      details: data.details,
      image: data.image,
      attribute: data.attribute,
      attributeTitle: data.attributeTitle

    };
    const btn = document.getElementById("add_service_btn");
    if (btn) {
      btn.innerText = "Adding...";
      btn.setAttribute("disabled", "true");
    }

    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:3001/service`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        });
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
              const response = await fetch("http://localhost:3001/services");
              const result = await response.json();
              if (result.status) {
                setServices(result.services);
              } else {
                console.log(result.message);
              }
            } catch (error) {
              console.log(error);
            }
          };
          fetchData();

          (
            document.getElementById("add_service_form_admin") as HTMLFormElement
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
      id="add_service_form_admin"
      onSubmit={handleSubmit(onSubmit)}
      className="mx-auto xl:w-2/3 w-full"
    >
      <div className="my-2">
        <input
          type="text"
          placeholder="Service Name"
          className="w-full p-2 border-2 rounded border-sky-600 focus:outline-sky-900"
          {...register("name", { required: true })}
        />
        {errors.name && <p className="text-red-500">This field is required</p>}
      </div>

      <div className="my-2">
        <select
          {...register("category", { required: true })}
          defaultValue={``}
          className="w-full p-2 border-2 rounded border-sky-600 focus:outline-sky-900"
        >
          <option value="" disabled>
            Select Category
          </option>
          {categories.map((category) => (
            <option key={category._id} value={category.name}>
              {category.name}
            </option>
          ))}
        </select>
        {errors.category && (
          <p className="text-red-500">This field is required</p>
        )}
      </div>

      <div className="my-2">
        <textarea
          placeholder="Service Description..."
          className="w-full p-2 border-2 rounded border-sky-600 focus:outline-sky-900 min-h-24"
          {...register("details", { required: true })}
        />
        {errors.details && (
          <p className="text-red-500">This field is required</p>
        )}
      </div>

      <div className="my-2">
        <input
          type="text"
          placeholder="Image Url"
          className="w-full p-2 border-2 rounded border-sky-600 focus:outline-sky-900"
          {...register("image", { required: true })}
        />
        {errors.image && <p className="text-red-500">This field is required</p>}
      </div>

      <div className="my-2">
        <input
          type="text"
          placeholder="Image Attribute Link"
          className="w-full p-2 border-2 rounded border-sky-600 focus:outline-sky-900"
          defaultValue={``}
          {...register("attribute")}
        />
      </div>

      <div className="my-2">
        <input
          type="text"
          placeholder="Image Attribute Text"
          className="w-full p-2 border-2 rounded border-sky-600 focus:outline-sky-900"
          defaultValue={``}
          {...register("attributeTitle")}
        />
      </div>

      <div className="my-2">
        <button
          id="add_service_btn"
          type="submit"
          className="w-full p-2 bg-sky-700 hover:bg-sky-800 text-white rounded-md"
        >
          Add
        </button>
      </div>
    </form>
  );
}
