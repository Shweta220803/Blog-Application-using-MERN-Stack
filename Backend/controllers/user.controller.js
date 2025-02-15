import User from "../models/user.model.js";
import { v2 as cloudinary } from "cloudinary";
import bcrypt from "bcryptjs";
import createTokenAndSaveCookies from "../jwt/authToken.js";

// Register a new user
export const register = async (req, res) => {
  try {
    const { email, name, password, phone, education, role } = req.body;
    const { photo } = req.files || {};

    // Validate required fields
    if (
      !email ||
      !name ||
      !password ||
      !phone ||
      !education ||
      !role ||
      !photo
    ) {
      return res
        .status(400)
        .json({ message: "Please fill all required fields" });
    }

    // Validate photo format
    const allowedFormats = ["image/jpeg", "image/png", "image/webp"];
    if (!allowedFormats.includes(photo.mimetype)) {
      return res.status(400).json({
        message: "Invalid photo format. Only JPEG, PNG, and WEBP are allowed",
      });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res
        .status(400)
        .json({ message: "User already exists with this email" });
    }

    // Upload photo to Cloudinary
    const cloudinaryResponse = await cloudinary.uploader.upload(
      photo.tempFilePath
    );
    if (!cloudinaryResponse || cloudinaryResponse.error) {
      return res.status(500).json({ message: "Photo upload failed" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const newUser = new User({
      email,
      name,
      password: hashedPassword,
      phone,
      education,
      role,
      photo: {
        public_id: cloudinaryResponse.public_id,
        url: cloudinaryResponse.url,
      },
    });

    await newUser.save();

    // Generate token and send response
    const token = await createTokenAndSaveCookies(newUser._id, res);
    res.status(201).json({
      message: "User registered successfully",
      user: {
        id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        role: newUser.role,
        education: newUser.education,
        photo: newUser.photo.url,
        createdOn: newUser.createdOn,
      },
      token,
    });
  } catch (error) {
    console.error("Error during registration:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Login user
export const login = async (req, res) => {
  const { email, password, role } = req.body;

  try {
    // Validate input fields
    if (!email || !password || !role) {
      return res
        .status(400)
        .json({ message: "Please fill all required fields" });
    }

    // Find the user by email
    const user = await User.findOne({ email }).select("+password");
    if (!user) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    // Verify password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    // Check user role
    if (user.role !== role) {
      return res.status(400).json({ message: `Given role ${role} not found` });
    }

    // Generate token and send response
    const token = await createTokenAndSaveCookies(user._id, res);
    res.status(200).json({
      message: "User logged in successfully",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
      token,
    });
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Logout user
export const logout = (req, res) => {
  try {
    res.clearCookie("jwt");
    res.status(200).json({ message: "User logged out successfully" });
  } catch (error) {
    console.error("Error during logout:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Get logged-in user's profile
export const getMyProfile = async (req, res) => {
  try {
    const user = req.user; // Assuming `req.user` is set by authentication middleware
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({ user });
  } catch (error) {
    console.error("Error fetching profile:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Get all admin users
export const getAdmins = async (req, res) => {
  try {
    const admins = await User.find({ role: "admin" });
    res.status(200).json({ admins });
  } catch (error) {
    console.error("Error fetching admins:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
