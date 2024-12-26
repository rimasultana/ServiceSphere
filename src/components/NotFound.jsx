import { Link } from "react-router";

const NotFound = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center text-center">
      <h1 className="text-6xl font-bold text-gray-800 mb-4">404</h1>
      <p className="text-2xl text-gray-600 mb-6">Oops! Page not found</p>
      <p className="text-lg text-gray-500 mb-6">
        The page you're looking for doesn't exist or has been moved.
      </p>
      <Link
        to="/"
        className="bg-primary text-white py-2 px-6 rounded-md hover:bg-primary-dark transition-all duration-300"
      >
        Go Back to Home
      </Link>
    </div>
  );
};

export default NotFound;
