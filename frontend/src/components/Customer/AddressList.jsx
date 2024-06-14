import React, { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import { Link } from "react-router-dom";
import axios from "axios";
import EditAddressModal from "./EditAddressModal";

const AddressList = () => {
  const customerId = localStorage.getItem("customer_id");
  const baseUrl = "http://localhost:8000/api/";

  const [addressList, setAddressList] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState({});

  useEffect(() => {
    (async () => {
      axios
        .get(baseUrl + "customer/" + customerId + "/address-list/")
        .then((res) => {
          if (res.status === 200) {
            setAddressList(res.data.results);
          }
        })
        .catch((e) => console.log(e));
    })();
  }, [customerId]);

  const handleEditClick = (address) => {
    setSelectedAddress(address);
    setShowModal(true);
  };

  const handleModalClose = () => {
    setShowModal(false);
  };

  const handleAddressChange = (e) => {
    setSelectedAddress({ ...selectedAddress, address: e.target.value });
  };

  const handleSaveChanges = () => {
    axios
      .put(`${baseUrl}address/${selectedAddress.id}/`, selectedAddress)
      .then((res) => {
        if (res.status === 200) {
          setAddressList((prevList) =>
            prevList.map((item) =>
              item.id === selectedAddress.id ? selectedAddress : item
            )
          );
          setShowModal(false);
        }
      })
      .catch((e) => console.log(e));
  };

  console.log(addressList);

  const makeDefaultAddress = (address, addressId) => {
    const updatedAddress = { ...address, default_address: true };

    axios
      .put(`${baseUrl}address/${addressId}/`, updatedAddress)
      .then((res) => {
        if (res.status === 200) {
          setAddressList((prevList) =>
            prevList.map((item) =>
              item.id === addressId
                ? updatedAddress
                : { ...item, default_address: false }
            )
          );
        }
      })
      .catch((e) => console.log(e));
  };

  const handelDeleteBtn = (addressId) => {
    axios
      .delete(`${baseUrl}address/${addressId}/`)
      .then((res) => console.log(res))
      .catch((e) => console.log(e));
  };

  return (
    <>
      <div className="container mt-4">
        <div className="row">
          <div className="col-12 col-md-3 mb-2">
            <Sidebar />
          </div>
          <div className="col-12 col-md-9 mb-2">
            <div className="row">
              <div className="col-12">
                <Link
                  to="/customer/add-address"
                  className="btn btn-outline-success mb-4 float-end"
                >
                  Add Address
                </Link>
              </div>
            </div>
            <div className="row">
              {addressList?.map((address, index) => (
                <div key={index} className="col-4 mb-4">
                  <div className="card">
                    <div className="card-body text-muted">
                      <h6>
                        {address.default_address ? (
                          <span
                            role="button"
                            className="position-absolute top-0 end-0 m-2 badge p-2 bg-primary"
                          >
                            Default Address
                          </span>
                        ) : (
                          <span
                            onClick={() =>
                              makeDefaultAddress(address, address.id)
                            }
                            role="button"
                            className="position-absolute top-0 end-0 m-2 badge p-2 bg-secondary"
                          >
                            Make Default Address
                          </span>
                        )}
                        <br />
                        {address.address}
                      </h6>
                    </div>
                    <div className="card-footer">
                      <button
                        className="btn btn-info fw-bolder"
                        onClick={() => handleEditClick(address)}
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handelDeleteBtn(address.id)}
                        className="btn btn-danger ms-1 fw-bolder"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <EditAddressModal
          show={showModal}
          handleClose={handleModalClose}
          address={selectedAddress}
          handleAddressChange={handleAddressChange}
          handleSave={handleSaveChanges}
        />
      </div>
    </>
  );
};

export default AddressList;
