import  User  from "../models/user.model.js";
import jwt from "jsonwebtoken";

// Authentication Middleware
export const isAuthenticated = async (req, res, next) => {
  try {
    const token = req.cookies.jwt;
    console.log("Middleware : ", token);


    if (!token) {
      return res.status(401).json({ error: "User not authenticated" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

    const user = await User.findById(decoded.userId);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    req.user = user; // Attach the user to the request object for further use
    next();
  } catch (error) {
    console.error("Authentication Error:", error.message);
    return res.status(401).json({ error: "User not authenticated" });
  }
};

// Authorization Middleware
export const isAdmin = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res
        .status(403)
        .json({ error: `User with role ${req.user.role} is not authorized` });
    }

    next();
  };
};
