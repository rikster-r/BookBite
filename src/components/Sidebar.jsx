import React from 'react';
import PropTypes from 'prop-types';
import SidebarTab from './SidebarTab';

const Sidebar = ({ filter, sort, changeFilter }) => {
  return (
    <aside className="col-span-2 hidden md:flex flex-col justify-start divide-y-2">
      <div className="flex flex-col gap-1 pb-5">
        <h5 className="pl-2 text-sm">Lists:</h5>
        <SidebarTab text="All" selected={filter} changeTab={changeFilter} />
        <SidebarTab text="Reading" selected={filter} changeTab={changeFilter} />
        <SidebarTab text="Completed" selected={filter} changeTab={changeFilter} />
        <SidebarTab text="Paused" selected={filter} changeTab={changeFilter} />
        <SidebarTab text="Dropped" selected={filter} changeTab={changeFilter} />
        <SidebarTab text="Planning" selected={filter} changeTab={changeFilter} />
      </div>
      <div className="flex flex-col gap-2 pt-5">
        <h5 className="pl-2 text-sm">Sort By:</h5>
        <SidebarTab text="Score" selected={sort} />
        <SidebarTab text="Title" selected={sort} />
      </div>
    </aside>
  );
};

Sidebar.propTypes = {
  filter: PropTypes.string,
  sort: PropTypes.string,
  changeFilter: PropTypes.func,
};

export default Sidebar;
