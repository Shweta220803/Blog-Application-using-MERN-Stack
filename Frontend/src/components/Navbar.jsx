import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AiOutlineMenu } from "react-icons/ai";
import { IoCloseSharp } from "react-icons/io5";
import { useAuth } from "../context/AuthProvider";
import axios from "axios";
import toast from "react-hot-toast";

function Navbar() {
  const [show, setShow] = useState(false);

  const { profile, isAuthenticated, setIsAuthenticated } = useAuth();
  console.log(profile?.user);
  console.log(profile)
  const navigateTo = useNavigate();

  const handleLogout = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.get(
        "http://localhost:5001/api/users/logout",
        
        { withCredentials: true }
      );
      console.log(data);
      localStorage.removeItem("jwt"); // Deleting token in localStorage
      toast.success(data.message);
      setIsAuthenticated(false);
      navigateTo("/login");
    } catch (error) {
      console.log(error);
      toast.error("Failed to logout");
    }
  };

  return (
    <>
      <nav className="shadow-lg px-4 py-3 bg-gradient-to-r from-purple-600 via-pink-500 to-red-500">
        <div className="flex items-center justify-between container mx-auto">
          <div className="font-semibold text-2xl text-white">
            Dev<span className="text-yellow-400">Insights</span>
          </div>

          {/* Desktop Navbar */}
          <div className="mx-6">
            <ul className="hidden md:flex space-x-8 text-white font-medium">
              <Link
                to="/"
                className="hover:text-yellow-400 transition-colors duration-300"
              >
                HOME
              </Link>
              <Link
                to="/blogs"
                className="hover:text-yellow-400 transition-colors duration-300"
              >
                BLOGS
              </Link>
              <Link
                to="/creators"
                className="hover:text-yellow-400 transition-colors duration-300"
              >
                CREATORS
              </Link>
              <Link
                to="/about"
                className="hover:text-yellow-400 transition-colors duration-300"
              >
                ABOUT
              </Link>
              <Link
                to="/contact"
                className="hover:text-yellow-400 transition-colors duration-300"
              >
                CONTACT
              </Link>
            </ul>

            <div className="md:hidden" onClick={() => setShow(!show)}>
              {show ? (
                <IoCloseSharp size={24} className="text-white" />
              ) : (
                <AiOutlineMenu size={24} className="text-white" />
              )}
            </div>
          </div>

          {/* Authentication buttons */}
          <div className="hidden md:flex space-x-4">
            {isAuthenticated && profile?.user?.role === "admin" && (
              <Link
                to="/dashboard"
                className="bg-blue-600 text-white font-semibold hover:bg-blue-700 px-6 py-2 rounded-lg transition duration-300"
              >
                DASHBOARD
              </Link>
            )}
            {!isAuthenticated ? (
              <Link
                to="/login"
                className="bg-red-600 text-white font-semibold hover:bg-red-700 px-6 py-2 rounded-lg transition duration-300"
              >
                LOGIN
              </Link>
            ) : (
              <div>
                <button
                  onClick={handleLogout}
                  className="bg-red-600 text-white font-semibold hover:bg-red-700 px-6 py-2 rounded-lg transition duration-300"
                >
                  LOGOUT
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Mobile Navbar */}
        {show && (
          <div className="bg-white shadow-md md:hidden">
            <ul className="flex flex-col items-center justify-center space-y-4 text-xl text-gray-700 font-semibold py-4">
              <Link
                to="/"
                onClick={() => setShow(!show)}
                className="hover:text-purple-600 transition-colors duration-300"
              >
                HOME
              </Link>
              <Link
                to="/blogs"
                onClick={() => setShow(!show)}
                className="hover:text-purple-600 transition-colors duration-300"
              >
                BLOGS
              </Link>
              <Link
                to="/creators"
                onClick={() => setShow(!show)}
                className="hover:text-purple-600 transition-colors duration-300"
              >
                CREATORS
              </Link>
              <Link
                to="/about"
                onClick={() => setShow(!show)}
                className="hover:text-purple-600 transition-colors duration-300"
              >
                ABOUT
              </Link>
              <Link
                to="/contact"
                onClick={() => setShow(!show)}
                className="hover:text-purple-600 transition-colors duration-300"
              >
                CONTACT
              </Link>
            </ul>
          </div>
        )}
      </nav>
    </>
  );
}

export default Navbar;
