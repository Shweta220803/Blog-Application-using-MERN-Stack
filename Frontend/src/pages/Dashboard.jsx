// import { useState } from "react";
// import { useAuth } from "../context/AuthProvider";
// import SideBar from "../dashboard/SideBar";
// import MyProfile from "../dashboard/MyProfile";
// import MyBlogs from "../dashboard/MyBlogs";
// import CreateBlog from "../dashboard/CreateBlog";
// import UpdateBlog from "../dashboard/UpdateBlog";
// import { Navigate } from "react-router-dom";

// function Dashboard() {
//   const { profile, isAuthenticated } = useAuth();
//   const [component, setComponent] = useState("My Blogs");

//   // Check if the user is authenticated; if not, redirect to home page
//   if (!isAuthenticated) {
//     return <Navigate to={"/"} />;
//   }

//   return (
//     <div className="flex bg-gray-100 min-h-screen">
//       <SideBar component={component} setComponent={setComponent} />
//       <div className="flex-1 p-8 space-y-6">
//         <div className="bg-white rounded-lg shadow-lg p-6">
//           <div className="flex justify-between items-center mb-6">
//             <h2 className="text-3xl font-semibold text-gray-800">Dashboard</h2>
//             <div className="text-gray-600">{profile?.name}</div>
//           </div>

//           {/* Render the corresponding component based on the selected option */}
//           {component === "My Profile" ? (
//             <MyProfile />
//           ) : component === "Create Blog" ? (
//             <CreateBlog />
//           ) : component === "Update Blog" ? (
//             <UpdateBlog />
//           ) : (
//             <MyBlogs />
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Dashboard;
import { useState } from "react";
import { useAuth } from "../context/AuthProvider";
import SideBar from "../dashboard/SideBar";
import MyProfile from "../dashboard/MyProfile";
import MyBlogs from "../dashboard/MyBlogs";
import CreateBlog from "../dashboard/CreateBlog";
import UpdateBlog from "../dashboard/UpdateBlog";
import { Navigate } from "react-router-dom";

function Dashboard() {
  const { profile, isAuthenticated } = useAuth();
  const [component, setComponent] = useState("My Blogs");

  // Check if the user is authenticated; if not, redirect to home page
  if (!isAuthenticated) {
    return <Navigate to={"/"} />;
  }

  return (
    <div className="flex bg-gray-100 min-h-screen">
      {/* Sidebar, hidden on smaller screens */}
      <div className="hidden lg:block lg:w-1/4 bg-white shadow-lg">
        <SideBar component={component} setComponent={setComponent} />
      </div>
      
      {/* Main content area */}
      <div className="flex-1 p-4 sm:p-6 md:p-8 space-y-6">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-3xl font-semibold text-gray-800">Dashboard</h2>
            <div className="text-gray-600">{profile?.name}</div>
          </div>

          {/* Render the corresponding component based on the selected option */}
          {component === "My Profile" ? (
            <MyProfile />
          ) : component === "Create Blog" ? (
            <CreateBlog />
          ) : component === "Update Blog" ? (
            <UpdateBlog />
          ) : (
            <MyBlogs />
          )}
        </div>
      </div>

      {/* Sidebar for mobile devices */}
      <div className="lg:hidden fixed bottom-0 left-0 w-full bg-white shadow-lg z-10">
        <SideBar component={component} setComponent={setComponent} />
      </div>
    </div>
  );
}

export default Dashboard;
