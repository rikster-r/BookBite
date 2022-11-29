import React from 'react';
import { Routes, Route } from 'react-router-dom';

import Header from './components/Header';
import Footer from './components/Footer';
import Profile from './pages/Profile';
import SearchResults from './pages/SearchResults';
import NotFound from './pages/NotFound';
import Statistics from './pages/Statistics';

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/profile/:username" element={<Profile />} />
        <Route path="/profile/:username/statistics" element={<Statistics />} />
        <Route path="/books/search/:query" element={<SearchResults />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
