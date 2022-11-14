import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SearchBar = () => {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  const handleQuery = event => {
    event.preventDefault();

    navigate(`/books/search/${query}`, { state: { query } });
  };

  return (
    <div className="relative flex min-w-fit w-full order-last mr-auto sm:order-none sm:w-auto">
      <span className="absolute inset-y-0 left-0 flex items-center pl-3">
        <svg className="w-5 h-5 text-gray-400" viewBox="0 0 24 24" fill="none">
          <path
            d="M21 21L15 15M17 10C17 13.866 13.866 17 10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10Z"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          ></path>
        </svg>
      </span>

      <form onSubmit={handleQuery}>
        <input
          type="text"
          className="w-full py-2 pl-10 text-gray-700 bg-white border rounded-lg dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:outline-none focus:ring focus:ring-opacity-40 focus:ring-blue-300"
          placeholder="Search"
          value={query}
          onChange={e => setQuery(e.target.value)}
        />
      </form>
    </div>
  );
};

export default SearchBar;
