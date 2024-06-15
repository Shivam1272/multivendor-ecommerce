import React, { useState } from "react";
import axios from "axios";
const SellerLogin = () => {
  const baseUrl = "http://localhost:8000/api";
  const [formError, setFormError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [loginFormData, setLoginFormData] = useState({
    username: "",
    password: "",
  });

  const inputHandler = (e) => {
    setLoginFormData({
      ...loginFormData,
      [e.target.name]: e.target.value,
    });
  };

  const sumbitHandler = () => {
    console.log(loginFormData);
    const formData = new FormData();
    formData.append("username", loginFormData.username);
    formData.append("password", loginFormData.password);
    // formData["username"] = loginFormData.username;
    // formData["password"] = loginFormData.password;
    console.log(formData);
    axios
      .post(baseUrl + "/vendor/login", formData)
      .then((res) => {
        console.log(res.data);
        if (res.data.success === false) {
          setErrorMessage(res.data.message);
          setFormError(true);
        } else {
          localStorage.setItem("vendor_id", res.data.id);
          localStorage.setItem("vendor_login", res.data.success);
          localStorage.setItem("vendor_username", res.data.username);
          setErrorMessage("");
          setFormError(false);
        }
      })
      .catch((err) => console.log(err));
  };
  let checkVendor = localStorage.getItem("vendor_login");
  if (checkVendor) {
    window.location.href = "/seller/dashboard";
  }
  const buttonEnable =
    loginFormData.username !== "" && loginFormData.password !== "";
  return (
    <div className="container mt-4">
      <div className="row">
        <div className="col-md-8 col-12 offset-2">
          <div className="card">
            <h4 className="card-header">Vendor Login</h4>
            <div className="card-body">
              {formError && (
                <p className="alert alert-danger">{errorMessage}</p>
              )}
              <form>
                <div className="mb-3">
                  <label htmlFor="username" className="form-label">
                    Username
                  </label>
                  <input
                    type="text"
                    id="username"
                    name="username"
                    className="form-control"
                    onChange={inputHandler}
                    value={loginFormData.username}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="password" className="form-label">
                    Password
                  </label>
                  <input
                    id="password"
                    type="password"
                    name="password"
                    className="form-control"
                    onChange={inputHandler}
                    value={loginFormData.password}
                  />
                </div>
                <button
                  type="button"
                  className="btn btn-primary"
                  disabled={!buttonEnable}
                  onClick={sumbitHandler}
                >
                  Submit
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SellerLogin;
