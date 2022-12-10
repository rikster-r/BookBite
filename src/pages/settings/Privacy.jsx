import React from 'react';
import PropTypes from 'prop-types';
import { updateUserDoc } from '../../Firebase';

const Privacy = ({ privateStatus, showPopup }) => {
  const handlePrivacyChange = status => {
    updateUserDoc('private', status);
    showPopup('Privacy settings changed successfully');
  };

  return (
    <div className="flex flex-col mt-6">
      <h2 className="text-gray-700 dark:text-gray-200 mb-2">Privacy</h2>

      <fieldset id="privacy">
        <div className="flex gap-2 mb-2 items-center">
          <input
            name="privacy"
            id="private-false"
            type="radio"
            defaultChecked={!privateStatus}
            onClick={() => handlePrivacyChange(false)}
            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600"
          />
          <label htmlFor="private-true" className="text-gray-700 dark:text-gray-200">
            <h2>Public</h2>
            <p className="font-normal text-gray-500 text-sm">Everyone can view my profile</p>
          </label>
        </div>
        <div className="flex gap-2 items-center">
          <input
            name="privacy"
            id="private-true"
            type="radio"
            defaultChecked={privateStatus}
            onClick={() => handlePrivacyChange(true)}
            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600"
          />
          <label htmlFor="private-false" className="text-gray-700 dark:text-gray-200">
            <h2>Private</h2>
            <p className="text-gray-500 text-sm">Nobody except me can view my profile</p>
          </label>
        </div>
      </fieldset>
    </div>
  );
};

Privacy.propTypes = {
  privateStatus: PropTypes.bool,
  showPopup: PropTypes.func,
};

export default Privacy;
