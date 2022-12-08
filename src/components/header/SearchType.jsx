import React, { useState } from 'react';
import PropTypes from 'prop-types';

const SearchType = ({ setSearchType, searchType }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      <button
        className="flex-shrink-0 z-10 inline-flex items-center py-2.5 px-4 text-sm font-medium text-center text-gray-900 bg-gray-100 border border-gray-300 rounded-l-lg hover:bg-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-700 dark:text-white dark:border-gray-600 capitalize"
        type="button"
        onClick={() => setIsOpen(status => !status)}
        onBlur={() => setIsOpen(false)}
      >
        {searchType}
        <svg
          aria-hidden="true"
          className="w-4 h-4 ml-1"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
            clipRule="evenodd"
          ></path>
        </svg>
      </button>
      <div
        id="dropdown"
        className={`${
          isOpen ? '' : 'hidden'
        } z-10 absolute bg-white divide-y divide-gray-100 rounded shadow w-full dark:bg-gray-700`}
      >
        <ul
          className="py-1 text-sm text-gray-700 dark:text-gray-200"
          aria-labelledby="dropdown-button"
        >
          {/* onBlur on parent div triggers earlier than onClick but later than onMouseDown*/}
          <li onMouseDown={() => setSearchType('books')}>
            <button
              type="button"
              className="inline-flex w-full px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
            >
              Books
            </button>
          </li>
          <li onMouseDown={() => setSearchType('user')}>
            <button
              type="button"
              className="inline-flex w-full px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
            >
              User
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
};

SearchType.propTypes = {
  setSearchType: PropTypes.func,
  searchType: PropTypes.string,
};

export default SearchType;
