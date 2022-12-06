import React from 'react';
import { useNavigate } from 'react-router-dom';
import useUserData from '../../hooks/useUserData';
import { Link } from 'react-router-dom';
import { signOutUser, deleteAllBooks } from '../../Firebase';

import Loading from '../../components/Loading';
import Name from './Name';
import ProfilePicture from './ProfilePicture';
import Privacy from './Privacy';

const Settings = () => {
  //todo success alerts
  const navigate = useNavigate();
  const [name, profilePic, privateStatus] = useUserData();

  if (name === undefined) navigate('/');

  if (!name) {
    return (
      <main className="flex-1 flex items-center justify-center dark:bg-gray-700">
        <Loading />
      </main>
    );
  }

  return (
    <main className="flex-1 md:grid bg-gray-200 content-start grid-cols-4 dark:bg-gray-700">
      <div className="dark:bg-gray-800 col-start-2 col-span-2 p-6 rounded-lg m-3 md:my-6">
        <Name name={name} />
        <ProfilePicture profilePic={profilePic} />
        <Privacy privateStatus={privateStatus} />

        <hr className="my-8 h-px bg-gray-200 border-0 dark:bg-gray-700"></hr>
        <div className="mt-3">
          <h2 className="text-gray-700 dark:text-gray-200">Delete all library entries</h2>
          <h3 className="text-gray-500 mb-2 text-sm">
            Warning! This will permanently delete all books in your library
          </h3>
          <button
            className="mt-2 px-6 py-2 font-medium tracking-wide text-white transition-colors duration-300 transform bg-red-600 rounded-lg hover:bg-red-500 focus:outline-none focus:ring focus:ring-red-300 focus:ring-opacity-80 flex items-center gap-2"
            onClick={deleteAllBooks}
          >
            <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
              <path d="M9,3V4H4V6H5V19A2,2 0 0,0 7,21H17A2,2 0 0,0 19,19V6H20V4H15V3H9M7,6H17V19H7V6M9,8V17H11V8H9M13,8V17H15V8H13Z" />
            </svg>
            <span>Delete all library entries</span>
          </button>
        </div>

        <hr className="my-8 h-px bg-gray-200 border-0 dark:bg-gray-700"></hr>
        <div className="mt-3">
          <h2 className="text-gray-700 dark:text-gray-200">Sign Out</h2>
          <h3 className="text-gray-500 mb-2 text-sm">Warning! This will sign you out</h3>
          <Link to="/" onClick={signOutUser}>
            <button className="mt-2 px-6 py-2 font-medium tracking-wide text-white transition-colors duration-300 transform bg-red-600 rounded-lg hover:bg-red-500 focus:outline-none focus:ring focus:ring-red-300 focus:ring-opacity-80 flex items-center gap-2">
              <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                <path d="M14.08,15.59L16.67,13H7V11H16.67L14.08,8.41L15.5,7L20.5,12L15.5,17L14.08,15.59M19,3A2,2 0 0,1 21,5V9.67L19,7.67V5H5V19H19V16.33L21,14.33V19A2,2 0 0,1 19,21H5C3.89,21 3,20.1 3,19V5C3,3.89 3.89,3 5,3H19Z" />
              </svg>
              <span>Sign Out</span>
            </button>
          </Link>
        </div>
      </div>
    </main>
  );
};

export default Settings;
