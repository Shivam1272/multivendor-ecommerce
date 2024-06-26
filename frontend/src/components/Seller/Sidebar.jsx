import React from "react";
import { Link } from "react-router-dom";
const Sidebar = () => {
  return (
    <div className="list-group">
      <Link
        to="/seller/dashboard"
        className="list-group-item list-group-item-action"
      >
        Dashboard
      </Link>
      <Link
        to="/seller/products"
        className="list-group-item list-group-item-action"
      >
        Products
      </Link>
      <Link
        to="/seller/add-product"
        className="list-group-item list-group-item-action"
      >
        Add New Product
      </Link>
      <Link
        to="/seller/orders"
        className="list-group-item list-group-item-action"
      >
        Orders
      </Link>
      <Link
        to="/seller/customers"
        className="list-group-item list-group-item-action"
      >
        Customers
      </Link>
      <Link
        to="/seller/report"
        className="list-group-item list-group-item-action"
      >
        Report
      </Link>
      <Link
        to="/seller/profile"
        className="list-group-item list-group-item-action"
      >
        Profile
      </Link>
      <Link
        to="/seller/change-password"
        className="list-group-item list-group-item-action"
      >
        Change Password
      </Link>
      <Link
        to="/seller/logout"
        className="list-group-item list-group-item-action text-danger"
      >
        Logout
      </Link>
    </div>
  );
};

export default Sidebar;
