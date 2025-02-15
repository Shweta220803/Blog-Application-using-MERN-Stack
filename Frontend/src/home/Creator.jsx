import axios from "axios";
import { useEffect, useState } from "react";

function Creator() {
  const [admin, setAdmin] = useState([]);
  console.log(admin);

  useEffect(() => {
    const fetchAdmins = async () => {
      const { data } = await axios.get(
        "http://localhost:5001/api/users/admins",
        {
          withCredentials: true,
        }
      );
      console.log(data.admins);
      setAdmin(data.admins);
    };
    fetchAdmins();
  }, []);

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold text-center text-purple-600 mb-8">
        Popular Creators
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {admin && admin.length > 0 ? (
          admin.slice(0, 4).map((element) => {
            return (
              <div
                key={element._id}
                className="bg-white shadow-lg rounded-lg overflow-hidden transition-transform duration-300 hover:scale-105"
              >
                <img
                  src={element.photo.url}
                  alt="creator"
                  className="w-full h-64 object-cover"
                />
                <div className="p-4 text-center">
                  <p className="text-lg font-semibold text-gray-800">
                    {element.name}
                  </p>
                  <p className="text-sm text-gray-500">{element.role}</p>
                </div>
              </div>
            );
          })
        ) : (
          <div className="text-center col-span-full text-gray-500">
            No creators found.
          </div>
        )}
      </div>
    </div>
  );
}

export default Creator;
