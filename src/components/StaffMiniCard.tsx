import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import BookingModal from "./BookingModal";
import useAuth from "../hooks/useAuth";
interface Staff {
  _id: string;
  name: string;
  bio: string;
  category: string;
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
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { setBookedStaff, setBookedSlot } = useAuth();

  const openModal = () => {
    setIsModalOpen(true);
    setBookedStaff(staff)
  };
  const closeModal = () => {
    setIsModalOpen(false);
    setBookedStaff(null);
    setBookedSlot(null);
    
  };

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
          <h3 className="text-center text-sm text-gray-600">
            ৳ {Number(staff.rate).toLocaleString()}
          </h3>
        </div>

        <div className="flex lg:block xl:flex items-center justify-between mt-3">
          <button
            onClick={openModal}
            className="bg-green-600 hover:bg-green-900 text-white rounded-full text-xs flex items-center py-2 px-3 my-2 mx-auto"
          >
            Book Now
          </button>
          <button
            onClick={() => {
              navigate(`/staff-details/${staff._id}`);
            }}
            className="bg-sky-600 hover:bg-sky-900 text-white rounded-full text-xs flex items-center py-2 px-3 my-2 mx-auto"
          >
            View Full Profile
          </button>
        </div>
      </div>

      <BookingModal isOpen={isModalOpen} onClose={closeModal}>
        <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t">
          <h3 className="text-lg font-semibold text-gray-900">
            Available Service Slots
          </h3>
          <button
            onClick={closeModal}
            className="text-gray-400 bg-transparent hover:bg-gray-300 hover:text-gray-900 rounded-lg text-sm h-8 w-8 ms-auto inline-flex items-center justify-center"
          >
            <img
              src="../../public/images/icons/cross-svgrepo-com.svg"
              alt="exit btn"
              className="w-4"
            />
          </button>
        </div>
      </BookingModal>
    </div>
  );
};
export default StaffMiniCard;
