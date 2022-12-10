import React from 'react';
import PropTypes from 'prop-types';
import { auth, isUserSignedIn } from '../../Firebase';

const BookList = ({ books, title, sort, openModal, username }) => {
  const filtered = books
    .filter(book => book.status === title)
    .sort((prevBook, book) => {
      // if property is a number uses 1st method, else uses 2nd
      return (
        book[sort.toLowerCase()] - prevBook[sort.toLowerCase()] ||
        (book[sort.toLowerCase()] < prevBook[sort.toLowerCase()] ? 1 : -1)
      );
    });
  const authorized = isUserSignedIn() && username === auth.currentUser.displayName;

  if (filtered.length === 0) return <></>;

  return (
    <div>
      <h2 className="pl-6 mb-2">{title}</h2>
      <div>
        {filtered.map(book => {
          return (
            <div
              key={book.id}
              className="relative group-one flex items-center p-3 pr-6 gap-3 hover:bg-gray-800 hover:text-white text-base sm:text-lg"
            >
              {/* full image on hover */}
              <img
                src={book.imageUrl}
                className="hidden md:group-one-hover:block absolute -left-36 rounded"
              />
              <div className="w-11 h-11 sm:w-12 sm:h-12 shrink-0">
                {/* small image for list */}
                <img
                  className={`rounded object-cover object-center w-full max-h-full group-one-hover:hidden`}
                  src={book.imageUrl}
                />
                {/* Edit button on hover */}
                {authorized ? (
                  <button
                    className="rounded w-full h-full hidden bg-gray-700 group-one-hover:flex items-center justify-center"
                    onClick={() => openModal(book)}
                  >
                    <svg className="w-4/5" viewBox="0 0 24 24">
                      <path
                        fill="currentColor"
                        d="M16,12A2,2 0 0,1 18,10A2,2 0 0,1 20,12A2,2 0 0,1 18,14A2,2 0 0,1 16,12M10,12A2,2 0 0,1 12,10A2,2 0 0,1 14,12A2,2 0 0,1 12,14A2,2 0 0,1 10,12M4,12A2,2 0 0,1 6,10A2,2 0 0,1 8,12A2,2 0 0,1 6,14A2,2 0 0,1 4,12Z"
                      />
                    </svg>
                  </button>
                ) : (
                  ''
                )}
              </div>
              <h3 className="mr-auto line-clamp-2">{book.title}</h3>
              {book.notes ? (
                <div className="group-two relative">
                  <svg className="w-5 h-5 sm:w-6 sm:h-6 fill-current" viewBox="0 0 24 24">
                    <path d="M9,22A1,1 0 0,1 8,21V18H4A2,2 0 0,1 2,16V4C2,2.89 2.9,2 4,2H20A2,2 0 0,1 22,4V16A2,2 0 0,1 20,18H13.9L10.2,21.71C10,21.9 9.75,22 9.5,22V22H9M10,16V19.08L13.08,16H20V4H4V16H10M6,7H18V9H6V7M6,11H15V13H6V11Z" />
                  </svg>
                  <p className="z-10 hidden md:group-two-hover:block absolute rounded text-base p-4 -right-1/2 w-max max-w-xs bg-gray-800">
                    {book.notes}
                  </p>
                </div>
              ) : (
                ''
              )}
              {book.rating ? (
                <p className="whitespace-nowrap ml-1">
                  <span className="hidden sm:inline-block mr-1">Rating:</span>
                  <span>{book.rating}/10</span>
                </p>
              ) : (
                ''
              )}
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
  sort: PropTypes.string,
  openModal: PropTypes.func,
  username: PropTypes.string,
};

export default BookList;
