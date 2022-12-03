import React from 'react';
import PropTypes from 'prop-types';
import { updateUserDoc, updateImageInFolder } from '../../Firebase';

const ProfilePicture = ({ profilePic }) => {
  const handleNewProfilePic = async e => {
    const url = await updateImageInFolder(e.target.files[0], 'profilePicture');
    updateUserDoc('image', url);
  };

  return (
    <div className="flex flex-col mt-6">
      <h2 htmlFor="profilePic" className="text-gray-700 dark:text-gray-200">
        Profile Picture
      </h2>
      <h3 className="text-gray-500 mb-2 text-sm">Allowed Formats: JPEG, PNG. Max size: 1mb.</h3>
      <div className="flex gap-4">
        <label
          className="flex items-center justify-center text-gray-700 dark:text-gray-400 w-32 sm:w-44 aspect-square border border-dashed border-gray-200 rounded-md dark:bg-gray-800 dark:border-gray-600 focus:outline-none p-4 hover:cursor-pointer"
          htmlFor="profilePic"
        >
          Click here to upload
          <input
            type="file"
            accept="image/png, image/jpeg"
            id="profilePic"
            name="profilePic"
            className="hidden"
            onChange={handleNewProfilePic}
          />
        </label>
        <img
          src={profilePic}
          alt="Profile Picture"
          className="w-32 sm:w-44 aspect-square rounded-md"
        />
      </div>
    </div>
  );
};

ProfilePicture.propTypes = {
  profilePic: PropTypes.string,
};

export default ProfilePicture;
