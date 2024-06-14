import React, { useState } from "react";
import Sidebar from "./Sidebar";
import axios from "axios";
const AddAddress = () => {
  const customerId = localStorage.getItem("customer_id");
  const baseUrl = "http://127.0.0.1:8000/api/";
  const [address, setAddress] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const inputHandler = (e) => {
    setAddress(e.target.value);
  };
  // console.log(address);

  const submitHandler = () => {
    const formData = new FormData();
    console.log(address, customerId);
    formData.append("customer", customerId);
    formData.append("address", address);

    axios
      .post(baseUrl + "address/", formData)
      .then((res) => {
        if (res.status === 201) {
          setSuccessMsg("Address Added");
          setErrorMsg("");
          setAddress("");
        } else {
          setErrorMsg("Error Occured");
          setSuccessMsg("");
        }
      })
      .catch((e) => console.log(e));
  };

  const disabled = address === "";

  return (
    <div className="container mt-4">
      <div className="row">
        <div className="col-md-3 col-12 mb-2">
          <Sidebar />
        </div>
        <div className="col-md-9 col-12 mb-2">
          <div className="card">
            <h4 className="card-header">Add Address</h4>
            <div className="card-body">
              {errorMsg && <p className="alert alert-danger">{errorMsg}</p>}
              {successMsg && (
                <p className="alert alert-success">{successMsg}</p>
              )}
              <form action="">
                <div className="mb-3">
                  <label htmlFor="Address" className="form-label">
                    Address
                  </label>
                  <textarea
                    className="form-control"
                    name="address"
                    value={address}
                    id="address"
                    onChange={inputHandler}
                  ></textarea>
                </div>
                <button
                  type="button"
                  disabled={disabled}
                  onClick={submitHandler}
                  className="btn btn-primary"
                >
                  Save Address
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddAddress;
