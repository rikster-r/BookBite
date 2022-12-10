import React from 'react';
import PropTypes from 'prop-types';
import { motion } from 'framer-motion';

const Popup = ({ text, children }) => {
  return (
    <motion.div
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      exit={{ scale: 0 }}
      className="fixed z-10 right-5 bottom-5 flex items-center p-4 mb-4 w-full max-w-xs text-gray-500 bg-white rounded-lg shadow dark:text-gray-400 dark:bg-gray-800"
      role="alert"
    >
      {children}
      <div className="ml-3 text-sm font-normal dark:text-white">{text}</div>
    </motion.div>
  );
};

Popup.propTypes = {
  text: PropTypes.string,
  children: PropTypes.node,
};

export default Popup;
