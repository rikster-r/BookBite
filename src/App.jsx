import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import SearchResults from './pages/SearchResults';

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/books/search/:query" element={<SearchResults />} />
        <Route path="/books/:id" element={<>{/*todo*/}</>} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
