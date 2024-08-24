import { toast } from "react-toastify";
import useAuth from "../../hooks/useAuth";

const ViewCategory = () => {
  const { categories, setCategories } = useAuth();
  const handleDeleteCategory = async (id: string) => {
    const response = await fetch(`http://localhost:3001/category/${id}`, {
      method: "DELETE",
    });
    const result = await response.json();
    if (result.status) {
      toast.success(result.message);
      const fetchData = async () => {
        try {
          const response = await fetch("http://localhost:3001/categories");
          const result = await response.json();
          if (result.status) {
            setCategories(result.categories);
            
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
            <th className="text-sm font-medium text-gray-900 p-3 text-left">
              #
            </th>
            <th className="text-sm font-medium text-gray-900 p-3 text-left">
              Name
            </th>
            <th className="text-sm font-medium text-gray-900 p-3 text-left">
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          {categories &&
            categories.length > 0 &&
            categories.map(
              (
                category: {
                  _id: string;
                  name: string;
                },
                index
              ) => (
                <tr
                  key={category._id}
                  className="odd:bg-gray-100 even:bg-gray-300 border-b "
                >
                  <td className="text-sm text-gray-900 font-light p-3 whitespace-nowrap">
                    {index + 1}
                  </td>
                  <td className="text-sm text-gray-900 font-light p-3 whitespace-nowrap">
                    {category.name}
                  </td>
                  <td className="text-sm text-gray-900 font-light p-3 whitespace-nowrap">
                    <img
                      onClick={() => handleDeleteCategory(category._id)}
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
export default ViewCategory;
