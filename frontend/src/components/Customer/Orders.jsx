import React, { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import { Link } from "react-router-dom";
import axios from "axios";

const Orders = () => {
  const baseUrl = "http://localhost:8000/api/";
  let customer_id = localStorage.getItem("customer_id");
  const [customerOrder, setCustomerOrder] = useState();
  useEffect(() => {
    (async () => {
      axios
        .get(baseUrl + `customer/${customer_id}/orderitems/`)
        .then((res) => {
          console.log(res.data);
          setCustomerOrder(res.data);
        })
        .catch((err) => console.log(err));
    })();
  }, [customer_id]);

  const countDownload = (product_id, productFile) => {
    const formData = new FormData();
    formData.append("product_id", product_id);
    console.log("productFile", productFile);

    axios
      .post(`${baseUrl}update-product-download-count/${product_id}`, formData)
      .then((res) => {
        if (res.data.success) {
          window.open(`http://localhost:8000${productFile}`, "_blank");
        }
      })
      .catch((err) => console.log(err));
  };
  console.log(customerOrder);
  return (
    <div className="container mt-4">
      <div className="row">
        <div className="col-md-3 col-12 mb-2">
          <Sidebar />
        </div>
        <div className="col-md-9 col-12 mb-2">
          <div className="row">
            <div className="table-responsive">
              {customerOrder?.count > 0 ? (
                <table className="table text-center table-bordered">
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Product</th>
                      <th>Title</th>
                      <th>Price</th>
                      <th>Status</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {customerOrder.results.map((orderItem, idx) => (
                      <tr key={idx + 1}>
                        <td>{idx + 1}</td>
                        <td>
                          <Link
                            to={`/product/${orderItem.product.slug}/${orderItem.product.id}`}
                          >
                            <img
                              src={`http://localhost:8000${orderItem.product.image}`}
                              className="img-thumbnail"
                              width="80"
                              alt="logo"
                            />
                          </Link>
                        </td>
                        <td>{orderItem.product.title}</td>
                        <td>{orderItem.product.price}</td>
                        <td>
                          {orderItem.order.order_status ? (
                            <span className="text-success">
                              <i className="fa fa-check-circle me-2"></i>
                              Completed
                            </span>
                          ) : (
                            <span className="text-secondary">
                              <i className="fa-solid fa-spinner me-2"></i>
                              Pending
                            </span>
                          )}
                        </td>
                        <td>
                          {orderItem.order.order_status ? (
                            <button
                              onClick={() =>
                                countDownload(
                                  orderItem.product.id,
                                  orderItem.product.product_file
                                )
                              }
                              className="btn btn-outline-primary"
                            >
                              Download{" "}
                              <span className="ms-1 badge text-primary border">
                                {orderItem.product.download}
                              </span>
                            </button>
                          ) : (
                            <button className="btn btn-outline-warning">
                              Buy Now
                            </button>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <>
                  <h3>No order Yet</h3>
                  <Link className="btn btn-success" to="/">
                    Home
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Orders;
