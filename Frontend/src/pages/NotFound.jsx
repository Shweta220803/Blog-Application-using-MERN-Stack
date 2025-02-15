// const NotFound = () => {
//   return (
//     <div className="fl">
//     <h1>404</h1>
//     <span>Page not found</span>
      
//     </div>
//   )
// }

// export default NotFound
const NotFound = () => {
    return (
      <div className="min-h-screen bg-gradient-to-r from-purple-600 to-blue-500 flex flex-col items-center justify-center text-center text-white">
        <h1 className="text-9xl font-bold animate-pulse">404</h1>
        <span className="text-2xl mt-4 font-medium">
          Oops! The page you're looking for doesn't exist.
        </span>
        <p className="mt-2 text-lg">
          But don't worry, you can always go back to the{" "}
          <a
            href="/"
            className="text-yellow-300 hover:underline transition duration-200"
          >
            Homepage
          </a>.
        </p>
        <div className="mt-8">
          <a
            href="/"
            className="bg-white text-blue-500 px-6 py-3 rounded-full shadow-md font-semibold hover:bg-gray-100 hover:shadow-lg transition duration-200"
          >
            Back to Home
          </a>
        </div>
      </div>
    );
  };
  
  export default NotFound;
  