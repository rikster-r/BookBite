import React from 'react';
import PropTypes from 'prop-types';
import { motion } from 'framer-motion';

const Backdrop = ({ children, onClick }) => {
  return (
    <motion.div
      className="fixed z-10 top-0 left-0 h-full w-full bg-gray-500 bg-opacity-75 grid place-items-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClick}
    >
      {children}
    </motion.div>
  );
};

Backdrop.propTypes = {
  children: PropTypes.node,
  onClick: PropTypes.func,
};

export default Backdrop;
