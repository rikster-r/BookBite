import React from 'react';
import { useNavigate } from 'react-router-dom';
import useUserData from '../../hooks/useUserData';

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
    <main className="flex-1 md:grid bg-gray-200 justify-center grid-cols-4 dark:bg-gray-700">
      <div className="dark:bg-gray-800 col-start-2 col-span-2 p-6 rounded-lg m-3 md:my-6">
        <Name name={name} />
        <ProfilePicture profilePic={profilePic} />
        <Privacy privateStatus={privateStatus} />
      </div>
    </main>
  );
};

export default Settings;
