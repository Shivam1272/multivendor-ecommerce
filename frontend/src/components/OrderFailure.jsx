import React from "react";
import { Link } from "react-router-dom";

const OrderFailure = () => {
  return (
    <div className="container mt-4">
      <div className="row">
        <div className="col-md-8 col-12 offset-2">
          <div className="card">
            <div className="card-body text-center">
              <p>
                <i className="fa fa-times-circle fa-3x text-danger"></i>
              </p>
              <h5 className="text-uppercase font-weight-bold mb-4">
                oops.... something went wrong
              </h5>
              <p>
                <Link to="/" className="btn btn-primary">
                  Home
                </Link>
                <Link
                  to="/customer/dashboard"
                  className="btn btn-secondary ms-1"
                >
                  Dashboard
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderFailure;
