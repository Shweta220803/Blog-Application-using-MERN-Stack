import { useAuth } from "../context/AuthProvider";
import { Link } from "react-router-dom";

function Blogs() {
    const { blogs } = useAuth();

  return (
    <div className="container mx-auto my-12 px-6">
      <header className="text-center mb-12">
        <h1 className="text-3xl font-extrabold text-gray-800">
          Our Blog Collection
        </h1>
        <p className="text-lg text-gray-600 mt-4">
          Explore a wide range of articles that delve into the concept of gods,
          cultures, and belief systems across the world.
        </p>
      </header>

      <section>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {blogs && blogs.length > 0 ? (
            blogs.map((blog, index) => (
              <Link 
                to={`/blog/${blog.id}`}
                key={index}
                className="group relative rounded-xl overflow-hidden shadow-lg hover:scale-105 transition-transform duration-300"
              >
            <img
              src={blog?.blogImage?.url}
              alt={blog?.title}
              className="w-full h-56 object-cover group-hover:opacity-75 transition-opacity duration-300"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-50"></div>
            <div className="absolute bottom-6 left-6 text-white z-10">
              <h2 className="text-xl font-semibold">{blog?.title}</h2>
                  <p className="text-sm mt-2">{blog?.category}</p>
            </div>
          </Link>
          ))
          ) : (
            <div className="col-span-full text-center text-lg text-gray-500">
              No blogs available at the moment.
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

export default Blogs;
