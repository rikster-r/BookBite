import React from 'react';
import { Routes, Route } from 'react-router-dom';

import Header from './components/header/Header';
import Footer from './components/footer/Footer';
import Profile from './pages/profile/Profile';
import SearchResults from './pages/searchResults/SearchResults';
import NotFound from './pages/NotFound';
import Statistics from './pages/statistics/Statistics';

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
