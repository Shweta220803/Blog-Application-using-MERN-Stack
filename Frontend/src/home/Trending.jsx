import { useAuth } from "../context/AuthProvider";
import { Link } from "react-router-dom";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

function Trending() {
  const { blogs } = useAuth();

  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 3000 },
      items: 5,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 4,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };

  return (
    <div className="container mx-auto my-12 px-6">
      <h1 className="text-2xl font-semibold mb-6 text-center">Trending</h1>
      <Carousel responsive={responsive} autoPlay infinite>
        {blogs && blogs.length > 0 ? (
          blogs.slice(0, 6).map((element) => {
            return (
              <div
                key={element._id}
                className="p-4 bg-white border border-gray-300 rounded-lg shadow-md mx-2 transform hover:scale-105 transition-transform duration-300"
              >
                <Link to={`/blog/${element._id}`}>
                  <div className="relative">
                    <img
                      src={element.blogImage.url}
                      alt="blog"
                      className="w-full h-56 object-cover rounded-t-lg"
                    />
                    <div className="absolute top-4 left-4 bg-blue-600 text-white px-3 py-1 rounded-full text-sm">
                      {element.category}
                    </div>
                  </div>
                  <div className="p-4 bg-gray-50 rounded-b-lg h-36 flex flex-col justify-between">
                    <h1
                      className="text-lg font-bold mb-2 text-gray-800 overflow-hidden text-ellipsis"
                      style={{ whiteSpace: "nowrap" }}
                    >
                      {element.title}
                    </h1>
                    <div className="flex items-center">
                      <img
                        src={element.adminPhoto}
                        alt="author_avatar"
                        className="w-10 h-10 rounded-full border-2 border-yellow-500"
                      />
                      <p className="ml-3 text-gray-600 text-sm">{element.adminName}</p>
                    </div>
                  </div>
                </Link>
              </div>
            );
          })
        ) : (
          <div className="flex h-screen items-center justify-center text-xl text-gray-600">
            Loading...
          </div>
        )}
      </Carousel>
    </div>
  );
}

export default Trending;
