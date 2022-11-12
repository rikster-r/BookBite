import React from 'react';
import SearchBar from './SearchBar';

const Header = () => {
  return (
    <header>
      <div className="flex items-center justify-between gap-3 px-6 py-4 bg-white shadow dark:bg-gray-800">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white lg:text-3xl">Library</h1>
        <SearchBar />
      </div>
    </header>
  );
};

export default Header;
