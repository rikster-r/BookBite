import React from 'react';
import { Link } from 'react-router-dom';
import LoginButton from './LoginButton';
import SearchBar from './SearchBar';

const Header = () => {
  return (
    <header className="flex flex-wrap items-center justify-between gap-6 px-6 py-4 lg:px-32 2xl:px-72 bg-white shadow dark:bg-gray-800">
      <Link to="/" className="flex items-center">
        <svg className="w-10 h-10 dark:fill-white" viewBox="0 0 24 24">
          <path d="M9 3V18H12V3H9M12 5L16 18L19 17L15 4L12 5M5 5V18H8V5H5M3 19V21H21V19H3Z" />
        </svg>
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white lg:text-3xl">Library</h1>
      </Link>
      <SearchBar />
      <LoginButton />
    </header>
  );
};

export default Header;
