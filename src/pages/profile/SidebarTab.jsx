import React from 'react';
import PropTypes from 'prop-types';

const SidebarTab = ({ text, selected, changeTab }) => {
  return (
    <button
      className={`${
        selected === text
          ? 'bg-gray-800 text-white font-semibold'
          : 'font-medium'
      } rounded-lg py-1.5 pl-5 text-left text-sm select-auto mt-0.5`}
      onClick={() => changeTab(text)}
    >
      {text}
    </button>
  );
};

SidebarTab.propTypes = {
  text: PropTypes.string,
  selected: PropTypes.string,
  changeTab: PropTypes.func,
};

export default SidebarTab;
