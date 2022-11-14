import React from 'react';
import { useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';

const SearchResults = () => {
  const [results, setResults] = useState({});
  const location = useLocation();

  useEffect(() => {
    fetch(`https://www.googleapis.com/books/v1/volumes?q=intitle:${location.state.query}`)
      .then(response => response.json())
      .then(data => setResults(data))
      .catch(error => {
        alert(error); //todo
      });
  }, []);

  return <div>{/*todo*/}</div>;
};

export default SearchResults;
