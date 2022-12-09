import React, { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';

import Header from './components/header/Header';
import Footer from './components/footer/Footer';
import Loading from './components/Loading';
import MobileMenu from './components/MobileMenu';

const Profile = lazy(() => import('./pages/profile/Profile'));
const SearchResults = lazy(() => import('./pages/searchResults/SearchResults'));
const NotFound = lazy(() => import('./pages/NotFound'));
const Statistics = lazy(() => import('./pages/statistics/Statistics'));
const Settings = lazy(() => import('./pages/settings/Settings'));
const Home = lazy(() => import('./pages/home/Home'));

function App() {
  return (
    <>
      <Header />
      <Suspense fallback={<Loading />}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/profile/:username" element={<Profile />} />
          <Route path="/profile/:username/statistics" element={<Statistics />} />
          <Route path="/books/search/:query" element={<SearchResults />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
      <MobileMenu />
      <Footer />
    </>
  );
}

export default App;
