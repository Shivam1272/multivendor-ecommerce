import "./App.css";
import "bootstrap/dist/css/bootstrap.css";
import { Route, Routes } from "react-router-dom";

import {
  Navbar,
  Footer,
  Home,
  Categories,
  CategoryProduct,
  AllProducts,
  ProductDetail,
  Checkout,
  OrderSuccess,
  OrderFailure,
  TagProducts,
  ConfirmOrder,
} from "./components";

import {
  Register,
  Login,
  DashBoard,
  Orders,
  Wishlist,
  Profile,
  ChangePassword,
  AddressList,
  AddAddress,
  Logout,
} from "./components/Customer";

import {
  SellerRegister,
  SellerLogin,
  SellerDashBoard,
  SellerProducts,
  AddProduct,
  SellerOrders,
  Customers,
  Report,
  SellerProfile,
  SellerChangePassword,
} from "./components/Seller";
import { CartContext, CurrencyContext } from "./Contex";
import { useState } from "react";

function App() {
  const checkCart = localStorage.getItem("cart");
  const _currency = localStorage.getItem("currency");
  const [cartData, setCartData] = useState(JSON.parse(checkCart));
  const [currency, setCurrency] = useState(_currency);

  return (
    <CurrencyContext.Provider value={{ currency, setCurrency }}>
      <CartContext.Provider value={{ cartData, setCartData }}>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<AllProducts />} />
          <Route
            path="/product/:product_slug/:product_id"
            element={<ProductDetail />}
          />
          <Route path="/product/:tag" element={<TagProducts />} />
          <Route path="/categories" element={<Categories />} />
          <Route
            path="/category/:category_slug/:category_id"
            element={<CategoryProduct />}
          />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/confirm-order" element={<ConfirmOrder />} />
          <Route path="/order/success" element={<OrderSuccess />} />
          <Route path="/order/failure" element={<OrderFailure />} />

          {/* Customer Route */}
          <Route path="/customer/register" element={<Register />} />
          <Route path="/customer/login" element={<Login />} />
          <Route path="/customer/dashboard" element={<DashBoard />} />
          <Route path="/customer/orders" element={<Orders />} />
          <Route path="/customer/profile" element={<Profile />} />
          <Route path="/customer/wishlist" element={<Wishlist />} />
          <Route path="/customer/addresslist" element={<AddressList />} />
          <Route path="/customer/add-address" element={<AddAddress />} />
          <Route
            path="/customer/change-password"
            element={<ChangePassword />}
          />
          <Route path="/customer/logout" element={<Logout />} />

          {/* Seller Route */}

          <Route path="/seller/register" element={<SellerRegister />} />
          <Route path="/seller/login" element={<SellerLogin />} />
          <Route path="/seller/dashboard" element={<SellerDashBoard />} />
          <Route path="/seller/products" element={<SellerProducts />} />
          <Route path="/seller/add-product" element={<AddProduct />} />
          <Route path="/seller/orders" element={<SellerOrders />} />
          <Route path="/seller/customers" element={<Customers />} />
          <Route path="/seller/report" element={<Report />} />
          <Route path="/seller/profile" element={<SellerProfile />} />
          <Route
            path="/seller/change-password"
            element={<SellerChangePassword />}
          />
        </Routes>
        <Footer />
      </CartContext.Provider>
    </CurrencyContext.Provider>
  );
}

export default App;
