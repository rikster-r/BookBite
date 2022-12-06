import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getDocs, collection } from 'firebase/firestore';
import { getUserDoc, usersRef, isUserSignedIn } from '../../Firebase';

import ProfileHeader from '../../components/ProfileHeader';
import Loading from '../../components/Loading';
import ChartsSection from './ChartsSection';
import Info from '../../components/Info';

const Statistics = () => {
  const navigate = useNavigate();
  const username = useParams().username;
  const [userData, setUserData] = useState();

  const [ratings, setRatings] = useState([]);
  const [statuses, setStatuses] = useState([]);

  useEffect(() => {
    (async () => {
      const userDoc = await getUserDoc(username);

      if (userDoc) {
        setUserData(userDoc.data());

        const booksRef = collection(usersRef, `${userDoc.id}/books`);
        const querySnapshot = await getDocs(booksRef);

        const documents = querySnapshot.docs.map(doc => {
          return {
            ...doc.data(),
          };
        });

        setRatings(documents.map(book => Number(book.rating)).filter(rating => rating !== 0));
        setStatuses(documents.map(book => book.status));
      } else {
        navigate('/404');
      }
    })();
  }, [username]);

  //make data for stat cards
  const getMeanRating = () => {
    const booksSum = ratings.reduce((sum, rating) => sum + Number(rating), 0);
    return (booksSum / ratings.length).toFixed(2);
  };

  const getStandardDeviation = () => {
    const mean = getMeanRating();
    return Math.sqrt(
      ratings.map(rating => (rating - mean) ** 2).reduce((a, b) => a + b, 0) / ratings.length
    ).toFixed(2);
  };

  const getPlanningLength = () => {
    return statuses.filter(status => status === 'Planning').length;
  };

  if (ratings === undefined || statuses === undefined || userData === undefined) {
    return (
      <main className="flex-1 flex items-center justify-center dark:bg-gray-700">
        <Loading />
      </main>
    );
  }
  
  if (userData.private && !isUserSignedIn()) {
    return <Info text="This user has set their profile to private" />;
  }

  if (ratings.length === 0 || statuses.length === 0) {
    return (
      <section className="flex-1 dark:bg-gray-700">
        <ProfileHeader user={userData} />
        <Info text="Not enough data to show statistics" />
      </section>
    );
  }

  return (
    <section className="flex-1 dark:bg-gray-700">
      <ProfileHeader user={userData} />
      <main className="py-4 px-6 lg:px-32 2xl:px-72">
        <section className="grid grid-cols-1 gap-6 mx-auto sm:grid-cols-2 xl:grid-cols-4 mb-10 whitespace-nowrap">
          <div className="flex p-4 space-x-4 rounded-lg md:space-x-6 dark:text-white">
            <div className="flex items-center p-2 sm:p-4">
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-9 h-9">
                <path d="M6 22h15v-2H6.012C5.55 19.988 5 19.805 5 19s.55-.988 1.012-1H21V4c0-1.103-.897-2-2-2H6c-1.206 0-3 .799-3 3v14c0 2.201 1.794 3 3 3zM5 8V5c0-.805.55-.988 1-1h13v12H5V8z"></path>
                <path d="M8 6h9v2H8z"></path>
              </svg>
            </div>
            <div className="flex flex-col justify-center">
              <p className="text-3xl font-semibold leading-none">{statuses.length}</p>
              <p className="capitalize">Total Books</p>
            </div>
          </div>
          <div className="flex p-4 space-x-4 rounded-lg md:space-x-6 dark:text-white">
            <div className="flex justify-center items-center p-2 sm:p-4">
              <svg className="w-9 h-9" viewBox="0 0 24 24">
                <path
                  fill="currentColor"
                  d="M18.5 3.5L20.5 5.5L5.5 20.5L3.5 18.5L18.5 3.5M7 4C8.66 4 10 5.34 10 7C10 8.66 8.66 10 7 10C5.34 10 4 8.66 4 7C4 5.34 5.34 4 7 4M17 14C18.66 14 20 15.34 20 17C20 18.66 18.66 20 17 20C15.34 20 14 18.66 14 17C14 15.34 15.34 14 17 14M7 6C6.45 6 6 6.45 6 7C6 7.55 6.45 8 7 8C7.55 8 8 7.55 8 7C8 6.45 7.55 6 7 6M17 16C16.45 16 16 16.45 16 17C16 17.55 16.45 18 17 18C17.55 18 18 17.55 18 17C18 16.45 17.55 16 17 16Z"
                />
              </svg>
            </div>
            <div className="flex flex-col justify-center">
              <p className="text-3xl font-semibold leading-none">{getMeanRating()}</p>
              <p className="capitalize">Mean Rating</p>
            </div>
          </div>
          <div className="flex p-4 space-x-4 rounded-lg md:space-x-6 dark:text-white">
            <div className="flex justify-center items-center p-2 sm:p-4">
              <svg className="w-9 h-9" viewBox="0 0 24 24">
                <path
                  fill="currentColor"
                  d="M19,13H5V11H19V13M12,5A2,2 0 0,1 14,7A2,2 0 0,1 12,9A2,2 0 0,1 10,7A2,2 0 0,1 12,5M12,15A2,2 0 0,1 14,17A2,2 0 0,1 12,19A2,2 0 0,1 10,17A2,2 0 0,1 12,15Z"
                />
              </svg>
            </div>
            <div className="flex flex-col justify-center">
              <p className="text-3xl font-semibold leading-none">{getStandardDeviation()}</p>
              <p className="capitalize">Standard Deviation</p>
            </div>
          </div>
          <div className="flex p-4 space-x-4 rounded-lg md:space-x-6 dark:text-white">
            <div className="flex justify-center items-center p-2 sm:p-4">
              <svg className="w-9 h-9" viewBox="0 0 24 24">
                <path
                  fill="currentColor"
                  d="M12,20A8,8 0 0,0 20,12A8,8 0 0,0 12,4A8,8 0 0,0 4,12A8,8 0 0,0 12,20M12,2A10,10 0 0,1 22,12A10,10 0 0,1 12,22C6.47,22 2,17.5 2,12A10,10 0 0,1 12,2M12.5,7V12.25L17,14.92L16.25,16.15L11,13V7H12.5Z"
                />
              </svg>
            </div>
            <div className="flex flex-col justify-center">
              <p className="text-3xl font-semibold leading-none">{getPlanningLength()}</p>
              <p className="capitalize">Books Planned</p>
            </div>
          </div>
        </section>
        <ChartsSection name="Ratings" data={ratings} categories={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]} />
        <ChartsSection
          name="Statuses"
          data={statuses}
          categories={['Reading', 'Completed', 'Paused', 'Dropped', 'Planning']}
        />
      </main>
    </section>
  );
};

export default Statistics;
