import React from "react";

const Logout = () => {
  localStorage.removeItem("customer_login");
  localStorage.removeItem("customer_username");
  window.location.href = "/customer/login";
};

export default Logout;
