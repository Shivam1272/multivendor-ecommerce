import React, { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import axios from "axios";

const AddProduct = () => {
  const vendor = localStorage.getItem("vendor_id");
  const [productData, setProductData] = useState({
    title: "",
    category: "",
    vendor: vendor,
    slug: "",
    detail: "",
    price: "",
    usd_price: "",
    tags: "",
    image: null,
    demo_url: "",
    product_file: null,
  });
  const baseUrl = "http://localhost:8000/api/";
  const [categories, setCategories] = useState();
  useEffect(() => {
    (async () => {
      try {
        let response = await axios.get(baseUrl + "categories/");
        if (!response) throw new Error("No data returned.");
        // console.log(response);
        setCategories(response.data.results);
      } catch (err) {
        console.error(`An error occurred: ${err}`);
      }
    })();
  }, []);

  const inputHandler = (e) => {
    setProductData({
      ...productData,
      [e.target.name]: e.target.value,
    });
  };

  const fileHandler = (e) => {
    setProductData({
      ...productData,
      [e.target.name]: e.target.files[0],
    });
  };
  console.log(categories);
  console.log(productData);
  const submitHandler = () => {
    const formData = new FormData();
    for (const key in productData) {
      formData.append(key, productData[key]);
    }

    axios
      .post(baseUrl + "products/", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div className="container mt-4">
      <div className="row">
        <div className="col-md-3 col-12 mb-2">
          <Sidebar />
        </div>
        <div className="col-md-9 col-12 mb-2">
          <div className="card">
            <h4 className="card-header">Add New Product</h4>
            <div className="card-body">
              <form>
                <div className="mb-3">
                  <label htmlFor="category" className="form-label">
                    Category
                  </label>
                  <select
                    className="form-control"
                    name="category"
                    value={productData.category}
                    onChange={inputHandler}
                  >
                    {categories?.map((item) => (
                      <option value={item.id}>{item.title}</option>
                    ))}
                  </select>
                </div>
                <div className="mb-3">
                  <label htmlFor="title" className="form-label">
                    Title
                  </label>
                  <input
                    name="title"
                    value={productData.title}
                    onChange={inputHandler}
                    type="text"
                    className="form-control"
                    id="title"
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="slug" className="form-label">
                    Slug
                  </label>
                  <input
                    name="slug"
                    value={productData.slug}
                    onChange={inputHandler}
                    type="text"
                    className="form-control"
                    id="slug"
                  />
                </div>
                <div className="mb-3 d-flex">
                  <input
                    placeholder="price in INR (₹)"
                    name="price"
                    value={productData.price}
                    onChange={inputHandler}
                    type="number"
                    className="form-control"
                    id="price"
                  />
                  <input
                    placeholder="price in USD ($)"
                    name="usd_price"
                    value={productData.usd_price}
                    onChange={inputHandler}
                    type="number"
                    className="form-control ms-1"
                    id="usd_price"
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="description" className="form-label">
                    Description
                  </label>
                  <textarea
                    name="detail"
                    value={productData.detail}
                    onChange={inputHandler}
                    className="form-control"
                    rows={8}
                    id="description"
                  ></textarea>
                </div>
                <div className="mb-3">
                  <label htmlFor="tags" className="form-label">
                    Tags
                  </label>
                  <textarea
                    name="tags"
                    value={productData.tags}
                    onChange={inputHandler}
                    className="form-control"
                    rows={8}
                    id="tags"
                    placeholder={`put tags in comma(,) format like \npython, js, java`}
                  ></textarea>
                </div>
                <div className="mb-3">
                  <label htmlFor="demo_url" className="form-label">
                    Demo URL
                  </label>
                  <input
                    name="demo_url"
                    value={productData.demo_url}
                    onChange={inputHandler}
                    type="url"
                    className="form-control"
                    id="demo_url"
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="image" className="form-label">
                    Featured Image
                  </label>
                  <input
                    name="image"
                    onChange={fileHandler}
                    type="file"
                    className="form-control"
                    id="image"
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="product_file" className="form-label">
                    Product File
                  </label>
                  <input
                    name="product_file"
                    onChange={fileHandler}
                    type="file"
                    className="form-control"
                    id="product_file"
                  />
                </div>
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={submitHandler}
                >
                  Add
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddProduct;
