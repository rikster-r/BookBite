import React from 'react';
import PropTypes from 'prop-types';

const Book = ({ item, openModal }) => {
  if (!item.volumeInfo.imageLinks) {
    return '';
  }

  return (
    <li className="w-full">
      <div className="flex gap-3 sm:gap-6">
        <img
          alt="Book Cover"
          className="w-16 sm:w-max max-w-xs h-max max-h-96 object-center rounded"
          src={item.volumeInfo?.imageLinks?.thumbnail}
        />
        <div>
          <h2 className="line-clamp-1 text-sm title-font tracking-widest text-gray-700 dark:text-gray-200">
            {item.volumeInfo?.authors?.join(', ')}
          </h2>
          <div className="flex gap-2 items-center py-1">
            <h1 className="line-clamp-1 text-base sm:text-2xl title-font font-bold">
              {item.volumeInfo.title}
            </h1>
            <button
              className="transition-colors duration-300 transform rounded-full hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-80 hover:cursor-pointer"
              onClick={() => openModal(item.id)}
            >
              <svg className="w-6 h-6 sm:w-8 sm:h-8" viewBox="0 0 24 24">
                <path
                  fill="currentColor"
                  d="M17,13H13V17H11V13H7V11H11V7H13V11H17M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2Z"
                />
              </svg>
            </button>
          </div>
          <p className="leading-relaxed line-clamp-2 sm:line-clamp-5">
            {item.volumeInfo.description}
          </p>
        </div>
      </div>
    </li>
  );
};

Book.propTypes = {
  item: PropTypes.object,
  openModal: PropTypes.func,
};

export default Book;
