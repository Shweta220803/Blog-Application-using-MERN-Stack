import { useAuth } from "../context/AuthProvider";

function MyProfile() {
  const { profile } = useAuth();
  console.log(profile?.user);
  
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg overflow-hidden max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg w-full">
        <div className="relative">
          <img
            src={profile?.user?.photo?.url}
            alt="Cover"
            className="w-full h-48 object-cover rounded-t-lg"
          />
          <div className="absolute inset-x-0 bottom-0 transform translate-y-1/2">
            <img
              src={profile?.user?.photo?.url}
              alt="Avatar"
              className="w-28 h-28 rounded-full mx-auto border-4 border-white shadow-lg"
            />
          </div>
        </div>
        <div className="px-6 py-8 mt-16">
          <h2 className="text-center text-3xl font-semibold text-gray-800">
            {profile?.user?.name}
          </h2>
          <p className="text-center text-gray-600 mt-2">{profile?.user?.email}</p>
          <p className="text-center text-gray-600 mt-2">{profile?.user?.phone}</p>
          <p className="text-center text-gray-600 mt-2">{profile?.user?.role}</p>
        </div>
      </div>
    </div>
  );
}

export default MyProfile;
