import React from "react";
import { useNavigate } from "react-router-dom";
interface Staff {
  _id: number;
  name: string;
  bio: string;
  description: string;
  location: string;
  rate: string;
  services: string[];
  image: string;
}

interface StaffMiniCardProps {
  staff: Staff;
}

const StaffCard: React.FC<StaffMiniCardProps> = ({ staff }) => {
  const navigate = useNavigate();
  return (
    <div className="bg-gray-300 border hover:border-sky-400 rounded-md shadow-md p-5">
      <div className="md:flex items-center">
        <div>
          <img
            src={staff.image}
            alt={staff.name}
            className="w-24 rounded-full mx-auto"
          />
        </div>
        <div className="md:pl-5 mt-5 md:mt-0">
          <h2 className="text-xl font-bold">{staff.name}</h2>
          <h3 className="text-sm font-bold">{staff.bio}</h3>
          <h3 className="text-xs text-gray-600">{staff.location}</h3>
          <h4 className="text-sm text-gray-800">
            $ {Number(staff.rate).toLocaleString()}
          </h4>
        </div>
      </div>
      <p className="mt-5 text-justify text-sm text-gray-700 line-clamp-4">
        {staff.description}
      </p>

      <div className="flex flex-wrap gap-1 items-center my-2 text-xs h-32 lg:h-20">
        {staff.services.length > 3 ? (
          <>
            {staff.services.slice(0, 3).map((service) => (
              <p className="mr-2 border rounded-full p-2 border-gray-700">
                {service}
              </p>
            ))}
            <p>and {staff.services.length - 3} more...</p>
          </>
        ) : (
          staff.services.map((service) => (
            <p className="mr-2 border rounded-full p-2 border-gray-700">
              {service}
            </p>
          ))
        )}
      </div>
      <button
        onClick={() => {navigate(`/staff-details/${staff._id}`)}}
        className="bg-sky-600 hover:bg-sky-900 text-white rounded-full text-xs flex items-center py-2 px-3 my-2"
      >
        See Profile
      </button>
    </div>
  );
};

export default StaffCard;
