import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useUserData from '../../hooks/useUserData';
import { updateUserDoc } from '../../Firebase';
import Loading from '../../components/Loading';

const Settings = () => {
  //todo success alerts
  const navigate = useNavigate();
  const [name, profilePic] = useUserData();
  const [inputName, setInputName] = useState();

  useEffect(() => {
    setInputName(name);
  }, [name]);

  if (name === undefined) navigate('/');

  if (!name) {
    return (
      <main className="flex-1 flex items-center justify-center dark:bg-gray-700">
        <Loading />
      </main>
    );
  }

  return (
    <main className="flex-1 md:grid bg-gray-200 justify-center grid-cols-4 dark:bg-gray-700">
      <div className="dark:bg-gray-800 col-start-2 col-span-2 p-6 rounded-lg m-3 md:my-6">
        <div className="flex flex-col">
          <label className="text-gray-700 dark:text-gray-200" htmlFor="username">
            Username
          </label>
          <input
            value={inputName}
            onChange={e => setInputName(e.target.value)}
            name="username"
            id="username"
            type="text"
            autoComplete="off"
            className="px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:outline-none mb-2"
          />
          <button
            className={`${
              inputName === name ? 'hidden' : ''
            } flex-none w-max px-6 py-2 mb-3 font-medium tracking-wide text-white capitalize transition-all duration-200 ease-in transform bg-blue-600 rounded-lg hover:bg-blue-500 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-80`}
            onClick={() => {
              updateUserDoc('name', inputName);
            }}
          >
            Save
          </button>
        </div>
      </div>
    </main>
  );
};

export default Settings;
