import Navbar from "../components/Navbar";
import StaffCard from "../components/StaffCard";
import useAuth from "../hooks/useAuth";

export default function Staffs() {
  const { staffs } = useAuth();
  return (
    <div>
      <Navbar />
      <div className="container mx-auto p-2">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {staffs.map((staff) => (
            <StaffCard key={staff._id} staff={staff} />
          ))}
        </div>
      </div>
    </div>
  );
}
