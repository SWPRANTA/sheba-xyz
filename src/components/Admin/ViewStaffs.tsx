import { toast } from "react-toastify";
import useAuth from "../../hooks/useAuth";

const ViewStaffs = () => {
  const { staffs, setStaffs } = useAuth();
  
  const handleDeleteStaffService = async (id: string) => {
    const response = await fetch(`http://localhost:3001/staff/service/${id}`, {
      method: "DELETE",
    });
    const result = await response.json();
    if (result.status) {
      toast.success(result.message);
      const fetchData = async () => {
        try {
          const response = await fetch("http://localhost:3001/staff/services");
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
    } else {
      toast.error(result.message);
    }
  };

  return (
    <div className="overflow-auto my-5 max-h-80 p-2">
      <table className="min-w-full border relative">
        <thead className="bg-white border-b sticky -top-3">
          <tr>
            <th className="text-sm font-medium text-gray-900 p-2 text-left">
              #
            </th>
            <th className="text-sm font-medium text-gray-900 p-2 text-left">
              Name
            </th>
            <th className="text-sm font-medium text-gray-900 p-2 text-left">
              Location
            </th>
            <th className="text-sm font-medium text-gray-900 p-2 text-left">
              Rate
            </th>
            <th className="text-sm font-medium text-gray-900 p-2 text-left">
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          {staffs &&
            staffs.length > 0 &&
            staffs.map(
              (
                staff: {
                  _id: string;
                  name: string;
                  bio: string;
                  description: string;
                  location: string;
                  rate: string;
                  category: string;
                  services: string[];
                  image: string;
                }
              ) => (
                <tr
                  key={staff._id}
                  className="odd:bg-gray-100 even:bg-gray-300 border-b "
                >
                  <td className="p-2">
                    <img src={staff.image} alt="staff image" className="rounded-full w-10"/>
                  </td>
                  <td className="text-sm text-gray-900 font-light p-3 whitespace-nowrap">
                    {staff.name}
                  </td>
                  <td className="text-sm text-gray-900 font-light p-3 whitespace-nowrap">
                    {staff.location}
                  </td>
                  <td className="text-sm text-gray-900 font-light p-3 whitespace-nowrap">
                    {staff.rate}
                  </td>
                  <td className="text-sm text-gray-900 font-light p-3 whitespace-nowrap">
                    <img
                      onClick={() => handleDeleteStaffService(staff._id)}
                      src="../../../public/images/trash-can.svg"
                      className="w-6 cursor-pointer"
                    />
                  </td>
                </tr>
              )
            )}
        </tbody>
      </table>
    </div>
  );
};
export default ViewStaffs;
