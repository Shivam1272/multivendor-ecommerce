import React from "react";
import logo from "../../logo.svg";
import Sidebar from "./Sidebar";
import { Link } from "react-router-dom";

const SellerOrders = () => {
  return (
    <div className="container mt-4">
      <div className="row">
        <div className="col-md-3 col-12 mb-2">
          <Sidebar />
        </div>
        <div className="col-md-9 col-12 mb-2">
          <div className="row">
            <div className="table-responsive">
              <table className="table text-center table-bordered">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Product</th>
                    <th>Price</th>
                    <th>Status</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>1</td>
                    <td>
                      <Link to="/">
                        <img
                          src={logo}
                          className="img-thumbnail"
                          width="80"
                          alt="logo"
                        />
                        <p>Django</p>
                      </Link>
                    </td>
                    <td>Rs. 599</td>
                    <td>
                      <span className="text-danger">
                        <i className="fa fa-circle-xmark me-2"></i>Cancelled
                      </span>
                    </td>
                    <td>
                      <div className="btn-group" role="group">
                        <button
                          className="btn btn-info fs-6 dropdown-toggle"
                          data-bs-toggle="dropdown"
                          aria-expanded="false"
                        >
                          Change Status
                        </button>
                        <ul className="dropdown-menu">
                          <li className="dropdown-item">Approved</li>
                          <li className="dropdown-item">Complete</li>
                          <li className="dropdown-item">Sent</li>
                        </ul>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SellerOrders;
