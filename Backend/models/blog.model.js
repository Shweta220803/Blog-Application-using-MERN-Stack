import mongoose from "mongoose";

const blogSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    blogImage: {
      public_id: {
        type: String,
        required: true,
      },
      url: {
        type: String,
        required: true,
      },
    },
    category: {
      type: String,
      required: true,
    },
    about: {
      type: String,
      required: true,
      minlength: [200, "should contain minimum 200 character"],
    },
    adminName: {
      type: String,
    },
    adminPhoto: {
      type: String,
    },
    createdBy: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);
const Blog = mongoose.model("Blog", blogSchema);
export default Blog;
