import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import fileUpload from "express-fileupload";
import { v2 as cloudinary } from "cloudinary";
import cookieParser from "cookie-parser";
import cors from "cors";

// Import Routes
import userRoute from "./routes/user.route.js";
import blogRoute from "./routes/blog.route.js";

// Initialize Express and Load Environment Variables
dotenv.config();
const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(express.json()); // Parse JSON request bodies
app.use(cookieParser()); // Parse cookies in incoming requests
app.use(
  cors({
    origin: process.env.FRONTEND_URL, // Allow requests from your frontend URL
    credentials: true, // Allow cookies to be sent with requests
    methods: ["GET", "POST", "PUT", "DELETE"], // Allow specific HTTP methods
  })
);
app.use(
  fileUpload({
    useTempFiles: true, // Enable temporary file storage
    tempFileDir: "/tmp/", // Specify temporary file directory
  })
);

// Cloudinary Configuration
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_SECRET_KEY,
});

// Define Routes
app.use("/api/users", userRoute);
app.use("/api/blogs", blogRoute);

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Serveris running on port ${PORT}`);
});
