import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsers, deleteUser } from "../appReducer/CrudSlice";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { list, status, error } = useSelector((state) => state.crud);

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  const handleEdit = (user) => {
    navigate("/create", { state: { user } });
  };

  const handleDelete = async (userId) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      try {
        await dispatch(deleteUser(userId)); // Delete user
       
        dispatch(fetchUsers());
      } catch (error) {
        console.error("Failed to delete user:", error);
      }
    }
  };
  

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">All Users</h1>

      {status === "loading" && <p className="text-blue-500 text-lg">Loading...</p>}
      {status === "failed" && <p className="text-red-500 text-lg">Error: {error}</p>}

    
      {status === "succeeded" && (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200 shadow rounded-md">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-6 py-3 border-b text-left text-gray-600 font-medium">ID</th>
                <th className="px-6 py-3 border-b text-left text-gray-600 font-medium">Name</th>
                <th className="px-6 py-3 border-b text-left text-gray-600 font-medium">Email</th>
                <th className="px-6 py-3 border-b text-left text-gray-600 font-medium">Password</th>
                <th className="px-6 py-3 border-b text-left text-gray-600 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {list.map((user) => (
                <tr key={user.id} className="hover:bg-gray-50 transition duration-150">
                  <td className="px-6 py-4 border-b text-gray-700">{user.id}</td>
                  <td className="px-6 py-4 border-b text-gray-700">{user.name}</td>
                  <td className="px-6 py-4 border-b text-gray-700">{user.email}</td>
                  <td className="px-6 py-4 border-b text-gray-700">{user.password}</td>
                  <td className="px-6 py-4 border-b text-gray-700">
                    <div className="flex space-x-3">
                      <button
                        className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition"
                        onClick={() => handleEdit(user)}
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(user.id)}
                        className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Home;
