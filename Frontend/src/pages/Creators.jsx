import axios from "axios";
import { useEffect, useState } from "react";

function Creators() {
  const [creators, setCreators] = useState([]);
  console.log(creators);
  useEffect(() => {
    const fetchCreators = async () => {
      try {
        const { data } = await axios.get(
          "http://localhost:5001/api/users/admins",
          {
            withCredentials: true,
          }
        );
        setCreators(data.admins);
      } catch (error) {
        console.log(error);
      }
    };
    fetchCreators();
  }, []);

  return (
    <div className="bg-gradient-to-r from-indigo-500 via-purple-600 to-pink-500 min-h-screen py-12">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap justify-center items-center gap-8">
          {creators.map((creator) => (
            <div
              key={creator._id}
              className="bg-white shadow-2xl rounded-xl overflow-hidden max-w-sm w-full transform transition-transform hover:scale-105 duration-300"
            >
              <div className="relative">
                <img
                  src={creator.photo.url}
                  alt="creator-image"
                  className="w-full h-40 object-cover rounded-t-xl"
                />
                <div className="absolute inset-x-0 bottom-0 transform translate-y-1/2">
                  <img
                    src={creator.photo.url}
                    alt="avatar"
                    className="w-20 h-20 rounded-full mx-auto border-4 border-indigo-600 shadow-lg"
                  />
                </div>
              </div>
              <div className="px-6 py-6 mt-6 text-center">
                <h2 className="text-2xl font-semibold text-gray-800 mb-2">
                  {creator.name}
                </h2>
                <p className="text-gray-600 mb-2">{creator.email}</p>
                <p className="text-gray-600 mb-2">{creator.phone}</p>
                <p className="text-gray-600 font-medium">{creator.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Creators;
