import { useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import { useEffect, useState } from "react";
import StaffAbout from "../components/StaffAbout";
import StaffReview from "../components/StaffReview";
import useAuth from "../hooks/useAuth";

const StaffDetails = () => {
  const { id } = useParams();
  const { bookedStaff, setBookedStaff } = useAuth();
  const [tab, setTab] = useState("About");
  const handleTabChange = (tabName: string) => {
    if (tab !== tabName) {
      setTab(tabName);
    }
  };
  console.log(tab);

  useEffect(() => {
    if (!bookedStaff?.name) {
      const fetchData = async () => {
        try {
          const response = await fetch(
            `http://localhost:3001/staff/service/${id}`
          );
          const result = await response.json();
          if (result.status) {
            setBookedStaff(result.staffDetails);
          } else {
            console.log(result.message);
          }
        } catch (error) {
          console.log(error);
        }
      };
      fetchData();
    }
  }, [id, setBookedStaff, bookedStaff]);

  return (
    <div>
      <Navbar />
      <div className="container mx-auto p-2">
        <div className="md:flex items-center mt-5 h-44">
          <div>
            <img
              src={bookedStaff?.image}
              alt={bookedStaff?.name}
              className="rounded-full w-32 h-32 shadow-md"
            />
          </div>
          <div className="md:ml-0 md:pl-5 mt-10">
            <h2 className="text-xl font-bold">{bookedStaff?.name}</h2>
            <h3 className="text-sm text-gray-600">{bookedStaff?.bio}</h3>
            <h4 className="text-sm text-gray-800">
              ৳ {Number(bookedStaff?.rate).toLocaleString()}
            </h4>
          </div>
        </div>

        <div className="mt-5 pt-5 md:pt-0">
          <button
            onClick={() => handleTabChange("About")}
            className={`text-lg font-bold tracking-wide border-b-2 p-2 
              ${
                tab === "About" ? "text-sky-600 border-sky-600" : "text-sky-950"
              }
              hover:border-sky-600`}
          >
            About
          </button>
          <button
            onClick={() => handleTabChange("Review")}
            className={`text-lg font-bold tracking-wide border-b-2 p-2 ms-5 
              ${
                tab === "Review"
                  ? "text-sky-600 border-sky-600"
                  : "text-sky-950"
              }
              hover:border-sky-600`}
          >
            ratings & Reviews
          </button>
        </div>
      </div>
      {tab === "About" && bookedStaff && <StaffAbout staff={bookedStaff} />}
      {tab === "Review" && <StaffReview />}
    </div>
  );
};
export default StaffDetails;
