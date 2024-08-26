import { SubmitHandler, useForm } from "react-hook-form";
import { Bounce, toast } from "react-toastify";
import useAuth from "../../hooks/useAuth";

type Inputs = {
  staffId: string;
  label: string;
  start_time: string;
  end_time: string;
};

export default function CreateSlot() {
  const { setSlots } = useAuth();
  const uId = localStorage.getItem("uId");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = (data) => processCreateSlot(data);

  const processCreateSlot = (data: Inputs) => {
    const formData = {
      staffId: uId,
      label: data.label,
      start_time: data.start_time,
      end_time: data.end_time,
    };

    const btn = document.getElementById("add_slot_btn");
    if (btn) {
      btn.innerText = "Adding...";
      btn.setAttribute("disabled", "true");
    }

    const fetchData = async () => {
      try {
        const response = await fetch(
          `http://localhost:3001/staff/${uId}/slot`,
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
              const response = await fetch("http://localhost:3001/staff/slots");
              const result = await response.json();
              if (result.status) {
                setSlots(result.slots);
              } else {
                console.log(result.message);
              }
            } catch (error) {
              console.log(error);
            }
          };
          fetchData();

          (
            document.getElementById("add_slot_form_admin") as HTMLFormElement
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
        console.log(error);
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
      id="add_slot_form_admin"
      onSubmit={handleSubmit(onSubmit)}
      className="mx-auto xl:w-2/3 w-full"
    >
      <div className="my-2">
        <input
          type="text"
          placeholder="Slot Label"
          className="w-full p-2 border-2 rounded border-sky-600 focus:outline-sky-900"
          {...register("label", { required: true })}
        />
        {errors.label && <p className="text-red-500">Label is required</p>}
      </div>
      <div className="my-2">
        <input
          type="time"
          placeholder="Start Time"
          className="w-full p-2 border-2 rounded border-sky-600 focus:outline-sky-900"
          {...register("start_time", { required: true })}
        />
        {errors.start_time && <p className="text-red-500">Start time is required</p>}
      </div>
      <div className="my-2">
        <input
          type="time"
          placeholder="End Time"
          className="w-full p-2 border-2 rounded border-sky-600 focus:outline-sky-900"
          {...register("end_time", { required: true })}
        />
        {errors.end_time && <p className="text-red-500">End time is required</p>}
      </div>
      <div className="my-2">
        <button
          id="add_slot_btn"
          type="submit"
          className="w-full p-2 bg-sky-700 hover:bg-sky-800 text-white rounded-md"
        >
          Add
        </button>
      </div>
    </form>
  );
}
