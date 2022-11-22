import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Loading from '../components/Loading';
import Sidebar from '../components/Sidebar';
import BookList from '../components/BookList';
import BookEditModal from '../components/BookEditModal';

const Profile = ({ books }) => {
  const [filter, setFilter] = useState('All');
  const [isOpen, setIsOpen] = useState(false);
  const [currentBook, setCurrentBook] = useState(null);

  const changeFilter = newFilter => setFilter(newFilter);

  const openModal = item => {
    setCurrentBook(item);
    setIsOpen(true);
  };

  const closeModal = () => {
    setCurrentBook(null);
    setIsOpen(false);
  };

  if (books === undefined) {
    return (
      <main className="flex-1 flex items-center justify-center dark:bg-gray-700">
        <Loading />
      </main>
    );
  }

  if (books.length === 0) {
    return (
      <main className="flex-1 dark:bg-gray-700 text-gray-800 dark:text-white py-4 px-6 lg:px-32 2xl:px-72">
        <p>No books in your library found. Use search to find them!</p>
      </main>
    );
  }

  if (filter !== 'All') {
    return (
      <main className="flex-1 dark:bg-gray-700 text-gray-800 dark:text-white grid grid-cols-10 gap-6 py-4 px-6 lg:px-32 2xl:px-72">
        <Sidebar filter={filter} sort="Score" changeFilter={changeFilter} />
        <div className="col-span-10 md:col-span-8 flex flex-col gap-6">
          <BookList books={books} title={filter} openModal={openModal} />
        </div>
        {isOpen ? <BookEditModal book={currentBook} closeModal={closeModal} /> : ''}
      </main>
    );
  }

  return (
    <main className="flex-1 dark:bg-gray-700 text-gray-800 dark:text-white grid grid-cols-10 gap-6 py-4 px-6 lg:px-32 2xl:px-72">
      <Sidebar filter={filter} sort="Score" changeFilter={changeFilter} />
      <div className="col-span-10 md:col-span-8 flex flex-col gap-6">
        <BookList books={books} title="Reading" openModal={openModal} />
        <BookList books={books} title="Completed" openModal={openModal} />
        <BookList books={books} title="Paused" openModal={openModal} />
        <BookList books={books} title="Dropped" openModal={openModal} />
      </div>
      {isOpen ? <BookEditModal book={currentBook} closeModal={closeModal} /> : ''}
    </main>
  );
};

Profile.propTypes = {
  books: PropTypes.any,
};

export default Profile;
