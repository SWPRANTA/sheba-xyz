import React from "react";
import useAuth from "../hooks/useAuth";
interface Staff {
  _id: string;
  name: string;
  bio: string;
  description: string;
  location: string;
  rate: string;
  services: string[];
  image: string;
}

interface StaffAboutProps {
  staff: Staff;
}

const formatTime = (timeString: string) => {
  const [hours, minutes] = timeString.split(":");
  const formattedHours = Number(hours) % 12 || 12;
  const formattedMinutes = minutes;
  const period = Number(hours) < 12 ? "AM" : "PM";
  return `${formattedHours}:${formattedMinutes} ${period}`;
};
const StaffAbout: React.FC<StaffAboutProps> = ({ staff }) => {
  const {services, slots} = useAuth();
  const categories = [
    ...new Set(
      staff.services.map(
        (staffService) =>
          services.find((service) => service.name === staffService)?.category
      )
    ),
  ];

  console.log(categories);

  return (
    <div className="py-10 bg-gray-200">
      <div className="container mx-auto p-2">
        <div className="grid grid-cols-1 md:grid-cols-2">
          <div>
            {/* Policies */}
            <div className="bg-white border rounded-md p-5 w-full md:w-11/12">
              <h2 className="text-xl font-bold">Policies</h2>
              <div className="flex items-center mt-5">
                <div className="">
                  <img
                    src="../../public/images/location.svg"
                    alt="location icon"
                    className="w-5"
                  />
                </div>
                <div className="ms-3 text-xs">
                  <p className="text-gray-500">From</p>
                  <p className="mt-1">{staff.location}</p>
                </div>
              </div>

              <div className="flex items-center mt-5">
                <div className="">
                  <img
                    src="../../public/images/taka.svg"
                    alt="taka icon"
                    className="w-5"
                  />
                </div>
                <div className="ms-3 text-xs">
                  <p className="text-gray-500">Service Rate</p>
                  <p className="mt-1">৳ {staff.rate}</p>
                </div>
              </div>
            </div>
            {/* //Service Slots */}
            <div className="bg-white border rounded-md p-5 w-full md:w-11/12 mt-3">
              <h2 className="text-xl font-bold">Service Slots</h2>
              <div className="divide-y divide-slate-300">
                {slots.map((slot) => (
                  <div
                    key={slot._id}
                    className="grid grid-cols-2 items-center content-between"
                  >
                    <div className="text-sm py-2 text-gray-500">
                      {slot.label}
                    </div>
                    <div className="text-end py-2 text-sm text-gray-500">
                      {formatTime(slot.start_time)} -{" "}
                      {formatTime(slot.end_time)}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="pt-5 md:pt-0">
            <h2 className="text-xl font-bold">Staff Information</h2>
            <p className="text-justify text-sm leading-6 mt-3 text-gray-500">
              {staff.description}
            </p>

            <div className="border rounded-md bg-white mt-5 p-5">
                <h2 className="text-xl font-bold">Categories</h2>
                <div className="flex mt-5 flex-wrap gap-2">
                    {
                        categories.map((category, index) => (
                            <p key={index} className="text-sm mr-2 p-2 text-gray-500 border border-gray-500 rounded-full">
                                {category}
                            </p>
                        ))
                    }
                </div>
            </div>

            <div className="border rounded-md bg-white mt-5 p-5">
                <h2 className="text-xl font-bold">Services</h2>
                <div className="flex mt-5 flex-wrap gap-2">
                    {
                        staff.services.map((service, index) => (
                            <p key={index} className="text-sm mr-2 p-2 text-gray-500 border border-gray-500 rounded-full">
                                {service}
                            </p>
                        ))
                    }
                </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default StaffAbout;
