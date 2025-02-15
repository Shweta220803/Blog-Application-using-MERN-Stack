import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom";

function Details() {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const { data } = await axios.get(
          `http://localhost:5001/api/blogs/single-blog/${id}`,
          {
            withCredentials: true,
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        setBlog(data);
      } catch (error) {
        console.log(error);
        toast.error("Failed to fetch blog details");
      }
    };
    fetchBlog();
  }, [id]);

  return (
    <div className="bg-gradient-to-r from-blue-300 to-indigo-500 min-h-screen py-10">
      {blog ? (
        <section className="container mx-auto px-4">
          {/* Blog Category */}
          <div className="text-blue-500 uppercase text-xs font-bold mb-4">
            {blog?.category}
          </div>

          {/* Blog Title */}
          <h1 className="text-4xl font-bold text-gray-900 mb-6">{blog?.title}</h1>

          {/* Author Info */}
          <div className="flex items-center mb-6">
            <img
              src={blog?.adminPhoto}
              alt="author_avatar"
              className="w-14 h-14 rounded-full mr-4 object-cover"
            />
            <p className="text-lg font-semibold text-gray-700">{blog?.adminName}</p>
          </div>

          {/* Blog Content */}
          <div className="flex flex-col md:flex-row">
            {blog?.blogImage && (
              <img
                src={blog?.blogImage?.url}
                alt="main_blog_image"
                className="md:w-1/2 w-full h-[500px] mb-6 rounded-lg shadow-xl object-cover"
              />
            )}
            <div className="md:w-1/2 w-full md:pl-8">
              <p className="text-lg text-gray-700 mb-6">{blog?.about}</p>
              {/* Add more content here if needed */}
            </div>
          </div>
        </section>
      ) : (
        <div className="text-center py-10">
          <h2 className="text-xl text-gray-700">Blog not found</h2>
        </div>
      )}
    </div>
  );
}

export default Details;
