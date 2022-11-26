import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { onSnapshot, query, where, collection, getDocs } from 'firebase/firestore';
import { usersRef } from '../Firebase';

import Loading from '../components/Loading';
import Sidebar from '../components/Sidebar';
import BookList from '../components/BookList';
import BookEditModal from '../components/BookEditModal';

const Profile = () => {
  const username = useParams().username;
  const [userData, setUserData] = useState();
  const [books, setBooks] = useState();
  const [filter, setFilter] = useState('All');
  const [isOpen, setIsOpen] = useState(false);
  const [currentBook, setCurrentBook] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const q = query(usersRef, where('name', '==', username));
    let unsub;

    (async () => {
      const querySnapshot = await getDocs(q);

      const userDoc = querySnapshot.docs[0];
      if (userDoc) {
        setUserData(userDoc.data());
        const booksRef = collection(usersRef, `${userDoc.id}/books`);

        unsub = onSnapshot(booksRef, querySnapshot => {
          const documents = querySnapshot.docs.map(doc => {
            return {
              ...doc.data(),
              id: doc.id,
            };
          });
          setBooks(documents);
        });
      } else {
        navigate('/404');
      }
    })();

    return () => {
      if (unsub) unsub();
    };
  }, [username]);

  const changeFilter = newFilter => setFilter(newFilter);

  // unused if profile doesn't belong to current user
  const openModal = item => {
    setCurrentBook(item);
    setIsOpen(true);
  };

  const closeModal = () => {
    setCurrentBook(null);
    setIsOpen(false);
  };

  if (books === undefined) {
    return (
      <main className="flex-1 flex items-center justify-center dark:bg-gray-700">
        <Loading />
      </main>
    );
  }

  if (books.length === 0) {
    return (
      <main className="flex-1 dark:bg-gray-700 text-gray-800 dark:text-white py-4 px-6 lg:px-32 2xl:px-72">
        <p>No books in your library found. Use search to find them!</p>
      </main>
    );
  }

  if (filter !== 'All') {
    return (
      <main className="flex-1 dark:bg-gray-700 text-gray-800 dark:text-white grid grid-cols-10 gap-6 py-4 px-6 lg:px-32 2xl:px-72">
        <Sidebar filter={filter} sort="Score" changeFilter={changeFilter} />
        <div className="col-span-10 md:col-span-8 flex flex-col gap-6">
          <BookList books={books} title={filter} openModal={openModal} username={userData.name} />
        </div>
        {isOpen ? <BookEditModal book={currentBook} closeModal={closeModal} /> : ''}
      </main>
    );
  }

  return (
    <main className="flex-1 dark:bg-gray-700 text-gray-800 dark:text-white grid grid-cols-10 gap-6 py-4 px-6 lg:px-32 2xl:px-72">
      <Sidebar filter={filter} sort="Score" changeFilter={changeFilter} />
      <div className="col-span-10 md:col-span-8 flex flex-col gap-6">
        <BookList books={books} title="Reading" openModal={openModal} username={userData.name} />
        <BookList books={books} title="Completed" openModal={openModal} username={userData.name} />
        <BookList books={books} title="Paused" openModal={openModal} username={userData.name} />
        <BookList books={books} title="Dropped" openModal={openModal} username={userData.name} />
        <BookList books={books} title="Planning" openModal={openModal} username={userData.name} />
      </div>
      {isOpen ? <BookEditModal book={currentBook} closeModal={closeModal} /> : ''}
    </main>
  );
};

export default Profile;
