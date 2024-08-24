import { toast } from "react-toastify";
import useAuth from "../../hooks/useAuth";

const ViewUsers = () => {
  const { users, setUsers } = useAuth();
  const handleDeleteUser = async (id: string) => {
    const response = await fetch(`http://localhost:3001/user/${id}`, {
      method: "DELETE",
    });
    const result = await response.json();
    if (result.status) {
      toast.success(result.message);
      const fetchData = async () => {
        try {
          const response = await fetch("http://localhost:3001/users");
          const result = await response.json();
          if (result.status) {
            setUsers(result.users);
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
              Email
            </th>
            <th className="text-sm font-medium text-gray-900 p-3 text-left">
              Role
            </th>
            <th className="text-sm font-medium text-gray-900 p-3 text-left">
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          {users &&
            users.length > 0 &&
            users.map(
              (
                user: {
                  _id: string;
                  name: string;
                  email: string;
                  role: string;
                },
                index
              ) => (
                <tr
                  key={user._id}
                  className="odd:bg-gray-100 even:bg-gray-300 border-b "
                >
                  <td className="text-sm text-gray-900 font-light p-3 whitespace-nowrap">
                    {index + 1}
                  </td>
                  <td className="text-sm text-gray-900 font-light p-3 whitespace-nowrap">
                    {user.name}
                  </td>
                  <td className="text-sm text-gray-900 font-light p-3 whitespace-nowrap">
                    {user.email}
                  </td>
                  <td className="text-sm text-gray-900 font-light p-3 whitespace-nowrap">
                    {user.role}
                  </td>
                  <td className="text-sm text-gray-900 font-light p-3 whitespace-nowrap">
                    <img
                      onClick={() => handleDeleteUser(user._id)}
                      src="../../../public/images/people-minus-svgrepo-com.svg"
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
export default ViewUsers;
