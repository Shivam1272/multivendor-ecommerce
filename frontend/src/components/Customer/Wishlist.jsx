import React, { useContext, useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import { Link } from "react-router-dom";
import axios from "axios";
import { CurrencyContext } from "../../Contex";

const Wishlist = () => {
  const { currency } = useContext(CurrencyContext);
  const baseUrl = "http://localhost:8000/api";
  const customerId = localStorage.getItem("customer_id");

  const [wishlist, setWishlist] = useState([]);

  useEffect(() => {
    (async () => {
      axios
        .get(`${baseUrl}/customer/${customerId}/wishitems/`)
        .then((res) => {
          if (res.status == 200) {
            setWishlist(res.data.results);
          }
        })
        .catch((err) => console.log(err));
    })();
  }, [customerId]);

  const removeFromWishList = (wishlist_id) => {
    const formData = new FormData();
    formData.append("wishlist_id", wishlist_id);

    axios
      .post(`${baseUrl}/remove-from-wishlist/`, formData)
      .then((res) => {
        if (res.status == 200) {
          document.getElementById("row" + wishlist_id).remove();
        }
      })
      .catch((err) => console.log(err));
  };

  console.log(wishlist);

  return (
    <div className="container mt-4">
      <div className="row">
        <div className="col-md-3 col-12 mb-2">
          <Sidebar />
        </div>
        <div className="col-md-9 col-12 mb-2">
          <div className="row">
            <div className="table-responsive">
              {wishlist.length > 0 ? (
                <table className="table text-center table-bordered">
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Image</th>
                      <th>Title</th>
                      <th>Price</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {wishlist?.map((item, index) => (
                      <tr key={item.id} id={`row${item.id}`}>
                        <td>{index + 1}</td>
                        <td>
                          <Link
                            to={`/product/${item.product.slug}/${item.product.id}`}
                          >
                            <img
                              src={`http://localhost:8000${item.product.image}`}
                              className="img-thumbnail"
                              width="80"
                              alt="logo"
                            />
                          </Link>
                        </td>
                        <td>
                          <p>{item.product.title}</p>
                        </td>
                        {currency !== "usd" ? (
                          <td>₹ {item.product.price}</td>
                        ) : (
                          <td>$ {item.product.usd_price}</td>
                        )}
                        <td>
                          <button
                            onClick={() => removeFromWishList(item.id)}
                            className="btn btn-danger"
                          >
                            Remove
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <>
                  <h3>No Iten in Wishlist</h3>
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

export default Wishlist;
