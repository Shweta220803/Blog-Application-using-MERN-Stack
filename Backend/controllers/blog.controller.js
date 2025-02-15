import mongoose, {mongo} from "mongoose";
import { v2 as cloudinary } from "cloudinary";
import Blog from "../models/blog.model.js"


// // Create Blog
// export const createBlog = async (req, res) => {
//   try {
//     if (!req.files || Object.keys(req.files).length === 0) {
//       return res.status(400).json({ message: "Blog image is required" });
//     }
//     const { blogImage } = req.files;
//     const allowedFormats = ["image/png", "image/jpeg", "image/webp"];
//     if (!allowedFormats.includes(blogImage.mimetype)) {
//       return res.status(400).json({
//         message: "Invalid file format. Only jpeg, png and webp are allowed",
//       });
//     }
//     const {title, category, about} = req.body;
//     if (!title || !category || !about) {
//       return res.status(400).json({ message: "title,category, and about . All field are required" });
//     }

//     const adminName = req?.user?.name;
//     const adminPhoto = req?.user?.photo?.url;
//     const createdBy = req?.user?._id;

//     const cloudinaryResponse = await cloudinary.uploader.upload(
//       blogImage.tempFilePath
//     );
//     if (!cloudinaryResponse || cloudinaryResponse.error) {
//       console.log(cloudinaryResponse.error);
//       return res.status(500).json({ message: "Cloudinary upload failed" });

//     }
//     const blogData = {
//       title,
//       about,
//       category,
//       adminName,
//       adminPhoto,
//       createdBy,
//       blogImage: {
//         public_id: cloudinaryResponse.public_id,
//         url: cloudinaryResponse.url,
//       },
//     };
//     const blog = await Blog.create(blogData);
//     return res.status(200).json({ message: "Blog created successfully", blog });
//   } catch (error) {
//     return res.status(500).json({ error: "Internal Server Error", error });
//   }
// };


// Create Blog
export const createBlog = async (req, res) => {
  try {
    if (!req.files || !req.files.blogImage) {
      return res.status(400).json({ message: "Blog image is required" });
    }

    const { blogImage } = req.files;
    const allowedFormats = ["image/png", "image/jpeg", "image/webp"];
    if (!allowedFormats.includes(blogImage.mimetype)) {
      return res
        .status(400)
        .json({ message: "Only JPEG, PNG, and WEBP formats are allowed" });
    }

    const { title, category, about } = req.body;
    if (!title || !category || !about) {
      return res
        .status(400)
        .json({ message: "Title, category, and about are required" });
    }

    const cloudinaryResponse = await cloudinary.uploader.upload(
      blogImage.tempFilePath,
      { folder: "blogs" }
    );

    const blog = await Blog.create({
      title,
      category,
      about,
      blogImage: {
        public_id: cloudinaryResponse.public_id,
        url: cloudinaryResponse.url,
      },
      createdBy: req?.user?._id,
    });

    res.status(201).json({ message: "Blog created successfully", blog });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error", error });
  }
};



// Update Blog
export const updateBlog = async (req, res) => {
  try {
    const { id } = req.params;

    // Check if the provided ID is a valid MongoDB ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid Blog ID" });
    }

    const updatedBlog = await Blog.findByIdAndUpdate(id, req.body, {
      new: true,
    });

    if (!updatedBlog) {
      return res.status(404).json({ message: "Blog not found" });
    }
    res.status(200).json(updatedBlog);
  } catch (error) {
    console.error("Error updating blog:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};


// Delete Blog
export const deleteBlog = async (req, res) => {
  try {
    const { id } = req.params;

    // Find the blog by ID
    const blog = await Blog.findById(id);
    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }

    // Delete the blog
    await blog.deleteOne();
    res.status(200).json({ message: "Blog deleted successfully" });
  } catch (error) {
    console.error("Error deleting blog:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};



// Get all blogs
export const getAllBlogs = async (req, res) => {
  try {
    const allBlogs = await Blog.find();
    res.status(200).json(allBlogs);
  } catch (error) {
    console.error("Error fetching blogs:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};



// Get a single blog by ID
export const getSingleBlog = async (req, res) => {
  try {
    const { id } = req.params;

    // Validate the blog ID
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid Blog ID" });
    }

    // Find the blog by ID
    const blog = await Blog.findById(id);
    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }

    res.status(200).json(blog);
  } catch (error) {
    console.error("Error fetching blog:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};




// Get blogs created by the logged-in user
export const getMyBlogs = async (req, res) => {
  try {
    const createdBy = req.user._id;

    // Fetch blogs created by the logged-in user
    const myBlogs = await Blog.find({ createdBy });
    res.status(200).json(myBlogs);
  } catch (error) {
    console.error("Error fetching user's blogs:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

