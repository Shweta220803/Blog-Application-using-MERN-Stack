import Navbar from "../src/components/Navbar";
import Home from "../src/components/Home";
import Footer from "../src/components/Footer";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import Blogs from "../src/pages/Blogs";
import About from "../src/pages/About";
import Contact from "../src/pages/Contact";
import Login from "../src/pages/Login";
import Register from "../src/pages/Register";
import Details  from "../src/pages/Details";

import Dashboard from "../src/pages/Dashboard";
import Creators from "./pages/Creators";
import { useAuth } from "./context/AuthProvider";
import { Toaster } from "react-hot-toast";
import UpdateBlog from "./dashboard/UpdateBlog";
import NotFound from "./pages/NotFound";


function App() {
  const location = useLocation();
  const hideNavbarFooter = ["/dashboard", "/login", "/register"].includes(location.pathname);
  const { isAuthenticated } = useAuth();
  const token = localStorage.getItem("jwt");  // Token check for protected routes


  // Protected route wrapper
  const ProtectedRoute = ({ children }) => {
    return token || isAuthenticated ? children : <Navigate to="/login" />;
  };

  return (
    <div>
      {!hideNavbarFooter && <Navbar />}
      <Routes>
        {/* Public Routes */}
        <Route exact path="/" element={token ? <Home /> : <Navigate to="/login" />} />
        <Route exact path="/blogs" element={<Blogs />} />
        <Route exact path="/about" element={<About />} />
        <Route exact path="/contact" element={<Contact />} />
        <Route exact path="/creators" element={<Creators />} />

        {/* Auth Routes */}
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/register" element={<Register />} />

        {/* Protected Routes */}
        <Route
          exact
          path="/dashboard"
          element={<ProtectedRoute><Dashboard /></ProtectedRoute>}
        />

        {/* Single Blog Detail Route */}
        <Route exact path="/blog/:id" element={<Details />} />

        {/* Update Blog Route */}
        <Route exact path="/blog/update/:id" element={<ProtectedRoute><UpdateBlog /></ProtectedRoute>} />

        {/* Catch-all Route */}
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Toaster />
      {!hideNavbarFooter && <Footer />}
    </div>
  );
}

export default App;




