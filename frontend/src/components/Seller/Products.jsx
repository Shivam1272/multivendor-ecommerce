import React from "react";
import Sidebar from "./Sidebar";
import { Link } from "react-router-dom";
const SellerProducts = () => {
  return (
    <div className="container mt-4">
      <div className="row">
        <div className="col-md-3 col-12 mb-2">
          <Sidebar />
        </div>
        <div className="col-md-9 col-12 mb-2">
          <div className="table-responsive">
            <table className="table table-bordered text-center">
              <thead>
                <tr>
                  <td colSpan={5} align="right">
                    <Link
                      className="btn btn-outline-primary"
                      to="/seller/add-product"
                    >
                      Add Product
                    </Link>
                  </td>
                </tr>
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
                  <td>Product title</td>
                  <td>499</td>
                  <td>Published</td>
                  <td>
                    <Link to="/" className="btn btn-outline-success">
                      View
                    </Link>
                    <Link to="/" className="btn btn-outline-warning ms-2">
                      Edit
                    </Link>
                    <Link to="/" className="btn btn-outline-danger ms-2">
                      Delete
                    </Link>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SellerProducts;
