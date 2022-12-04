import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { onSnapshot, collection } from 'firebase/firestore';
import { getUserDoc, isUserSignedIn, usersRef } from '../../Firebase';

import Loading from '../../components/Loading';
import Sidebar from './Sidebar';
import BookList from './BookList';
import BookEditModal from '../../components/BookEditModal';
import ProfileHeader from '../../components/ProfileHeader';

const Profile = () => {
  const username = useParams().username;
  const [userData, setUserData] = useState();

  const [books, setBooks] = useState();
  const [filter, setFilter] = useState('All');
  const [sort, setSort] = useState('Rating');

  const [isOpen, setIsOpen] = useState(false);
  const [currentBook, setCurrentBook] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    let unsub;

    (async () => {
      const userDoc = await getUserDoc(username);

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
  const changeSort = newSort => setSort(newSort);

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

  if (userData.private && !isUserSignedIn()) {
    return (
      <main className="flex-1 dark:bg-gray-700 text-gray-800 dark:text-white py-4 px-6 lg:px-32 2xl:px-72">
        <div className="flex w-full overflow-hidden bg-white rounded-lg shadow-md dark:bg-gray-800">
          <div className="flex items-center justify-center w-12 bg-blue-500">
            <svg
              className="w-6 h-6 text-white fill-current"
              viewBox="0 0 40 40"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M20 3.33331C10.8 3.33331 3.33337 10.8 3.33337 20C3.33337 29.2 10.8 36.6666 20 36.6666C29.2 36.6666 36.6667 29.2 36.6667 20C36.6667 10.8 29.2 3.33331 20 3.33331ZM21.6667 28.3333H18.3334V25H21.6667V28.3333ZM21.6667 21.6666H18.3334V11.6666H21.6667V21.6666Z" />
            </svg>
          </div>

          <div className="px-4 py-2 -mx-3">
            <div className="mx-3">
              <span className="font-semibold text-blue-500 dark:text-blue-400">Info</span>
              <p className="text-sm text-gray-600 dark:text-gray-200">
                This user has set their profile to private!
              </p>
            </div>
          </div>
        </div>
      </main>
    );
  }

  return (
    <section className="flex-1">
      <ProfileHeader user={userData} />
      <div className="dark:bg-gray-700 text-gray-800 dark:text-white grid grid-cols-10 gap-6 py-4 px-6 lg:px-32 2xl:px-72 ">
        <Sidebar filter={filter} sort={sort} changeFilter={changeFilter} changeSort={changeSort} />
        <main className="col-span-10 md:col-span-8 flex flex-col gap-6">
          {filter === 'All' ? (
            <>
              <BookList
                books={books}
                title="Reading"
                sort={sort}
                openModal={openModal}
                username={userData.name}
              />
              <BookList
                books={books}
                title="Completed"
                sort={sort}
                openModal={openModal}
                username={userData.name}
              />
              <BookList
                books={books}
                title="Paused"
                sort={sort}
                openModal={openModal}
                username={userData.name}
              />
              <BookList
                books={books}
                title="Dropped"
                sort={sort}
                openModal={openModal}
                username={userData.name}
              />
              <BookList
                books={books}
                title="Planning"
                sort={sort}
                openModal={openModal}
                username={userData.name}
              />
            </>
          ) : (
            <BookList
              books={books}
              title={filter}
              sort={sort}
              openModal={openModal}
              username={userData.name}
            />
          )}
        </main>
        {isOpen ? <BookEditModal book={currentBook} closeModal={closeModal} /> : ''}
      </div>
    </section>
  );
};

export default Profile;
