import React from 'react';
import PropTypes from 'prop-types';

const ProfileHeader = ({ user }) => {
  return (
    <div className="bg-gray-200 dark:bg-gray-900 flex items-center pt-28 dark:text-white mb-6">
      <div className="flex items-end gap-6 px-6 pt-4 lg:px-32 2xl:px-72">
        <img className="font-bold w-32 rounded-t" src={user.image}></img>
        <h2 className="text-2xl mb-6 font-bold">{user.name}</h2>
      </div>
    </div>
  );
};

ProfileHeader.propTypes = {
  user: PropTypes.object,
};

export default ProfileHeader;
