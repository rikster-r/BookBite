import React, { useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { onAuthStateChanged } from 'firebase/auth';
import { onSnapshot, collection } from 'firebase/firestore';
import { usersRef, auth, booksRef } from './Firebase';

import Header from './components/Header';
import Footer from './components/Footer';
import Profile from './pages/Profile';
import SearchResults from './pages/SearchResults';
import NotFound from './pages/NotFound';

function App() {
  const [books, setBooks] = useState();
  let unsub;

  useEffect(() => {
    onAuthStateChanged(auth, user => {
      //if user logs out stop listening
      if (!user && unsub !== undefined) {
        unsub();
      }

      //if user logs out reset books
      if (!user) {
        setBooks(undefined);
        return;
      }

      //booksRef isn't initialized when the site opens
      const ref = booksRef || collection(usersRef, user.uid, 'books');

      unsub = onSnapshot(ref, querySnapshot => {
        const documents = querySnapshot.docs.map(doc => {
          return {
            ...doc.data(),
            id: doc.id,
          };
        });

        setBooks(documents);
      });
    });
  }, []);

  return (
    <>
      <Header />
      <Routes>
        <Route path="/profile" element={<Profile books={books}></Profile>} />
        <Route path="/books/search/:query" element={<SearchResults />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
