import React, { useState } from "react";
import axios from "axios";
const Login = () => {
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
      .post(baseUrl + "/customer/login", formData)
      .then((res) => {
        console.log(res.data);
        if (res.data.success === false) {
          setErrorMessage(res.data.message);
          setFormError(true);
        } else {
          localStorage.setItem("customer_id", res.data.id);
          localStorage.setItem("customer_login", res.data.success);
          localStorage.setItem("customer_username", res.data.username);
          setErrorMessage("");
          setFormError(false);
        }
      })
      .catch((err) => console.log(err));
  };
  let checkCustomer = localStorage.getItem("customer_login");
  if (checkCustomer) {
    window.location.href = "/customer/dashboard";
  }
  const buttonEnable =
    loginFormData.username != "" && loginFormData.password != "";
  return (
    <div className="container mt-4">
      <div className="row">
        <div className="col-md-8 col-12 offset-2">
          <div className="card">
            <h4 className="card-header">Login</h4>
            <div className="card-body">
              {formError && <p className="text-danger">{errorMessage}</p>}
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

export default Login;
