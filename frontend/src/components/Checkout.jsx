import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { CartContext, CurrencyContext } from "../Contex";
const Checkout = () => {
  const { cartData, setCartData } = useContext(CartContext);
  const { currency } = useContext(CurrencyContext);
  console.log(cartData);
  let cartItem;
  let sum = 0;
  if (cartData == null) {
    cartItem = 0;
  } else {
    cartItem = cartData.length;
    cartData.map((cart) => {
      currency !== "usd"
        ? (sum += parseFloat(cart.product.price))
        : (sum += parseFloat(cart.product.usd_price));
    });
  }
  // console.log(sum);
  // useEffect(() => {}, [cartData, sum]);

  const removeFromCart = (product_id) => {
    const existingCart = localStorage.getItem("cart");
    if (existingCart) {
      const cartItems = JSON.parse(existingCart);
      const updatedCartItems = cartItems.filter(
        (item) => item.product.id !== product_id
      );
      localStorage.setItem("cart", JSON.stringify(updatedCartItems));
      setCartData(updatedCartItems);
    }
  };

  return (
    <div className="container mt-4">
      <h3>All Items({cartItem})</h3>
      <hr />
      {cartItem != 0 ? (
        <div className="table-responsive text-center">
          <div className="row">
            <div className="col-md-8 col-12">
              <table className="table table-bordered">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Product</th>
                    <th>Image</th>
                    <th>Price</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {cartData?.map((cart, idx) => (
                    <tr key={idx + 1}>
                      <td>{idx + 1}</td>
                      <td>
                        <Link to="/">
                          <img
                            src={cart.product.image}
                            className="img-thumbnail"
                            width="150"
                            alt="logo"
                          />
                        </Link>
                      </td>
                      <td>
                        <p>{cart.product.title}</p>
                      </td>
                      <td>
                        {currency != "usd" ? (
                          <h5 className="text-muted">₹{cart.product.price}</h5>
                        ) : (
                          <h5 className="text-muted">
                            ${cart.product.usd_price}
                          </h5>
                        )}
                      </td>
                      <td>
                        <button
                          className="btn btn-outline-warning ms-1"
                          onClick={() => removeFromCart(cart.product.id)}
                        >
                          <i className="fa-solid fa-trash me-1 fa-xs"></i>
                          Remove From Cart
                        </button>
                        <Link
                          to={`/product/${cart.product.title}/${cart.product.id}`}
                          className="btn btn-outline-info mt-1"
                        >
                          <i className="fa-solid fa-share-from-square me-1 fa-xs"></i>
                          Check Product
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
                <tfoot>
                  <tr>
                    <td colSpan={4}>Total</td>
                    <td colSpan={1}>
                      {currency != "usd" ? `₹${sum}` : `$${sum}`}
                    </td>
                  </tr>
                  <tr>
                    <td colSpan={5} align="char">
                      <Link className="btn btn-secondary" to="/">
                        Continue Shopping
                      </Link>
                      <Link
                        className="btn btn-success ms-1"
                        to="/confirm-order"
                        state={{ sum }}
                      >
                        Proceed to Payment
                      </Link>
                    </td>
                    {/* <th colSpan="1"></th> */}
                  </tr>
                </tfoot>
              </table>
            </div>
          </div>
        </div>
      ) : (
        <>
          <h3>No Prouct in Cart</h3>
          <Link className="btn btn-success" to="/">
            Home
          </Link>
        </>
      )}
    </div>
  );
};

export default Checkout;
