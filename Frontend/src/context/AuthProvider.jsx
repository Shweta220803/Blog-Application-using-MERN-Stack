// import axios from "axios";
// import { createContext, useContext, useEffect, useState } from "react";

// export const AuthContext = createContext();

// export const AuthProvider = ({ children }) => {
//   const [blogs, setBlogs] = useState([]);
//   const [profile, setProfile] = useState(null);
//   const [isAuthenticated, setIsAuthenticated] = useState(false);

//   useEffect(() => {
//     const fetchProfile = async () => {
//       try {
//         const token = localStorage.getItem("jwt");
//         if (token) {
//           const { data } = await axios.get(
//             "http://localhost:5001/api/users/my-profile",
//             {
//               headers: {
//                 "Content-Type": "application/json",
//                 Authorization: `Bearer ${token}`, // Include the token in the header
//               },
//             }
//           );
//           setProfile(data.user);
//           setIsAuthenticated(true);
//         } else {
//           setIsAuthenticated(false);
//         }
//       } catch (error) {
//         console.error("Error fetching profile:", error);
//         setIsAuthenticated(false); // In case of an error, user is not authenticated
//       }
//     };

//     const fetchBlogs = async () => {
//       try {
//         const { data } = await axios.get(
//           "http://localhost:5001/api/blogs/all-blogs",
//           { withCredentials: true }
//         );
//         setBlogs(data);
//       } catch (error) {
//         console.error("Error fetching blogs:", error);
//       }
//     };

//     fetchBlogs();
//     fetchProfile(); // Fetch profile on component mount
//   }, [isAuthenticated]); // Optional: add `isAuthenticated` if you need to refresh when it changes

//   return (
//     <AuthContext.Provider
//       value={{
//         blogs,
//         profile,
//         setProfile,
//         isAuthenticated,
//         setIsAuthenticated,
//       }}
//     >
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export const useAuth = () => useContext(AuthContext);

import { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

// Create context
const AuthContext = createContext();

// Auth provider to wrap around your app
export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [profile, setProfile] = useState(null);

  // Fetch the profile if the user is authenticated
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      axios.get('/api/profile', { headers: { Authorization: `Bearer ${token}` } })
        .then(response => {
          setIsAuthenticated(true);
          setProfile(response.data);
        })
        .catch(err => {
          console.error(err);
          setIsAuthenticated(false);
          setProfile(null);
        });
    }
  }, []);

  return (
    <AuthContext.Provider value={{ isAuthenticated, profile, setIsAuthenticated, setProfile }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use authentication data
export const useAuth = () => useContext(AuthContext);
