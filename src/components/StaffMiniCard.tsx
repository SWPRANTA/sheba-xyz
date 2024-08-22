import React from "react";
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

const StaffMiniCard: React.FC<StaffMiniCardProps> = ({ staff }) => {
  return (
    <div className="bg-gray-50 border hover:border-sky-400 rounded-md shadow-md p-2">
      <div className="items-center">
        <img
          src={staff.image}
          alt={staff.name}
          className="w-16 mx-auto rounded-full"
        />
        <div className="mt-2">
            <h2 className="font-bold text-center">{staff.name}</h2>
            <h2 className="text-center text-xs py-1 line-clamp-1">{staff.bio}</h2>
            <h3 className="text-center text-sm text-gray-600">৳ {Number(staff.rate).toLocaleString()}</h3>
        </div>

        <div className="flex lg:block xl:flex items-center justify-between mt-3">
            <button  className="bg-green-600 hover:bg-green-900 text-white rounded-full text-xs flex items-center py-2 px-3 my-2 mx-auto">Book Now</button>
            <button className="bg-sky-600 hover:bg-sky-900 text-white rounded-full text-xs flex items-center py-2 px-3 my-2 mx-auto">View Full Profile</button>
        </div>
      </div>
    </div>
  );
};

export default StaffMiniCard;
