import { useEffect, useState } from 'react';

export default function useQueryResults(query) {
  const [results, setResults] = useState();

  useEffect(() => {
    fetch(`https://www.googleapis.com/books/v1/volumes?q=${query}`)
      .then(response => response.json())
      .then(data => {
        setResults(data);
      })
      .catch(() => {
        setResults({});
      });
  }, [query]);

  return results;
}
