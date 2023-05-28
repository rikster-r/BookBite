import React from "react";
import PropTypes from "prop-types";
import { motion } from "framer-motion";

const Feature = ({ title, description, children }) => {
  return (
    <motion.div
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className="block rounded-xl border border-blue-500 p-8 shadow-xl dark:bg-gray-800 bg-white"
    >
      {children}

      <h2 className="mt-4 text-xl font-bold text-gray-900 dark:text-white">
        {title}
      </h2>

      <p className="mt-1 text-sm text-gray-700 dark:text-gray-300">
        {description}
      </p>
    </motion.div>
  );
};

Feature.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  children: PropTypes.node,
};

export default Feature;
