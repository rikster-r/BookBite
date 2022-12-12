import Dropdown from './Dropdown';
import React, { useState } from 'react';
import { signIn } from '../../Firebase';
import useUserData from '../../hooks/useUserData.js';

const LoginButton = () => {
  const [name, profilePic] = useUserData();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {name ? (
        <div
          className="relative group"
          onMouseEnter={() => setIsOpen(true)}
          onMouseLeave={() => setIsOpen(false)}
        >
          <div className="flex items-center gap-1 hover:cursor-pointer">
            <img
              className="w-9 h-9 rounded-sm"
              src={profilePic}
              alt="Profile Picture"
              referrerPolicy="no-referrer"
            />
            <svg
              className="hidden xl:block w-5 h-5 fill-gray-400 group-hover:fill-gray-600
              dark:fill-gray-600 dark:group-hover:fill-gray-400 mt-1"
              viewBox="0 0 24 24"
            >
              <path d="M7.41,8.58L12,13.17L16.59,8.58L18,10L12,16L6,10L7.41,8.58Z" />
            </svg>
          </div>
          {isOpen && <Dropdown name={name} />}
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
