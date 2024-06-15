import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { CartContext, CurrencyContext, UserContext } from "../Contex";
const Navbar = () => {
  const userContext = useContext(UserContext);
  const { cartData } = useContext(CartContext);
  const { currency, setCurrency } = useContext(CurrencyContext);
  // console.log(userContext);
  const checkVendor = Boolean(localStorage.getItem("vendor_login"));
  console.log(checkVendor);
  console.log(typeof checkVendor);
  const changeCurrency = (e) => {
    // console.log(e.target.value);
    let _currency = e.target.value;
    localStorage.setItem("currency", _currency);
    setCurrency(_currency);
  };
  // console.log(localStorage.getItem("currency"));

  return (
    <nav className="navbar navbar-dark bg-info navbar-expand-lg">
      <div className="container-fluid">
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarTogglerDemo01"
          aria-controls="navbarTogglerDemo01"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
          <Link to="/" className="navbar-brand">
            Django MarketPlace
          </Link>
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link" aria-current="page" to="/">
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/categories">
                Categories
              </Link>
            </li>
            <li className="nav-item dropdown">
              <a
                className="nav-link dropdown-toggle"
                href="/"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                My Account
              </a>
              <ul className="dropdown-menu">
                {userContext == null && (
                  <>
                    <li>
                      <Link className="dropdown-item" to="/customer/register">
                        Register
                      </Link>
                    </li>
                    <li>
                      <Link className="dropdown-item" to="/customer/login">
                        Login
                      </Link>
                    </li>
                  </>
                )}
                {userContext == "true" && (
                  <>
                    <li>
                      <Link className="dropdown-item" to="/customer/dashboard">
                        Dashboard
                      </Link>
                    </li>
                    <li>
                      <Link className="dropdown-item" to="/customer/logout">
                        Logout
                      </Link>
                    </li>
                  </>
                )}
              </ul>
            </li>
            <li className="nav-item dropdown">
              <a
                className="nav-link dropdown-toggle"
                href="/"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Seller Panel
              </a>
              <ul className="dropdown-menu">
                {checkVendor !== true ? (
                  <>
                    <li>
                      <Link className="dropdown-item" to="/seller/register">
                        Register
                      </Link>
                    </li>
                    <li>
                      <Link className="dropdown-item" to="/seller/login">
                        Login
                      </Link>
                    </li>
                  </>
                ) : (
                  <>
                    <li>
                      <Link className="dropdown-item" to="/seller/dashboard">
                        Dashboard
                      </Link>
                    </li>
                    <li>
                      <Link className="dropdown-item" to="/seller/logout">
                        Logout
                      </Link>
                    </li>
                  </>
                )}
              </ul>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/checkout">
                New Order(4)
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/checkout">
                My Cart({cartData?.length || 0})
              </Link>
            </li>
            <li className="nav-item">
              <div className="nav-link">
                <select onChange={changeCurrency}>
                  {currency === "usd" && (
                    <>
                      <option value="in">INR</option>
                      <option selected value="usd">
                        USD
                      </option>
                    </>
                  )}
                  {currency !== "usd" && (
                    <>
                      <option selected value="in">
                        INR
                      </option>
                      <option value="usd">USD</option>
                    </>
                  )}
                </select>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
