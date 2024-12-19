import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router";
import { useDispatch } from "react-redux";
import { addUser, updateUser } from "../appReducer/CrudSlice";

const Create = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const userToEdit = location.state?.user; 
  const [inputData, setInputData] = useState({
    name: "",
    email: "",
    password: "",
  });

  useEffect(() => {
    if (userToEdit) {
      setInputData({
        name: userToEdit.name,
        email: userToEdit.email,
        pasword: userToEdit.password,
      });
    }
  }, [userToEdit]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      if (userToEdit) {
        // Update  user
        const response = await axios.put(
          `https://655acc496981238d054dbc3a.mockapi.io/crud/${userToEdit.id}`,
          inputData
        );
        dispatch(updateUser(response.data)); 
        alert("User updated successfully!");
      } else {
        // Create new user
        const response = await axios.post(
          "https://655acc496981238d054dbc3a.mockapi.io/crud",
          inputData
        );
        dispatch(addUser(response.data)); 
        alert("User added successfully!");
      }
    
      setInputData({ name: "", email: "", pasword: "" });
      navigate("/");
    } catch (error) {
      console.error("Error saving user:", error);
      alert("Failed to save user.");
    }
  };

  const handleInput = (e) => {
    const { name, value } = e.target;
    setInputData({ ...inputData, [name]: value });
  };

  return (
    <section className="bg-gray-50 dark:bg-gray-900">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <div className="w-full bg-white rounded-lg shadow dark:border sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 sm:p-8">
            <h1 className="text-xl font-bold text-gray-900 md:text-2xl dark:text-white">
              {userToEdit ? "Edit User" : "Add User"}
            </h1>
            <form className="space-y-4" onSubmit={handleSubmit}>
              <div>
                <label className="block mb-2 text-sm text-gray-900 dark:text-white">Name</label>
                <input
                  type="text"
                  name="name"
                  value={inputData.name}
                  onChange={handleInput}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  placeholder="Enter your name"
                  required
                />
              </div>
              <div>
                <label className="block mb-2 text-sm text-gray-900 dark:text-white">Email</label>
                <input
                  type="email"
                  name="email"
                  value={inputData.email}
                  onChange={handleInput}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  placeholder="Enter your email"
                  required
                />
              </div>
              <div>
                <label className="block mb-2 text-sm text-gray-900 dark:text-white">Password</label>
                <input
                  type="password"
                  name="password"
                  value={inputData.pasword}
                  onChange={handleInput}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  placeholder="Enter your password"
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full bg-black text-white py-2 rounded-lg hover:bg-gray-800"
              >
                {userToEdit ? "Update" : "Create"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Create;
