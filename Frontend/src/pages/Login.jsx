import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthProvider";

function Login() {
  const { isAuthenticated, setIsAuthenticated, setProfile } = useAuth();

  const navigateTo = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const { data } = await axios.post(
        "http://localhost:5001/api/users/login",
        { email, password, role },
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log(data);
      // Store the token in localStorage
      localStorage.setItem("jwt", data.token); // storing token in localStorage so that if user refreshed the page it will not redirect again in login
      toast.success(data.message || "User LoggedIn successfully", {
        duration: 3000,
      });
      setProfile(data);
      setIsAuthenticated(true);
      setEmail("");
      setPassword("");
      setRole("");
      navigateTo("/");
    } catch (error) {
      console.log(error);
      toast.error(
        error.response.data.message || "Please fill the required fields",
        {
          duration: 3000,
        }
      );
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-300 to-indigo-500">
      <div className="w-full max-w-md bg-white shadow-lg rounded-lg p-8">
        <form onSubmit={handleLogin}>
          <div className="text-center font-semibold text-2xl text-blue-600 mb-6">
          Dev<span className="text-black">Insights</span>
          </div>
          <h1 className="text-xl font-semibold text-gray-800 mb-6">Login</h1>

          {/* Role Selection */}
          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="w-full p-2 mb-4 border rounded-md focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Select Role</option>
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </select>

          {/* Email Input */}
          <div className="mb-4">
            <input
              type="email"
              placeholder="Your Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {/* Password Input */}
          <div className="mb-4">
            <input
              type="password"
              placeholder="Your Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {/* Register Link */}
          <p className="text-center mb-4 text-gray-600">
            New User?{" "}
            <Link to="/register" className="text-blue-600 hover:text-blue-800">
              Register Now
            </Link>
          </p>

          {/* Login Button */}
          <button
            type="submit"
            className="w-full p-2 bg-blue-500 hover:bg-blue-600 duration-300 rounded-md text-white"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
