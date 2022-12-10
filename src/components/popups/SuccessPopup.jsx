import React from 'react';
import PropTypes from 'prop-types';
import Popup from './Popup';

const SuccessPopup = ({ text }) => {
  return (
    <Popup text={text}>
      <div className="inline-flex flex-shrink-0 justify-center items-center w-8 h-8 text-green-500 bg-green-100 rounded-lg dark:bg-green-800 dark:text-green-300">
        <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
          <path
            fillRule="evenodd"
            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
            clipRule="evenodd"
          ></path>
        </svg>
      </div>
    </Popup>
  );
};

SuccessPopup.propTypes = {
  text: PropTypes.string,
};

export default SuccessPopup;
