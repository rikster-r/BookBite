import React from 'react';
import PropTypes from 'prop-types';

const BookList = ({ books, title, openModal }) => {
  const filtered = books.filter(book => book.status === title);

  if (filtered.length === 0) return <></>;

  return (
    <div className="w-full">
      <h2 className="pl-6 mb-3">{title}</h2>
      <div>
        {filtered.map(book => {
          {
            /* todo - notes, show full image on hover, show edit on image click */
          }
          return (
            <div
              key={book.id}
              className="relative group flex items-center p-3 pr-6 gap-3 hover:bg-gray-800 hover:text-white"
            >
              <img
                src={book.imageUrl}
                className="hidden group-hover:block absolute -left-36 rounded"
              />
              <div className="w-12 h-12 relative">
                <img
                  className="rounded object-cover object-center w-full max-h-full h-auto group-hover:hidden"
                  src={book.imageUrl}
                />
                <button
                  className="rounded w-full h-full hidden bg-gray-700 group-hover:flex items-center justify-center"
                  onClick={() => openModal(book)}
                >
                  <svg className="w-4/5" viewBox="0 0 24 24">
                    <path
                      fill="currentColor"
                      d="M16,12A2,2 0 0,1 18,10A2,2 0 0,1 20,12A2,2 0 0,1 18,14A2,2 0 0,1 16,12M10,12A2,2 0 0,1 12,10A2,2 0 0,1 14,12A2,2 0 0,1 12,14A2,2 0 0,1 10,12M4,12A2,2 0 0,1 6,10A2,2 0 0,1 8,12A2,2 0 0,1 6,14A2,2 0 0,1 4,12Z"
                    />
                  </svg>
                </button>
              </div>
              <h3 className="text-lg mr-auto">{book.title}</h3>
              {book.rating ? <p className="whitespace-nowrap">Score: {book.rating}/10</p> : ''}
            </div>
          );
        })}
      </div>
    </div>
  );
};

BookList.propTypes = {
  books: PropTypes.array,
  title: PropTypes.string,
  openModal: PropTypes.func,
};

export default BookList;
