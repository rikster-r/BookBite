import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import useQueryResults from '../../hooks/useQueryResults';

import Loading from '../../components/Loading';
import Book from './Book';
import BookEditModal from '../../components/BookEditModal';
import SuccessPopup from '../../components/popups/SuccessPopup';

const SearchResults = () => {
  const query = useParams().query;
  const results = useQueryResults(query);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [currentBook, setCurrentBook] = useState(null);

  const openModal = book => {
    setCurrentBook({
      id: book.id,
      title: book.volumeInfo.title,
      imageUrl: book.volumeInfo.imageLinks.thumbnail.replace(/^http:\/\//i, 'https://'),
    });
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setCurrentBook(null);
    setIsModalOpen(false);
  };

  const showPopup = () => {
    setIsPopupOpen(true);

    setTimeout(() => setIsPopupOpen(false), 2000);
  };

  if (results === undefined) {
    //while data isn't returned
    return (
      <main className="flex-1 flex items-center justify-center dark:bg-gray-700">
        <Loading />
      </main>
    );
  }

  if (!results?.totalItems) {
    //when there are no books
    return (
      <main className="flex-1 dark:bg-gray-700 text-gray-800 dark:text-white py-4 px-6 lg:px-32 2xl:px-72">
        <p>No results found. Try changing your request</p>
      </main>
    );
  }

  return (
    <main className="flex-1 dark:bg-gray-700 text-gray-800 dark:text-white flex flex-col gap-6 py-4 px-6 lg:px-32 2xl:px-72">
      <p>Total Results: {results.totalItems}. Showing first 10 results</p>
      <ul className="flex flex-col items-center gap-6 m-0">
        {results.items.map(item => (
          <Book item={item} openModal={openModal} key={item.id} />
        ))}
      </ul>
      <AnimatePresence initial={false} mode="wait">
        {isModalOpen && (
          <BookEditModal
            book={currentBook}
            closeModal={closeModal}
            showPopup={showPopup}
            key="modal"
          />
        )}
        {isPopupOpen && <SuccessPopup text="Book edited succesfully" />}
      </AnimatePresence>
    </main>
  );
};

export default SearchResults;
