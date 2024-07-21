import React from "react";
import { NavLink } from "react-router-dom";

const Adminmenu = () => {
  return (
    <div classname="text-center m-3 p-3">
      <div className="list-group m-3 p-3">
        <h4 className="text-center">Admin Panel</h4>
        <NavLink NavLink
          to="/dashboard/admin/create-category"
          className="list-group-item list-group-item-action "
          aria-current="true"
        >
          create Category
        </NavLink>
        <NavLink
          to="/dashboard/admin/create-product"
          className="list-group-item list-group-item-action"
        >
          Create Product
        </NavLink>
        <NavLink
          to="/dashboard/admin/users"
          className="list-group-item list-group-item-action"
        >
          Users
        </NavLink>
        <NavLink
          to="/dashboard/admin/orders"
          className="list-group-item list-group-item-action"
        >
          Orders
        </NavLink>
        <NavLink
          to="/dashboard/admin/products"
          className="list-group-item list-group-item-action"
        >
          Products
        </NavLink>
        {/* <navlink to="#" className="list-group-item list-group-item-action">
          A fourth link item
        </navlink> */}
      </div>
    </div>
  );
};

export default Adminmenu;
