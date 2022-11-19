import React from 'react';
import PropTypes from 'prop-types';
import { isUserSignedIn, saveBook } from '../Firebase';

const BookEditModal = ({ bookId, closeModal }) => {
  //todo - add progress

  /*TO USE

  const [isOpen, setIsOpen] = useState(false);
  const [currentBookId, setCurrentBookId] = useState(null);

  const openModal = id => {
    setCurrentBookId(id);
    setIsOpen(true);
  };

  const closeModal = () => {
    setCurrentBookId(null);
    setIsOpen(false);
  };

  {isOpen ? <BookEditModal bookId={currentBookId} closeModal={closeModal} /> : ''}
  */

  const handleSubmit = e => {
    e.preventDefault();
    let data = new FormData(e.target);
    const bookObject = Object.fromEntries(data.entries());

    if (isUserSignedIn()) {
      saveBook(bookId, bookObject);
      closeModal();
      //todo success message
    } else {
      alert('You must login first');
    }
  };

  return (
    <div className="relative z-10" aria-labelledby="modal-title" role="dialog" aria-modal="true">
      <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity "></div>

      <div className="fixed inset-0 z-10 overflow-y-auto">
        <div className="flex min-h-full justify-center p-4 text-center items-center sm:p-0">
          <form
            onSubmit={handleSubmit}
            className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg dark:bg-gray-700 text-gray-800 dark:text-white "
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
                  required
                >
                  <option value="">-- Select status -- </option>
                  <option value="Reading">Reading</option>
                  <option value="Completed">Completed</option>
                  <option value="Dropped">Dropped</option>
                  <option value="Paused">Paused</option>
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
                />
              </div>
            </div>
            <div className="px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6 text-gray-800 dark:text-white dark:bg-gray-700 ">
              <button
                type="submit"
                className="inline-flex w-full justify-center rounded-md border border-transparent bg-blue-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:ml-3 sm:w-auto sm:text-sm"
              >
                Confirm
              </button>
              <button
                type="button"
                className="mt-3 inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-base font-medium text-gray-800 shadow-sm hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                onClick={closeModal}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

BookEditModal.propTypes = {
  bookId: PropTypes.string,
  closeModal: PropTypes.func,
};

export default BookEditModal;
