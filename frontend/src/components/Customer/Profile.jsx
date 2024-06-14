import React, { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import axios from "axios";

const Profile = () => {
  const baseUrl = "http://localhost:8000/api";
  const [profileData, setProfileData] = useState({
    userId: "",
    first_name: "",
    last_name: "",
    username: "",
    email: "",
    mobile: "",
    profile_img: "",
  });

  const customerId = localStorage.getItem("customer_id");
  useEffect(() => {
    (async () => {
      axios
        .get(`${baseUrl}/customer/${customerId}`)
        .then((res) => {
          // console.log(res);
          setProfileData({
            userId: res.data.user.id,
            first_name: res.data.user.first_name,
            last_name: res.data.user.last_name,
            email: res.data.user.email,
            username: res.data.user.username,
            mobile: res.data.mobile,
            profile_img: res.data.profile_img,
          });
        })
        .catch((er) => console.log(er));
    })();
  }, [customerId]);

  const inputHandler = (e) => {
    setProfileData({
      ...profileData,
      [e.target.name]: e.target.value,
    });
  };

  const handleFileChange = (e) => {
    setProfileData({
      ...profileData,
      [e.target.name]: e.target.files[0],
    });
  };

  const sumbitHandler = () => {
    // console.log("registerFormData", registerFormData);
    const formData = new FormData();
    formData.append("user", profileData.userId);
    formData.append("mobile", profileData.mobile);
    formData.append("profile_img", profileData.profile_img);

    console.log(profileData);

    axios
      .put(baseUrl + "/customer/" + customerId, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => console.log(res.data))
      .catch((err) => console.log(err));

    const formUserData = new FormData();
    formData.append("id", profileData.userId);
    formUserData.append("first_name", profileData.first_name);
    formUserData.append("last_name", profileData.last_name);
    formUserData.append("username", profileData.username);
    formUserData.append("email", profileData.email);

    axios
      .put(baseUrl + "/user/" + profileData.userId, formUserData)
      .then((res) => console.log(res.data))
      .catch((err) => console.log(err));
  };

  return (
    <div className="container mt-4">
      <div className="row">
        <div className="col-md-3 col-12 mb-2">
          <Sidebar />
        </div>
        <div className="col-md-9 col-12 mb-2">
          <div className="card">
            <h2 className="m-2">Welcome {profileData.username}</h2>
            <h4 className=" mt-2 card-header">Update Profile</h4>
            <div className="card-body">
              <form>
                <div className="mb-3">
                  <label htmlFor="firstname" className="form-label">
                    First Name
                  </label>
                  <input
                    name="first_name"
                    onChange={inputHandler}
                    type="text"
                    value={profileData.first_name}
                    className="form-control"
                    id="firstname"
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="lastname" className="form-label">
                    Last Name
                  </label>
                  <input
                    name="last_name"
                    onChange={inputHandler}
                    type="text"
                    value={profileData.last_name}
                    className="form-control"
                    id="lastname"
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="username" className="form-label">
                    Username
                  </label>
                  <input
                    name="username"
                    onChange={inputHandler}
                    type="text"
                    value={profileData.username}
                    className="form-control"
                    id="username"
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">
                    Email address
                  </label>
                  <input
                    onChange={inputHandler}
                    type="email"
                    name="email"
                    value={profileData.email}
                    className="form-control"
                    id="email"
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="mobile" className="form-label">
                    Mobile No.
                  </label>
                  <input
                    onChange={inputHandler}
                    type="text"
                    name="mobile"
                    value={profileData.mobile}
                    className="form-control"
                    id="mobile"
                  />
                </div>
                <hr />
                <div className="mb-1 d-flex gap-3">
                  <div>
                    <p className="mt-2">
                      <img
                        width={100}
                        height={100}
                        className="rounded-circle"
                        src={profileData.profile_img}
                        alt="profile_img"
                      />
                    </p>
                  </div>
                  <div className="d-flex flex-column pt-2 justify-content-start">
                    <label htmlFor="file" className="form-label">
                      Profile Image
                    </label>
                    <input
                      onChange={handleFileChange}
                      type="file"
                      name="profile_img"
                      className="form-control"
                      id="file"
                    />
                  </div>
                </div>
                <hr />
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={sumbitHandler}
                >
                  Update
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
