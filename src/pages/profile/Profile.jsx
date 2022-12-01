import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { onSnapshot, collection } from 'firebase/firestore';
import { getUserDoc, usersRef } from '../../Firebase';

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