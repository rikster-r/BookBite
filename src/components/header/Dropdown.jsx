import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const Dropdown = ({ name }) => {
  return (
    <div
      className={`hidden xl:group-hover:block absolute origin-top-right top-9 py-2 z-10 min-w-full rounded-md bg-white dark:bg-gray-800 shadow-lg ring-3 ring-white focus:outline-none`}
    >
      <div className="py-1">
        <Link
          to={`/profile/${name}`}
          className="flex items-center gap-1 w-full px-4 p-2 text-left text-sm dark:text-white hover:text-gray-500 dark:hover:text-gray-300 "
        >
          <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
            <path d="M12,4A4,4 0 0,1 16,8A4,4 0 0,1 12,12A4,4 0 0,1 8,8A4,4 0 0,1 12,4M12,14C16.42,14 20,15.79 20,18V20H4V18C4,15.79 7.58,14 12,14Z" />
          </svg>
          <span>Profile</span>
        </Link>
        <Link
          to={`/profile/${name}/statistics`}
          className="flex items-center gap-1 w-full px-4 py-2 text-left text-sm dark:text-white  hover:text-gray-500 dark:hover:text-gray-300"
        >
          <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
            <path d="M22,21H2V3H4V19H6V10H10V19H12V6H16V19H18V14H22V21Z" />
          </svg>
          <span>Statistics</span>
        </Link>
        <Link
          to="/settings"
          className="flex items-center gap-1 w-full px-4 py-2 text-left text-sm dark:text-white  hover:text-gray-500 dark:hover:text-gray-300"
        >
          <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
            <path
              fill="currentColor"
              d="M12,8A4,4 0 0,1 16,12A4,4 0 0,1 12,16A4,4 0 0,1 8,12A4,4 0 0,1 12,8M12,10A2,2 0 0,0 10,12A2,2 0 0,0 12,14A2,2 0 0,0 14,12A2,2 0 0,0 12,10M10,22C9.75,22 9.54,21.82 9.5,21.58L9.13,18.93C8.5,18.68 7.96,18.34 7.44,17.94L4.95,18.95C4.73,19.03 4.46,18.95 4.34,18.73L2.34,15.27C2.21,15.05 2.27,14.78 2.46,14.63L4.57,12.97L4.5,12L4.57,11L2.46,9.37C2.27,9.22 2.21,8.95 2.34,8.73L4.34,5.27C4.46,5.05 4.73,4.96 4.95,5.05L7.44,6.05C7.96,5.66 8.5,5.32 9.13,5.07L9.5,2.42C9.54,2.18 9.75,2 10,2H14C14.25,2 14.46,2.18 14.5,2.42L14.87,5.07C15.5,5.32 16.04,5.66 16.56,6.05L19.05,5.05C19.27,4.96 19.54,5.05 19.66,5.27L21.66,8.73C21.79,8.95 21.73,9.22 21.54,9.37L19.43,11L19.5,12L19.43,13L21.54,14.63C21.73,14.78 21.79,15.05 21.66,15.27L19.66,18.73C19.54,18.95 19.27,19.04 19.05,18.95L16.56,17.95C16.04,18.34 15.5,18.68 14.87,18.93L14.5,21.58C14.46,21.82 14.25,22 14,22H10M11.25,4L10.88,6.61C9.68,6.86 8.62,7.5 7.85,8.39L5.44,7.35L4.69,8.65L6.8,10.2C6.4,11.37 6.4,12.64 6.8,13.8L4.68,15.36L5.43,16.66L7.86,15.62C8.63,16.5 9.68,17.14 10.87,17.38L11.24,20H12.76L13.13,17.39C14.32,17.14 15.37,16.5 16.14,15.62L18.57,16.66L19.32,15.36L17.2,13.81C17.6,12.64 17.6,11.37 17.2,10.2L19.31,8.65L18.56,7.35L16.15,8.39C15.38,7.5 14.32,6.86 13.12,6.62L12.75,4H11.25Z"
            />
          </svg>
          <span>Settings</span>
        </Link>
      </div>
    </div>
  );
};

Dropdown.propTypes = {
  name: PropTypes.string,
};

export default Dropdown;
