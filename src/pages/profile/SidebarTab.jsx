import React from 'react';
import PropTypes from 'prop-types';

const SidebarTab = ({ text, selected, changeTab }) => {
  return (
    <button
      className={`${
        selected === text ? 'bg-gray-800 text-white' : ''
      } rounded-lg py-1 pl-5 text-left`}
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
