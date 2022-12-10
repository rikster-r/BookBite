import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { motion } from 'framer-motion';
import { saveBook, getBookbyId, deleteBookById } from '../Firebase';
import Backdrop from './Backdrop';

const dropIn = {
  hidden: {
    scale: 0,
    opacity: 0,
  },
  visible: {
    scale: 1,
    opacity: 1,
  },
  exit: {
    scale: 0,
    opacity: 0,
  },
};

const BookEditModal = ({ book, closeModal }) => {
  const [status, setStatus] = useState('');
  const [rating, setRating] = useState('');
  const [notes, setNotes] = useState('');

  useEffect(() => {
    (async () => {
      const data = await getBookbyId(book.id);
      if (data) {
        setStatus(data.status);
        setRating(data.rating);
        setNotes(data.notes);
      }
    })();
  }, []);

  const handleSubmit = e => {
    e.preventDefault();

    const bookObject = {
      status,
      rating,
      notes,
      title: book.title,
      imageUrl: book.imageUrl,
    };

    saveBook(book.id, bookObject);
    closeModal();
    //todo - success message
  };

  const handleRemove = () => {
    deleteBookById(book.id);
    closeModal();
  };

  return (
    <Backdrop onClick={closeModal}>
      <motion.div
        onClick={e => e.stopPropagation()}
        className="relative overflow-hidden rounded-lg sm:my-8 sm:w-full sm:max-w-lg"
        variants={dropIn}
        initial="hidden"
        animate="visible"
        exit="exit"
      >
        <form
          onSubmit={handleSubmit}
          className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all dark:bg-gray-700 text-gray-800 dark:text-white "
        >
          <div className="flex flex-col gap-5 px-4 py-4 sm:p-6 dark:bg-gray-700 text-gray-800 dark:text-white">
            <div className="flex flex-col gap-1">
              <label htmlFor="status" className="block font-medium">
                Status
              </label>
              <select
                id="status"
                name="status"
                autoComplete="Status"
                className="block w-full rounded-md border border-gray-300 px-4 py-2 bg-white focus:border-blue-400 focus:outline-none focus:ring focus:ring-opacity-40 focus:ring-blue-300 sm:text-sm shadow-sm text-gray-800"
                value={status}
                onChange={e => setStatus(e.target.value)}
                required
              >
                <option value="">-- Select status -- </option>
                <option value="Reading">Reading</option>
                <option value="Completed">Completed</option>
                <option value="Dropped">Dropped</option>
                <option value="Paused">Paused</option>
                <option value="Planning">Planning</option>
              </select>
            </div>
            <div className="flex flex-col gap-1">
              <label htmlFor="rating" className="block">
                Rating
              </label>
              <input
                type="number"
                name="rating"
                id="rating"
                className="block w-full rounded-md border border-gray-300 px-4 py-2 focus:border-blue-400 focus:outline-none focus:ring focus:ring-opacity-40 focus:ring-blue-300 sm:text-sm shadow-sm text-gray-800"
                placeholder="0 - 10"
                min="1"
                max="10"
                value={rating}
                onChange={e => setRating(e.target.value)}
              />
            </div>
            <div className="flex flex-col gap-1">
              <label htmlFor="notes" className="block">
                Notes
              </label>
              <textarea
                name="notes"
                id="notes"
                className="min-h-[80px] w-full rounded-md border border-gray-300 px-4 py-4 focus:border-blue-400 focus:outline-none focus:ring focus:ring-opacity-40 focus:ring-blue-300 sm:text-sm shadow-sm text-gray-800 resize-y"
                value={notes}
                onChange={e => setNotes(e.target.value)}
              />
            </div>
          </div>
          <div className="px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6 text-gray-800 dark:text-white dark:bg-gray-700 ">
            <button
              type="submit"
              className="mb-3 inline-flex w-full justify-center rounded-md border border-transparent bg-blue-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:ml-3 sm:w-auto sm:text-sm"
            >
              Confirm
            </button>
            {status ? (
              <button
                type="button"
                className="mb-3 inline-flex w-full justify-center rounded-md border border-transparent bg-red-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-rose-500 focus:ring-offset-2 sm:ml-3 sm:w-auto sm:text-sm"
                onClick={handleRemove}
              >
                Delete
              </button>
            ) : (
              ''
            )}
            <button
              type="button"
              className="mb-3 inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-base font-medium text-gray-800 shadow-sm hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
              onClick={closeModal}
            >
              Cancel
            </button>
          </div>
        </form>
      </motion.div>
    </Backdrop>
  );
};

BookEditModal.propTypes = {
  book: PropTypes.object,
  closeModal: PropTypes.func,
};

export default BookEditModal;
