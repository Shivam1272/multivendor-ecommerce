import React, { useContext, useState } from "react";
import { CartContext, CurrencyContext, UserContext } from "../Contex";
import axios from "axios";
import { PayPalButtons, PayPalScriptProvider } from "@paypal/react-paypal-js";

const ConfirmOrder = () => {
  const baseUrl = "http://localhost:8000/api";
  const checkCustomer = useContext(UserContext);
  const { cartData, setCartData } = useContext(CartContext);
  const [confirmOrder, setConfirmOrder] = useState(false);
  const [orderAmount, setOrderAmount] = useState(0);
  const [orderId, setOrderId] = useState();
  const [orderStatus, setOrderStatus] = useState(false);
  const [payMethod, setPayMethod] = useState("");
  const { currency } = useContext(CurrencyContext);

  const orderItems = (orderId) => {
    let existingCart = localStorage.getItem("cart");
    if (existingCart) {
      let cartJson = JSON.parse(existingCart);
      const promises = cartJson.map((cart) => {
        const formData = new FormData();
        formData.append("order", orderId);
        formData.append("product", cart.product.id);
        formData.append("qty", 1);
        formData.append("price", cart.product.price);
        formData.append("usd_price", cart.product.usd_price);

        return axios.post(baseUrl + "/orderitems/", formData);
      });

      Promise.all(promises)
        .then((responses) => {
          console.log("All items processed:", responses);
          localStorage.removeItem("cart");
          setCartData([]);
        })
        .catch((err) => {
          console.log("Error processing cart items:", err);
        });
    }
  };

  const addOrderInTable = () => {
    let totalAmount = 0;
    let totalUSDAmount = 0;
    const customerId = localStorage.getItem("customer_id");
    cartData.map((cart) => {
      totalAmount += parseFloat(cart.product.price);
      totalUSDAmount += parseFloat(cart.product.usd_price);
    });
    const formData = new FormData();

    formData.append("customer", customerId);
    formData.append("total_amount", totalAmount);
    formData.append("total_usd_amount", totalUSDAmount);

    axios
      .post(baseUrl + "/orders/", formData)
      .then((res) => {
        setOrderId(res.data.id);
        currency !== "usd"
          ? setOrderAmount(res.data.total_amount)
          : setOrderAmount(res.data.total_usd_amount);
        orderItems(res.data.id);
      })
      .catch((err) => console.log(err));
  };

  const updateOrderStatus = (order_status) => {
    axios
      .post(baseUrl + "/update-order-status/" + orderId)
      .then((res) => {
        console.log(res);
        if (res.data.success) {
          window.location.href = "/order/success";
        } else {
          window.location.href = "/order/failure";
        }
      })
      .catch((err) => console.log(err));
  };

  if (!checkCustomer) {
    window.location.href = "/customer/login";
  } else {
    if (!confirmOrder) {
      addOrderInTable();
      setConfirmOrder(true);
    }
  }

  const changePaymentMethod = (payMethod) => {
    setPayMethod(payMethod);
  };

  const PayNowBtn = () => {
    if (payMethod == "") {
      alert("Select Payment Method");
    }
  };
  return (
    <div className="container">
      <div className="row  mt-5">
        <div className="col-6 offset-3">
          <div className="card text-center p-3">
            <h3 className="text-success">
              <i className="fa fa-check-circle me-1 fa-sm" />
              Your Order has been Confirmed
            </h3>
            {orderId && <h5>Order ID: {orderId}</h5>}
          </div>
          <div className="card p-3 mt-4">
            <form action="" className="mb-1">
              {currency !== "usd" ? (
                <div className="form-group">
                  <label htmlFor="">
                    <input
                      type="radio"
                      name="payMethod"
                      onChange={() => changePaymentMethod("razorpay")}
                    />{" "}
                    RazorPay (For India ₹)
                  </label>
                </div>
              ) : (
                <>
                  <div className="form-group">
                    <label htmlFor="">
                      <input
                        type="radio"
                        name="payMethod"
                        onChange={() => changePaymentMethod("paypal")}
                      />{" "}
                      PayPal
                    </label>
                  </div>
                  <div className="form-group">
                    <label htmlFor="">
                      <input
                        type="radio"
                        name="payMethod"
                        onChange={() => changePaymentMethod("stripe")}
                      />{" "}
                      Stripe
                    </label>
                  </div>
                </>
              )}

              <button
                type="button"
                className="btn btn-outline-info mt-2"
                onClick={PayNowBtn}
              >
                Next
              </button>
            </form>
            {payMethod === "paypal" && (
              <PayPalScriptProvider
                options={{
                  "client-id":
                    "AYXyrzv6sQnjaCmVFV5IWiOvrkdb6FnJeZAZuezL_OUTUkNe7gDtN5wPS86o2c0g_E1VOqjiAsjZKP0m",
                }}
              >
                <PayPalButtons
                  className="mt-1"
                  createOrder={(data, action) => {
                    return action.order.create({
                      purchase_units: [
                        {
                          amount: {
                            currency_code: "USD",
                            value: orderAmount,
                          },
                        },
                      ],
                    });
                  }}
                  onApprove={async (data, action) => {
                    const details = await action.order.capture();
                    const name = details.payer.name.given_name;
                    setOrderStatus(true);
                    updateOrderStatus(true);
                  }}
                />
              </PayPalScriptProvider>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmOrder;
