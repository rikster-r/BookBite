import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { updateUserDoc } from '../../Firebase';

const Name = ({ name }) => {
  const [inputName, setInputName] = useState(name);

  return (
    <div className="flex flex-col">
      <label className="text-gray-700 dark:text-gray-200 mb-2" htmlFor="username">
        Username
      </label>
      <input
        value={inputName}
        onChange={e => setInputName(e.target.value)}
        name="username"
        id="username"
        type="text"
        autoComplete="off"
        className="px-4 py-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:outline-none mb-2"
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
  );
};

Name.propTypes = {
  name: PropTypes.string,
};

export default Name;
