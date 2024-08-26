import { toast } from "react-toastify";
import useAuth from "../../hooks/useAuth";

const ViewServices = () => {
  const { services, setServices } = useAuth();
  const handleDeleteService = async (id: string) => {
    const response = await fetch(`http://localhost:3001/service/${id}`, {
      method: "DELETE",
    });
    const result = await response.json();
    if (result.status) {
      toast.success(result.message);
      const fetchData = async () => {
        try {
          const response = await fetch("http://localhost:3001/services");
          const result = await response.json();
          if (result.status) {
            setServices(result.services);
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
            <th className="text-sm font-medium text-gray-900 p-3">
              #
            </th>
            <th className="text-sm font-medium text-gray-900 p-3">
              Name
            </th>
            <th className="text-sm font-medium text-gray-900 p-3">
              Category
            </th>
            <th className="text-sm font-medium text-gray-900 p-3">
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          {services &&
            services.length > 0 &&
            services.map(
              (
                service: {
                  _id: string;
                  name: string;
                  category: string;
                  details: string;
                  image: string;
                  attribute: string;
                  attributeTitle: string;
                },
                index
              ) => (
                <tr
                  key={service._id}
                  className="odd:bg-gray-100 even:bg-gray-300 border-b "
                >
                  <td className="text-sm text-gray-900 font-light p-3 whitespace-nowrap">
                    {index + 1}
                  </td>
                  <td className="text-sm text-gray-900 font-light p-3 whitespace-nowrap">
                    {service.name}
                  </td>
                  <td className="text-sm text-gray-900 font-light p-3 whitespace-nowrap">
                    {service.category}
                  </td>
                  <td className="text-sm text-gray-900 font-light p-3 whitespace-nowrap">
                    <img
                      onClick={() => handleDeleteService(service._id)}
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
export default ViewServices;
