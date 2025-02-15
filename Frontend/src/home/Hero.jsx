import { useAuth } from "../context/AuthProvider";
import { Link } from "react-router-dom";

function Hero() {
  const { blogs } = useAuth();
  console.log(blogs);

  return (
    <div className="container mx-auto my-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 p-6">
      {blogs && blogs.length > 0 ? (
        blogs.slice(0, 4).map((element) => {
          return (
            <Link
              to={`/blog/${element._id}`}
              key={element._id}
              className="bg-white rounded-lg shadow-md hover:shadow-xl overflow-hidden transform hover:scale-105 transition-transform duration-300"
            >
              <div className="relative">
                <img
                  src={element.blogImage.url}
                  alt={element.title}
                  className="w-full h-56 object-cover rounded-t-lg"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60 group-hover:opacity-100 transition-opacity duration-300"></div>
                <h1 className="absolute bottom-4 left-4 text-white text-xl font-bold group-hover:text-yellow-400 transition-colors duration-300">
                  {element.title}
                </h1>
              </div>
              <div className="p-6 flex items-center">
                <img
                  src={element.adminPhoto}
                  alt={element.adminName}
                  className="w-14 h-14 rounded-full border-4 border-yellow-400"
                />
                <div className="ml-4">
                  <p className="text-lg font-semibold text-gray-800">{element.adminName}</p>
                  <p className="text-xs text-gray-500">New</p>
                </div>
              </div>
            </Link>
          );
        })
      ) : (
        <div className="flex h-screen items-center justify-center text-lg text-gray-600">
          Loading...
        </div>
      )}
    </div>
  );
}

export default Hero;
