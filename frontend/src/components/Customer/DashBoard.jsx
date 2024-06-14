import React, { useState, useEffect } from "react";
import Sidebar from "./Sidebar";
import axios from "axios";
import { Link } from "react-router-dom";

const DashBoard = () => {
  const customerId = localStorage.getItem("customer_id");
  const baseUrl = "http://localhost:8000/api/";

  const [countList, setCountList] = useState({
    totalAddress: 0,
    totalOrder: 0,
    totalWishlist: 0,
  });

  useEffect(() => {
    (async () => {
      axios
        .get(baseUrl + "customer/dashboard/" + customerId)
        .then((res) => {
          setCountList({
            totalAddress: res.data.totalAddress,
            totalOrder: res.data.totalOrder,
            totalWishlist: res.data.totalWishlist,
          });
        })
        .catch((e) => console.log(e));
    })();
  }, [customerId]);
  console.log(countList);
  return (
    <div className="container mt-4">
      <div className="row">
        <div className="col-md-3 col-12 mb-2">
          <Sidebar />
        </div>
        <div className="col-md-9 col-12 mb-2">
          <div className="row">
            <div className="col-md-4 col-12 mb-2">
              <div className="card">
                <div className="card-body text-center">
                  <h5>Total Orders</h5>
                  <h5>
                    <Link
                      to="/customer/orders"
                      className="list-group-item list-group-item-action"
                    >
                      {countList.totalOrder}
                    </Link>
                  </h5>
                </div>
              </div>
            </div>
            <div className="col-md-4 col-12 mb-2">
              <div className="card">
                <div className="card-body text-center">
                  <h5>Total Wishlist</h5>
                  <h5>
                    <Link
                      to="/customer/wishlist"
                      className="list-group-item list-group-item-action"
                    >
                      {countList.totalWishlist}
                    </Link>
                  </h5>
                </div>
              </div>
            </div>
            <div className="col-md-4 col-12 mb-2">
              <div className="card">
                <div className="card-body text-center">
                  <h5>Total Addresses</h5>
                  <h5>
                    <Link
                      to="/customer/addresslist"
                      className="list-group-item list-group-item-action"
                    >
                      {countList.totalAddress}
                    </Link>
                  </h5>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashBoard;
