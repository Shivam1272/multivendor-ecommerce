import React, { useState } from "react";
import axios from "axios";
const Register = () => {
  const baseUrl = "http://localhost:8000/api";
  const [formError, setFormError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [registerFormData, setRegisterFormData] = useState({
    first_name: "",
    last_name: "",
    username: "",
    email: "",
    mobile: "",
    password: "",
  });

  const inputHandler = (e) => {
    setRegisterFormData({
      ...registerFormData,
      [e.target.name]: e.target.value,
    });
  };
  // console.log(registerFormData);
  const sumbitHandler = () => {
    // console.log("registerFormData", registerFormData);
    const formData = new FormData();
    formData.append("first_name", registerFormData.first_name);
    formData.append("last_name", registerFormData.last_name);
    formData.append("username", registerFormData.username);
    formData.append("email", registerFormData.email);
    formData.append("mobile", registerFormData.mobile);
    formData.append("password", registerFormData.password);

    axios
      .post(baseUrl + "/customer/register", formData)
      .then((res) => {
        console.log(res.data);
        if (res.data.success === false) {
          setErrorMessage(res.data.message);
          setFormError(true);
        } else {
          setRegisterFormData({
            first_name: "",
            last_name: "",
            username: "",
            email: "",
            mobile: "",
            password: "",
          });
          setSuccessMessage(res.data.message);
          setFormError(false);
        }
      })
      .catch((err) => console.log(err));
  };
  // let checkCustomer = localStorage.getItem("customer_login");
  // if (checkCustomer) {
  //   window.location.href = "/customer/dashboard";
  // }
  const buttonEnable =
    registerFormData.username != "" &&
    registerFormData.password != "" &&
    registerFormData.first_name != "" &&
    registerFormData.last_name != "" &&
    registerFormData.mobile != "" &&
    registerFormData.email != "";
  // console.log(buttonEnable);
  return (
    <div className="container mt-4">
      <div className="row">
        <div className="col-md-8 col-12 offset-2">
          <div className="card">
            <h4 className="card-header">Register</h4>
            <div className="card-body">
              {successMessage && (
                <p className="text-success">{successMessage}</p>
              )}
              {errorMessage && <p className="text-danger">{errorMessage}</p>}
              <form>
                <div className="mb-3">
                  <label htmlFor="first_name" className="form-label">
                    First Name
                  </label>
                  <input
                    name="first_name"
                    value={registerFormData.first_name}
                    onChange={inputHandler}
                    type="text"
                    className="form-control"
                    id="first_name"
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="last_name" className="form-label">
                    Last Name
                  </label>
                  <input
                    name="last_name"
                    value={registerFormData.last_name}
                    onChange={inputHandler}
                    type="text"
                    className="form-control"
                    id="last_name"
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="username" className="form-label">
                    Username
                  </label>
                  <input
                    name="username"
                    value={registerFormData.username}
                    onChange={inputHandler}
                    type="text"
                    className="form-control"
                    id="username"
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">
                    Email address
                  </label>
                  <input
                    name="email"
                    value={registerFormData.email}
                    onChange={inputHandler}
                    type="email"
                    className="form-control"
                    id="email"
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="mobile" className="form-label">
                    Mobile Number
                  </label>
                  <input
                    name="mobile"
                    value={registerFormData.mobile}
                    onChange={inputHandler}
                    type="text"
                    className="form-control"
                    id="mobile"
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="password" className="form-label">
                    Password
                  </label>
                  <input
                    name="password"
                    value={registerFormData.password}
                    onChange={inputHandler}
                    type="password"
                    className="form-control"
                    id="password"
                  />
                </div>
                <button
                  type="button"
                  onClick={sumbitHandler}
                  disabled={!buttonEnable}
                  className="btn btn-primary"
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

export default Register;
