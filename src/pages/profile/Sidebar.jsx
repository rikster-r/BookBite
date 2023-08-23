import React from 'react';
import PropTypes from 'prop-types';
import SidebarTab from './SidebarTab';

const Sidebar = ({ filter, sort, changeFilter, changeSort }) => {
  return (
    <aside className="col-span-2 hidden md:flex flex-col justify-start divide-y-2">
      <div className="flex flex-col pb-5">
        <h5 className="pl-2 text-sm font-medium mb-1.5">Lists:</h5>
        <SidebarTab text="All" selected={filter} changeTab={changeFilter} />
        <SidebarTab text="Reading" selected={filter} changeTab={changeFilter} />
        <SidebarTab
          text="Completed"
          selected={filter}
          changeTab={changeFilter}
        />
        <SidebarTab text="Paused" selected={filter} changeTab={changeFilter} />
        <SidebarTab text="Dropped" selected={filter} changeTab={changeFilter} />
        <SidebarTab
          text="Planning"
          selected={filter}
          changeTab={changeFilter}
        />
      </div>
      <div className="flex flex-col pt-5">
        <h5 className="pl-2 text-sm font-medium mb-1.5">Sort By:</h5>
        <SidebarTab text="Rating" selected={sort} changeTab={changeSort} />
        <SidebarTab text="Title" selected={sort} changeTab={changeSort} />
      </div>
    </aside>
  );
};

Sidebar.propTypes = {
  filter: PropTypes.string,
  sort: PropTypes.string,
  changeFilter: PropTypes.func,
  changeSort: PropTypes.func,
};

export default Sidebar;
