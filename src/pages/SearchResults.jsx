import React from 'react';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Loading from '../components/Loading';
import Book from '../components/Book';
import BookEditModal from '../components/BookEditModal';

const SearchResults = () => {
  const query = useParams().query;
  const [results, setResults] = useState();
  const [isOpen, setIsOpen] = useState(false);
  const [currentBookId, setCurrentBookId] = useState(null);

  useEffect(() => {
    fetch(`https://www.googleapis.com/books/v1/volumes?q=${query}`)
      .then(response => response.json())
      .then(data => {
        setResults(data);
      })
      .catch(error => {
        alert(error); //todo
      });
  }, [query]);

  const openModal = id => {
    setCurrentBookId(id);
    setIsOpen(true);
  };

  const closeModal = () => {
    setCurrentBookId(null);
    setIsOpen(false);
  };

  if (!results) {
    //while data isn't returned
    return (
      <main className="flex-1 flex items-center justify-center dark:bg-gray-700">
        <Loading />
      </main>
    );
  }

  if (!results.totalItems) {
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
      {isOpen ? <BookEditModal bookId={currentBookId} closeModal={closeModal} /> : ''}
    </main>
  );
};

export default SearchResults;
