import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

function MyBlogs() {
  const [myBlogs, setMyBlogs] = useState([]);
  
  useEffect(() => {
    const fetchMyBlogs = async () => {
      try {
        const { data } = await axios.get(
          "http://localhost:5001/api/blogs/my-blog",
          { withCredentials: true }
        );
        setMyBlogs(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchMyBlogs();
  }, []);

  const handleDelete = async (id) => {
    await axios
      .delete(`http://localhost:5001/api/blogs/delete/${id}`, {
        withCredentials: true,
      })
      .then((res) => {
        toast.success(res.data.message || "Blog deleted successfully");
        setMyBlogs((value) => value.filter((blog) => blog._id !== id));
      })
      .catch((error) => {
        toast.error(error.response.message || "Failed to delete blog");
      });
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-semibold text-center text-gray-800 mb-10">My Blogs</h2>
        
        <div className="grid gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {myBlogs && myBlogs.length > 0 ? (
            myBlogs.map((element) => (
              <div
                className="bg-white rounded-lg shadow-xl overflow-hidden hover:scale-105 transform transition duration-300"
                key={element._id}
              >
                {element?.blogImage && (
                  <img
                    src={element?.blogImage.url}
                    alt="blogImg"
                    className="w-full h-64 object-cover rounded-t-lg"
                  />
                )}
                <div className="p-6">
                  <span className="text-sm text-blue-600 font-semibold">{element.category}</span>
                  <h4 className="text-2xl font-bold my-3">{element.title}</h4>
                  <div className="flex justify-between mt-4 space-x-3">
                    <Link
                      to={`/blog/update/${element._id}`}
                      className="text-blue-500 font-medium py-2 px-4 border border-blue-500 rounded-md hover:bg-blue-500 hover:text-white transition duration-200"
                    >
                      Update
                    </Link>
                    <button
                      onClick={() => handleDelete(element._id)}
                      className="text-red-500 font-medium py-2 px-4 border border-red-500 rounded-md hover:bg-red-500 hover:text-white transition duration-200"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-500">You have not posted any blog to see!</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default MyBlogs;
