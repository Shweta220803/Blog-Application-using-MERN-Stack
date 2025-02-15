import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";

function UpdateBlog() {
  const navigateTo = useNavigate();
  const { id } = useParams();

  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [about, setAbout] = useState("");
  const [blogImage, setBlogImage] = useState("");
  const [blogImagePreview, setBlogImagePreview] = useState("");

  const changePhotoHandler = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setBlogImagePreview(reader.result);
      setBlogImage(file);
    };
  };

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const { data } = await axios.get(
          `http://localhost:5001/api/blogs/single-blog/${id}`,
          {
            withCredentials: true,
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        setTitle(data?.title);
        setCategory(data?.category);
        setAbout(data?.about);
        setBlogImage(data?.blogImage.url);
      } catch (error) {
        toast.error("Please fill the required fields", error);
      }
    };
    fetchBlog();
  }, [id]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    
    // Form validation
    if (!title || !category || !about) {
      toast.error("All fields are required");
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("category", category);
    formData.append("about", about);
    formData.append("blogImage", blogImage);

    try {
      const { data } = await axios.put(
        `http://localhost:5001/api/blogs/update/${id}`,
        formData,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      toast.success(data.message || "Blog updated successfully");
      navigateTo("/");
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Please fill the required fields"
      );
    }
  };

  return (
    <div>
      <div className="container mx-auto my-12 p-4">
        <section className="max-w-2xl mx-auto">
          <h3 className="text-3xl font-bold mb-6 text-center text-gray-800">
            UPDATE BLOG
          </h3>
          <form>
            <div className="mb-6">
              <label className="block mb-2 font-semibold text-gray-700">
                Category
              </label>
              <select
                className="w-full p-3 border rounded-md text-gray-700 focus:ring-2 focus:ring-blue-400"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                <option value="">Select Category</option>
                <option value="Devotion">Devotion</option>
                <option value="Sports">Sports</option>
                <option value="Coding">Coding</option>
                <option value="Entertainment">Entertainment</option>
                <option value="Business">Business</option>
              </select>
            </div>
            <div className="mb-6">
              <input
                type="text"
                placeholder="BLOG MAIN TITLE"
                className="w-full p-3 border rounded-md text-gray-700 focus:ring-2 focus:ring-blue-400"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
            <div className="mb-6">
              <label className="block mb-2 font-semibold text-gray-700">
                Blog Image
              </label>
              <img
                src={
                  blogImagePreview
                    ? blogImagePreview
                    : blogImage
                    ? blogImage
                    : "/imgPL.webp"
                }
                alt="Blog Main"
                className="w-full h-48 object-cover mb-4 rounded-md"
              />
              <input
                type="file"
                className="w-full p-3 border rounded-md text-gray-700 focus:ring-2 focus:ring-blue-400"
                onChange={changePhotoHandler}
              />
            </div>
            <div className="mb-6">
              <textarea
                rows="6"
                className="w-full p-3 border rounded-md text-gray-700 focus:ring-2 focus:ring-blue-400"
                placeholder="Something about your blog (at least 200 characters)"
                value={about}
                onChange={(e) => setAbout(e.target.value)}
              />
            </div>
            <button
              className="w-full p-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:ring-2 focus:ring-blue-400 transition duration-200"
              onClick={handleUpdate}
            >
              Update Blog
            </button>
          </form>
        </section>
      </div>
    </div>
  );
}

export default UpdateBlog;
