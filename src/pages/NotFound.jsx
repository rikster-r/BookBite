import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <main className="flex-1 flex flex-col items-center justify-center text-gray-800 dark:text-white dark:bg-gray-700 text-center px-8">
      <h2 className="mb-2 text-4xl sm:text-5xl font-bold leading-none dark:text-white">404</h2>
      <h4 className="mb-3 text-xl sm:text-3xl font-semibold leading-tight">
        Oops! That page can’t be found
      </h4>
      <p className="mb-8 text-lg">The page you are looking for doesn’t exist</p>
      <Link
        to="/"
        className="px-8 py-3 tracking-wide text-white transition-colors duration-300 transform bg-blue-600 rounded-md hover:bg-blue-500 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-80 hover:cursor-pointer"
      >
        Go to Homepage
      </Link>
    </main>
  );
};

export default NotFound;
