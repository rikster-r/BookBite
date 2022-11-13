import React from 'react';
import LoginButton from './LoginButton';
import SearchBar from './SearchBar';

const Header = () => {
  return (
    <header className="flex flex-wrap items-center justify-between gap-6 px-6 py-4 bg-white shadow dark:bg-gray-800">
      <h1 className="text-2xl font-bold text-gray-800 dark:text-white lg:text-3xl">Library</h1>
      <SearchBar />
      <LoginButton />
    </header>
  );
};

export default Header;
