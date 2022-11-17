import React from 'react';
import PropTypes from 'prop-types';

const Book = ({ item }) => {
  if (!item.volumeInfo.imageLinks) {
    return '';
  }

  return (
    <li className="max-h-32 sm:max-h-48 w-full text-ellipsis overflow-hidden ...">
      <div className="flex gap-3 sm:gap-6">
        <img
          alt="Book Cover"
          className="w-16 sm:w-max max-w-xs h-max max-h-96 object-center rounded"
          src={item.volumeInfo?.imageLinks?.thumbnail}
        />
        <div>
          <h2 className="text-sm title-font tracking-widest text-gray-700 dark:text-gray-200">
            {item.volumeInfo?.authors?.join(', ')}
          </h2>
          <h1 className="text-base sm:text-2xl title-font font-bold mb-1">
            {item.volumeInfo.title}
          </h1>
          <p className="leading-relaxed">{item.volumeInfo.description}</p>
        </div>
      </div>
    </li>
  );
};

Book.propTypes = {
  item: PropTypes.object,
};

export default Book;
