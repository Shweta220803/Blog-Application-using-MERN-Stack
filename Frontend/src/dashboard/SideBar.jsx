import { useState } from "react";
import { useAuth } from "../context/AuthProvider";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { CiMenuBurger } from "react-icons/ci";
import { BiSolidLeftArrowAlt } from "react-icons/bi";
import toast from "react-hot-toast";

function SideBar({ setComponent }) {
  const { profile, setIsAuthenticated } = useAuth();
  const navigateTo = useNavigate();

  const [show, setShow] = useState(false);

  const handleComponents = (value) => {
    setComponent(value);
  };

  const gotoHome = () => {
    navigateTo("/");
  };

  const handleLogout = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.get("http://localhost:5001/api/users/logout", { withCredentials: true });
      toast.success(data.message);
      localStorage.removeItem("jwt");
      setIsAuthenticated(false);
      navigateTo("/login");
    } catch (error) {
      console.error("Logout Error:", error);
      toast.error(error.response?.data?.message || "Failed to logout");
    }
  };

  return (
    <>
      {/* Mobile Menu Toggle */}
      <div className="sm:hidden fixed top-4 left-4 z-50" onClick={() => setShow(!show)}>
        <CiMenuBurger className="text-3xl text-gray-700 hover:text-black transition duration-200" />
      </div>

      {/* Sidebar */}
      <div
        className={`w-72 h-full shadow-lg fixed top-0 left-0 bg-white transition-transform duration-300 ease-in-out transform sm:translate-x-0 ${
          show ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Close Sidebar for Mobile */}
        <div
          className="sm:hidden absolute top-4 right-4 text-2xl cursor-pointer text-gray-700"
          onClick={() => setShow(!show)}
        >
          <BiSolidLeftArrowAlt className="text-3xl hover:text-black transition duration-200" />
        </div>

        {/* Profile Section */}
        <div className="text-center py-8 bg-gray-100">
          <img
            className="w-28 h-28 rounded-full mx-auto mb-2 border-4 border-green-500"
            src={profile?.user?.photo?.url || "/default-avatar.png"} // Improved fallback for profile image
            alt="Profile"
          />
          <p className="text-xl font-semibold text-gray-800">{profile?.user?.name}</p>
        </div>

        {/* Navigation Links */}
        <ul className="space-y-6 px-6 py-4">
          <button
            onClick={() => handleComponents("My Blogs")}
            className="w-full px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition duration-300"
          >
            My Blogs
          </button>
          <button
            onClick={() => handleComponents("Create Blog")}
            className="w-full px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-300"
          >
            Create Blog
          </button>
          <button
            onClick={() => handleComponents("My Profile")}
            className="w-full px-4 py-2 bg-pink-500 text-white rounded-lg hover:bg-pink-600 transition duration-300"
          >
            My Profile
          </button>
          <button
            onClick={gotoHome}
            className="w-full px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition duration-300"
          >
            Home
          </button>
          <button
            onClick={handleLogout}
            className="w-full px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition duration-300"
          >
            Logout
          </button>
        </ul>
      </div>
    </>
  );
}

export default SideBar;
