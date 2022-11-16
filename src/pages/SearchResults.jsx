import React from 'react';
import { useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Loading from '../components/Loading';

const SearchResults = () => {
  const [results, setResults] = useState();
  const location = useLocation();

  useEffect(() => {
    fetch(`https://www.googleapis.com/books/v1/volumes?q=${location.state.query}`)
      .then(response => response.json())
      .then(data => {
        console.log(data);
        setResults(data);
      })
      .catch(error => {
        alert(error); //todo
      });
  }, [location.key]);

  return results ? (
    <main className="flex-1 dark:bg-gray-700 text-gray-800 dark:text-white flex flex-col gap-6 py-4 px-6 lg:pl-6 lg:pr-48">
      <p className="text-">Total Results: {results.totalItems}. Showing first 10 results</p>
      <ul className="flex flex-col items-center gap-6 m-0">
        {results.items.map(item => {
          if (!item.volumeInfo.imageLinks) {
            return '';
          }

          return (
            <li key={item.id} className="h-32 sm:h-48 w-full text-ellipsis overflow-hidden ...">
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
        })}
      </ul>
    </main>
  ) : (
    <main className="flex-1 flex items-center justify-center dark:bg-gray-700">
      <Loading />
    </main>
  );
};

export default SearchResults;
