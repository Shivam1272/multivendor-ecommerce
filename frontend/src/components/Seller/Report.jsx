import React from "react";
import Sidebar from "./Sidebar";
import { Link } from "react-router-dom";
const Report = () => {
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
                  <h5>Daily Report</h5>
                  <h5>
                    <Link to="/" className="btn btn-info btn-sm mt-1">
                      View
                    </Link>
                  </h5>
                </div>
              </div>
            </div>
            <div className="col-md-4 col-12 mb-2">
              <div className="card">
                <div className="card-body text-center">
                  <h5>Monthly Report</h5>
                  <h5>
                    <Link to="/" className="btn btn-info btn-sm mt-1">
                      View
                    </Link>
                  </h5>
                </div>
              </div>
            </div>
            <div className="col-md-4 col-12 mb-2">
              <div className="card">
                <div className="card-body text-center">
                  <h5>Yearly Report</h5>
                  <h5>
                    <Link to="/" className="btn btn-info dt btn-sm mt-1">
                      View
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

export default Report;
