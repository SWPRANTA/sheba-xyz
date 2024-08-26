import { SubmitHandler, useForm } from "react-hook-form";
import { Bounce, toast } from "react-toastify";
import useAuth from "../../hooks/useAuth";
import { useState } from "react";

type Inputs = {
  name: string;
  bio: string;
  description: string;
  location: string;
  rate: string;
  category: string;
  services: string[];
  image: string;
};

export default function CreateServiceStaff() {
  const [servicesArray, setServicesArray] = useState<string[]>([]);
  const { users, setStaffs, categories } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = (data) => {
    const formData = {
      ...data,
      services: servicesArray, // Include the services array
    };
    processCreateServiceStaff(formData);
  };

  const processCreateServiceStaff = (data: Inputs) => {
    const btn = document.getElementById("add_service_btn_staff");
    if (btn) {
      btn.innerText = "Adding...";
      btn.setAttribute("disabled", "true");
    }

    const fetchData = async () => {
      try {
        const response = await fetch(
          `http://localhost:3001/add-services/staff`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
          }
        );
        const result = await response.json();
        console.log(data);

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
              const response = await fetch(
                "http://localhost:3001/staff/services"
              );
              const result = await response.json();
              if (result.status) {
                setStaffs(result.staffDetails);
              } else {
                console.log(result.message);
              }
            } catch (error) {
              console.log(error);
            }
          };
          fetchData();

          (
            document.getElementById(
              "add_service_staff_form_admin"
            ) as HTMLFormElement
          ).reset();
          setServicesArray([]);
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
  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      event.preventDefault();
      const serviceName = event.currentTarget.value.trim();
      if (serviceName && !servicesArray.includes(serviceName)) {
        setServicesArray([...servicesArray, serviceName]);
        event.currentTarget.value = ""; // Clear input after adding
      }
    }
  };

  return (
    <form
      id="add_service_staff_form_admin"
      onSubmit={handleSubmit(onSubmit)}
      className="mx-auto xl:w-2/3 w-full"
    >
      {/* Staff Name */}
      <div className="my-2">
        <select
          {...register("name", { required: true })}
          defaultValue={``}
          className="w-full p-2 border-2 rounded border-sky-600 focus:outline-sky-900"
        >
          <option value="" disabled>
            Select Staff
          </option>
          {users.map(
            (user) =>
              user.role === "staff" && (
                <option key={user._id} value={user.name}>
                  {user.name}
                </option>
              )
          )}
        </select>
        {errors.name && <p className="text-red-500">This field is required</p>}
      </div>

      {/* Service category */}
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
        {errors.category && <p className="text-red-500">Which category?</p>}
      </div>

      {/* Display the list of services */}
      <div className="my-1">
        <h4 className="text-xs font-normal">Services:</h4>
        <ul className="list-disc pl-5">
          {servicesArray.map((service, index) => (
            <li key={index}>{service}</li>
          ))}
        </ul>
      </div>

      {/* Services */}
      <div className="my-2">
        <input
          type="text"
          placeholder="Service Name"
          className="w-full p-2 border-2 rounded border-sky-600 focus:outline-sky-900"
          onKeyDown={handleKeyPress}
        />
        {errors.services && <p className="text-red-500">What services?</p>}
      </div>

      {/* Staff Bio */}
      <div className="my-2">
        <textarea
          placeholder="Bio..."
          className="w-full p-2 border-2 rounded border-sky-600 focus:outline-sky-900 min-h-7"
          {...register("bio", { required: true })}
        />
        {errors.bio && <p className="text-red-500">Put something in the bio</p>}
      </div>

      {/* Staff Description */}
      <div className="my-2">
        <textarea
          placeholder="Service Description..."
          className="w-full p-2 border-2 rounded border-sky-600 focus:outline-sky-900 min-h-24"
          {...register("description", { required: true })}
        />
        {errors.description && (
          <p className="text-red-500">This field is required</p>
        )}
      </div>

      {/* Staff Location */}
      <div className="my-2">
        <input
          type="text"
          placeholder="Location"
          className="w-full p-2 border-2 rounded border-sky-600 focus:outline-sky-900"
          {...register("location", { required: true })}
        />
        {errors.location && (
          <p className="text-red-500">This field is required</p>
        )}
      </div>

      {/* Staff Rate */}
      <div className="my-2">
        <input
          type="number"
          placeholder="Rate"
          className="w-full p-2 border-2 rounded border-sky-600 focus:outline-sky-900"
          {...register("rate", { required: true })}
        />
        {errors.rate && <p className="text-red-500">This field is required</p>}
      </div>

      {/* Staff Image Url */}
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
        <button
          id="add_service_btn_staff"
          type="submit"
          className="w-full p-2 bg-sky-700 hover:bg-sky-800 text-white rounded-md"
        >
          Add
        </button>
      </div>
    </form>
  );
}
