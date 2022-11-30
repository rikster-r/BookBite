import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Link, useLocation } from 'react-router-dom';

const ProfileHeader = ({ user }) => {
  const [onStats, setOnStats] = useState();
  const location = useLocation();

  useEffect(() => {
    setOnStats(location.pathname.includes('statistics'));
  }, [location]);

  return (
    <>
      <div className="bg-gray-200 dark:bg-gray-900 flex items-end pt-28 dark:text-white sm:mb-4">
        <div className="flex items-end gap-6 px-6 pt-4 lg:px-32 2xl:px-72 mr-auto">
          <img className="font-bold w-32 rounded-t" src={user.image}></img>
          <h2 className="text-2xl mb-6 font-bold">{user.name}</h2>
        </div>
        {/* bookmark style for usual */}
        <div className="hidden sm:inline-block">
          <ul className="flex justify-center dark:text-white gap-4 px-6 lg:px-32 2xl:px-72 whitespace-nowrap text-center">
            <li
              className={`${
                onStats ? '' : 'bg-white dark:bg-gray-700 font-semibold'
              } flex items-center h-12 px-4 py-2 text-gray-700 border border-b-0 border-white dark:border-gray-500 rounded-t-md dark:text-white focus:outline-none`}
            >
              <Link to={`/profile/${user.name}`}>Book List</Link>
            </li>
            <li
              className={`${
                onStats ? 'bg-white dark:bg-gray-700 font-semibold' : ''
              } flex items-center h-12 px-4 py-2 text-gray-700 border border-b-0 border-white dark:border-gray-500 rounded-t-md dark:text-white focus:outline-none`}
            >
              <Link to={`/profile/${user.name}/statistics`}>Statistics</Link>
            </li>
          </ul>
        </div>
      </div>
      {/* navbar style for mobile */}
      <div className="sm:hidden">
        <ul className="flex justify-center dark:text-white gap-4 py-4 px-6 lg:px-32 2xl:px-72 whitespace-nowrap text-center dark:bg-gray-800 m-0 border-b border-gray-200 dark:border-0">
          <li
            className={`${
              onStats ? 'text-gray-400' : 'font-bold'
            } flex items-center justify-center px-4 focus:outline-none`}
          >
            <Link to={`/profile/${user.name}`}>Book List</Link>
          </li>
          <li
            className={`${
              onStats ? 'font-bold' : 'text-gray-400'
            } flex items-center px-4 focus:outline-none`}
          >
            <Link to={`/profile/${user.name}/statistics`}>Statistics</Link>
          </li>
        </ul>
      </div>
    </>
  );
};

ProfileHeader.propTypes = {
  user: PropTypes.object,
};

export default ProfileHeader;
