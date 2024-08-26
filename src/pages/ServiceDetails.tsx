import { useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import StaffMiniCard from "../components/StaffMiniCard";
import useAuth from "../hooks/useAuth";
import { useEffect } from "react";

export default function ServiceDetails() {
  const { bookedService, setBookedService, user, staffs } = useAuth();

  const { id } = useParams();
  useEffect(() => {
    if (!bookedService?.name) {
      const fetchData = async () => {
        try {
          const response = await fetch(`http://localhost:3001/service/${id}`);
          const result = await response.json();
          if (result.status) {
            setBookedService(result.service);
          } else {
            console.log(result.message);
          }
        } catch (error) {
          console.log(error);
        }
      };
      fetchData();
    }
  }, [id, setBookedService, bookedService]);
  return (
    <div>
      <Navbar />
      <div className="container mx-auto p-2">
        <h1 className="text-lg lg:text-2xl font-bold my-3 lg:my-4">
          {bookedService?.name}
        </h1>
        <div className="grid grid-cols-1 lg:grid-cols-2">
          <div className="w-full py-2">
            <img
              src={bookedService?.image}
              alt={bookedService?.name}
              className="rounded-lg shadow-lg mx-auto max-w-full max-h-64"
            />

            <h2 className="mt-5 py-2 font-bold">Description</h2>
            <h2 className="text-justify">{bookedService?.details}</h2>
          </div>
          {user?.role === 'user' || !user?.role? (
            <div>
              <h2 className="py-2 font-bold">Service Providers</h2>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 mt-5">
                {staffs
                  .filter(
                    (staff) =>
                      bookedService?.name &&
                      staff.services.includes(bookedService.name)
                  )
                  .map((staff) => (
                    <StaffMiniCard key={staff._id} staff={staff} />
                  ))}
              </div>
            </div>
          ) : (
            <div>Log in as a user to book a service</div>
          )}
        </div>
      </div>
    </div>
  );
}
