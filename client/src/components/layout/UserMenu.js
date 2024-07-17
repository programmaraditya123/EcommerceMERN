import React from 'react';
import { NavLink } from "react-router-dom";

const UserMenu = () => {
  return (
    <div classname="text-center m-3 p-3">
      <div className="list-group m-3 p-3">
        <h4 className="text-center">Dashboard</h4>
        <NavLink NavLink
          to="/dashboard/user/profile"
          className="list-group-item list-group-item-action "
          aria-current="true"
        >
          Profile
        </NavLink>
        <NavLink
          to="/dashboard/user/order"
          className="list-group-item list-group-item-action"
        >
          Orders
        </NavLink>
        {/* <NavLink
          to="/dashboard/admin/users"
          className="list-group-item list-group-item-action"
        >
          Users
        </NavLink> */}
        {/* <navlink to="#" className="list-group-item list-group-item-action">
          A fourth link item
        </navlink> */}
      </div>
    </div>
  )
}

export default UserMenu;
