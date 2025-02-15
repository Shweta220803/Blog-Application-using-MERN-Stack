import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthProvider";

function Register() {
  const { setIsAuthenticated, setProfile } = useAuth();
  const navigateTo = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const [education, setEducation] = useState("");
  const [photo, setPhoto] = useState("");
  const [photoPreview, setPhotoPreview] = useState("");

  const changePhotoHandler = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setPhotoPreview(reader.result);
      setPhoto(file);
    };
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    if (!name || !email || !phone || !password || !role || !education) {
      toast.error("Please fill all required fields.");
      return;
    }

    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    formData.append("phone", phone);
    formData.append("password", password);
    formData.append("role", role);
    formData.append("education", education);
    formData.append("photo", photo);

    try {
      const { data } = await axios.post(
        "http://localhost:5001/api/users/register",
        formData,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      localStorage.setItem("jwt", data.token); // storing token in localStorage
      toast.success(data.message || "User registered successfully");
      setProfile(data);
      setIsAuthenticated(true);
      resetForm();
      navigateTo("/");
    } catch (error) {
      toast.error(error.response?.data?.message || "Error occurred during registration.");
    }
  };

  const resetForm = () => {
    setName("");
    setEmail("");
    setPhone("");
    setPassword("");
    setRole("");
    setEducation("");
    setPhoto("");
    setPhotoPreview("");
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-300 to-indigo-500 flex items-center justify-center">
      <div className="w-full max-w-lg bg-white shadow-lg rounded-lg p-8 space-y-6">
        <div className="text-center font-bold text-2xl text-gray-800">
        Dev<span className="text-blue-600">Insights</span>
        </div>
        <h1 className="text-xl font-semibold text-center text-gray-800 mb-6">Register</h1>

        <form onSubmit={handleRegister}>
          {/* Role Selection */}
          <div className="mb-4">
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select Role</option>
              <option value="user">User</option>
              <option value="admin">Admin</option>
            </select>
          </div>

          {/* Name Input */}
          <div className="mb-4">
            <input
              type="text"
              placeholder="Your Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Email Input */}
          <div className="mb-4">
            <input
              type="email"
              placeholder="Your Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Phone Input */}
          <div className="mb-4">
            <input
              type="number"
              placeholder="Your Phone Number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Password Input */}
          <div className="mb-4">
            <input
              type="password"
              placeholder="Your Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Education Selection */}
          <div className="mb-4">
            <select
              value={education}
              onChange={(e) => setEducation(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select Your Education</option>
              <option value="BCA">BCA</option>
              <option value="MCA">MCA</option>
              <option value="MBA">MBA</option>
              <option value="BBA">BBA</option>
            </select>
          </div>

          {/* Photo Upload */}
          <div className="flex items-center mb-6">
            <div className="w-24 h-24 mr-4">
              <img
                src={photoPreview ? photoPreview : "https://via.placeholder.com/150"}
                alt="profile preview"
                className="object-cover w-full h-full rounded-full"
              />
            </div>
            <input
              type="file"
              onChange={changePhotoHandler}
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <p className="text-center mb-4 text-gray-700">
            Already registered?{" "}
            <Link to="/login" className="text-blue-600 hover:underline">
              Login Now
            </Link>
          </p>

          <button
            type="submit"
            className="w-full p-3 bg-blue-600 hover:bg-blue-700 rounded-md text-white font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
}

export default Register;
