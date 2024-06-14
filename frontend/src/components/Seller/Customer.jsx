import React from "react";
import Sidebar from "./Sidebar";

const Customers = () => {
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
                    <th>Name</th>
                    <th>Email</th>
                    <th>Mobile</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>1</td>
                    <td>Jhon Doe </td>
                    <td>jhondoe@gmail.com</td>
                    <td>+119 1232 3321</td>
                    <td>
                      <button className="btn btn-outline-primary btn-sm">
                        Orders
                      </button>
                      <button className="btn btn-outline-danger ms-1 btn-sm">
                        Remove
                      </button>
                    </td>
                  </tr>
                  <tr>
                    <td>2</td>
                    <td>Jhon Doe </td>
                    <td>jhondoe@gmail.com</td>
                    <td>+119 1232 3321</td>
                    <td>
                      <button className="btn btn-outline-primary btn-sm">
                        Orders
                      </button>
                      <button className="btn btn-outline-danger ms-1 btn-sm">
                        Remove
                      </button>
                    </td>
                  </tr>
                  <tr>
                    <td>3</td>
                    <td>Jhon Doe </td>
                    <td>jhondoe@gmail.com</td>
                    <td>+119 1232 3321</td>
                    <td>
                      <button className="btn btn-outline-primary btn-sm">
                        Orders
                      </button>
                      <button className="btn btn-outline-danger ms-1 btn-sm">
                        Remove
                      </button>
                    </td>
                  </tr>
                  <tr>
                    <td>4</td>
                    <td>Jhon Doe </td>
                    <td>jhondoe@gmail.com</td>
                    <td>+119 1232 3321</td>
                    <td>
                      <button className="btn btn-outline-primary btn-sm">
                        Orders
                      </button>
                      <button className="btn btn-outline-danger ms-1 btn-sm">
                        Remove
                      </button>
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

export default Customers;
