import React from 'react';
import { Link } from 'react-router-dom';
import { signIn, signOutUser } from '../../Firebase';
import useUserData from '../../hooks/useUserData.js';

const LoginButton = () => {
  const [name, profilePic] = useUserData();

  return (
    <>
      {name ? (
        <div className="relative group">
          <button className="flex items-center gap-1">
            <img
              className="rounded-full w-9 h-9"
              src={profilePic}
              alt="Profile Picture"
              referrerPolicy="no-referrer"
            />
            <h2 className="text-lg text-gray-800 dark:text-white">{name}</h2>
            <svg
              className="hidden sm:block w-5 h-5 fill-gray-400 group-hover:fill-gray-600
              dark:fill-gray-600 dark:group-hover:fill-gray-400 mt-1"
              viewBox="0 0 24 24"
            >
              <path d="M7.41,8.58L12,13.17L16.59,8.58L18,10L12,16L6,10L7.41,8.58Z" />
            </svg>
          </button>

          {/* Dropdown */}
          <div
            className={`hidden sm:group-hover:block absolute origin-top-right top-9 py-2 z-10 min-w-full rounded-md bg-white dark:bg-gray-800 shadow-lg ring-3 ring-white focus:outline-none`}
          >
            <div className="py-1">
              <Link
                to={`/profile/${name}`}
                className="flex items-center gap-1 w-full px-4 p-2 text-left text-sm dark:text-white hover:text-gray-500 dark:hover:text-gray-300 "
              >
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                  <path d="M12,4A4,4 0 0,1 16,8A4,4 0 0,1 12,12A4,4 0 0,1 8,8A4,4 0 0,1 12,4M12,14C16.42,14 20,15.79 20,18V20H4V18C4,15.79 7.58,14 12,14Z" />
                </svg>
                <span>Profile</span>
              </Link>
              <Link
                to={`/profile/${name}/statistics`}
                className="flex items-center gap-1 w-full px-4 py-2 text-left text-sm dark:text-white  hover:text-gray-500 dark:hover:text-gray-300"
              >
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                  <path d="M22,21H2V3H4V19H6V10H10V19H12V6H16V19H18V14H22V21Z" />
                </svg>
                <span>Statistics</span>
              </Link>
              <Link
                to="/"
                className="flex items-center gap-1 w-full px-4 py-2 text-left text-sm text-red-500  hover:text-red-700"
                onClick={signOutUser}
              >
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                  <path d="M14.08,15.59L16.67,13H7V11H16.67L14.08,8.41L15.5,7L20.5,12L15.5,17L14.08,15.59M19,3A2,2 0 0,1 21,5V9.67L19,7.67V5H5V19H19V16.33L21,14.33V19A2,2 0 0,1 19,21H5C3.89,21 3,20.1 3,19V5C3,3.89 3.89,3 5,3H19Z" />
                </svg>
                <span>Sign out</span>
              </Link>
            </div>
          </div>
        </div>
      ) : (
        <button
          className="px-6 py-2 tracking-wide text-white transition-colors duration-300 transform bg-blue-600 rounded-md hover:bg-blue-500 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-80"
          onClick={signIn}
        >
          Login/Register
        </button>
      )}
    </>
  );
};

export default LoginButton;
