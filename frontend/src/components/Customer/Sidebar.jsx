import React from "react";
import { Link } from "react-router-dom";
const Sidebar = () => {
  return (
    <div className="list-group">
      <Link
        to="/customer/dashboard"
        className="list-group-item list-group-item-action"
      >
        Dashboard
      </Link>
      <Link
        to="/customer/orders"
        className="list-group-item list-group-item-action"
      >
        Orders
      </Link>
      <Link
        to="/customer/wishlist"
        className="list-group-item list-group-item-action"
      >
        Wishlist
      </Link>
      <Link
        to="/customer/profile"
        className="list-group-item list-group-item-action"
      >
        Profile
      </Link>
      <Link
        to="/customer/change-password"
        className="list-group-item list-group-item-action"
      >
        Change Password
      </Link>
      <Link
        to="/customer/addresslist"
        className="list-group-item list-group-item-action"
      >
        Address List
      </Link>
      <Link
        to="/customer/orders"
        className="list-group-item list-group-item-action text-danger"
      >
        Logout
      </Link>
    </div>
  );
};

export default Sidebar;
