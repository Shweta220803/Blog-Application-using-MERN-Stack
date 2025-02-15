// import axios from "axios";
// import { useState } from "react";
// import toast from "react-hot-toast";

// function CreateBlog() {
//   const [title, setTitle] = useState("");
//   const [category, setCategory] = useState("");
//   const [about, setAbout] = useState("");
//   const [blogImage, setBlogImage] = useState("");
//   const [blogImagePreview, setBlogImagePreview] = useState("");

//   const changePhotoHandler = (e) => {
//     const file = e.target.files[0];
//     const reader = new FileReader();
//     reader.readAsDataURL(file);
//     reader.onload = () => {
//       setBlogImagePreview(reader.result);
//       setBlogImage(file);
//     };
//   };

//   const handleCreateBlog = async (e) => {
//     e.preventDefault();
//     const formData = new FormData();
//     formData.append("title", title);
//     formData.append("category", category);
//     formData.append("about", about);
//     formData.append("blogImage", blogImage);

//     try {
//       const { data } = await axios.post(
//         "http://localhost:5001/api/blogs/create",
//         formData,
//         {
//           withCredentials: true,
//           headers: {
//             "Content-Type": "multipart/form-data",
//           },
//         }
//       );
//       toast.success(data.message || "Blog created successfully");
//       setTitle("");
//       setCategory("");
//       setAbout("");
//       setBlogImage("");
//       setBlogImagePreview("");
//     } catch (error) {
//       toast.error(error.message || "Error occurred while creating blog");
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-r from-blue-200 to-indigo-500 py-12">
//       <div className="max-w-4xl mx-auto bg-white p-8 rounded-xl shadow-lg">
//         <h3 className="text-3xl font-bold text-center text-gray-800 mb-6">Create a New Blog</h3>

//         <form onSubmit={handleCreateBlog} className="space-y-6">
//           {/* Category Dropdown */}
//           <div className="space-y-2">
//             <label className="block text-lg text-gray-700 font-semibold">Category</label>
//             <select
//               value={category}
//               onChange={(e) => setCategory(e.target.value)}
//               className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//             >
//               <option value="">Select Category</option>
//               <option value="Devotion">Devotion</option>
//               <option value="Sports">Sports</option>
//               <option value="Coding">Coding</option>
//               <option value="Entertainment">Entertainment</option>
//               <option value="Business">Business</option>
//             </select>
//           </div>

//           {/* Title Input */}
//           <div className="space-y-2">
//             <label className="block text-lg text-gray-700 font-semibold">Title</label>
//             <input
//               type="text"
//               placeholder="Enter your blog title"
//               value={title}
//               onChange={(e) => setTitle(e.target.value)}
//               className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//             />
//           </div>

//           {/* Blog Image Upload */}
//           <div className="space-y-2">
//             <label className="block text-lg text-gray-700 font-semibold">Blog Image</label>
//             <div className="flex items-center justify-center">
//               <img
//                 src={blogImagePreview ? `${blogImagePreview}` : "/imgPL.webp"}
//                 alt="Blog Preview"
//                 className="w-full max-w-md h-auto rounded-lg object-cover shadow-md"
//               />
//             </div>
//             <input
//               type="file"
//               onChange={changePhotoHandler}
//               className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//             />
//           </div>

//           {/* About Section */}
//           <div className="space-y-2">
//             <label className="block text-lg text-gray-700 font-semibold">About</label>
//             <textarea
//               rows="5"
//               placeholder="Write something about your blog"
//               value={about}
//               onChange={(e) => setAbout(e.target.value)}
//               className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//             />
//           </div>

//           {/* Submit Button */}
//           <div className="flex justify-center">
//             <button
//               type="submit"
//               className="w-full max-w-xs py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-200"
//             >
//               Post Blog
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// }

// export default CreateBlog;
import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";

function CreateBlog() {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [about, setAbout] = useState("");
  const [blogImage, setBlogImage] = useState("");
  const [blogImagePreview, setBlogImagePreview] = useState("");

  const changePhotoHandler = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        setBlogImagePreview(reader.result);
        setBlogImage(file);
      };
    }
  };

  const handleCreateBlog = async (e) => {
    e.preventDefault();

    if (!title || !category || !about || !blogImage) {
      toast.error("All fields are required, including an image!");
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("category", category);
    formData.append("about", about);
    formData.append("blogImage", blogImage);

    try {
      const { data } = await axios.post(
        "http://localhost:5001/api/blogs/create",
        formData,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      toast.success(data.message || "Blog created successfully");
      setTitle("");
      setCategory("");
      setAbout("");
      setBlogImage("");
      setBlogImagePreview("");
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Error occurred while creating blog"
      );
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-200 to-indigo-500 py-12">
      <div className="max-w-4xl mx-auto bg-white p-8 rounded-xl shadow-lg">
        <h3 className="text-3xl font-bold text-center text-gray-800 mb-6">
          Create a New Blog
        </h3>

        <form onSubmit={handleCreateBlog} className="space-y-6">
          {/* Category Dropdown */}
          <div className="space-y-2">
            <label className="block text-lg text-gray-700 font-semibold">
              Category
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select Category</option>
              <option value="Devotion">Devotion</option>
              <option value="Sports">Sports</option>
              <option value="Coding">Coding</option>
              <option value="Entertainment">Entertainment</option>
              <option value="Business">Business</option>
            </select>
          </div>

          {/* Title Input */}
          <div className="space-y-2">
            <label className="block text-lg text-gray-700 font-semibold">
              Title
            </label>
            <input
              type="text"
              placeholder="Enter your blog title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Blog Image Upload */}
          <div className="space-y-2">
            <label className="block text-lg text-gray-700 font-semibold">
              Blog Image
            </label>
            <div className="flex items-center justify-center">
              <img
                src={blogImagePreview || "/imgPL.webp"}
                alt="Blog Preview"
                className="w-full max-w-md h-auto rounded-lg object-cover shadow-md"
              />
            </div>
            <input
              type="file"
              onChange={changePhotoHandler}
              accept="image/png, image/jpeg, image/webp"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* About Section */}
          <div className="space-y-2">
            <label className="block text-lg text-gray-700 font-semibold">
              About
            </label>
            <textarea
              rows="5"
              placeholder="Write something about your blog"
              value={about}
              onChange={(e) => setAbout(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Submit Button */}
          <div className="flex justify-center">
            <button
              type="submit"
              className="w-full max-w-xs py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-200"
            >
              Post Blog
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CreateBlog;
