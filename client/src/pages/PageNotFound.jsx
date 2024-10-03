import { Link } from 'react-router-dom';

const PageNotFound = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-blue-600">404</h1>
        <p className="mt-4 text-2xl text-gray-800">Page Not Found</p>
        <p className="mt-2 text-gray-600">
          Sorry, the page you are looking for does not exist.
        </p>
        <Link
          to="/"
          className="mt-6 inline-block px-4 py-2 text-gray-900 bg-blue-500 rounded hover:bg-blue-600 transition"
        >
          Go Home
        </Link>
      </div>
    </div>
  );
};

export default PageNotFound;
