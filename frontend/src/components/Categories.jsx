import React, { useState, useEffect } from "react";
import logo from "../logo.svg";
import { Link } from "react-router-dom";
import axios from "axios";
const Categories = () => {
  const base = "http://localhost:8000/api/";
  const [categories, setCategories] = useState();
  const [totalResults, setTotalResults] = useState(0);
  const [baseUrl, setBaseUrl] = useState(base + "categories/");
  // Get all products  component mount.
  useEffect(() => {
    (async () => {
      try {
        let response = await axios.get(baseUrl);
        if (!response) throw new Error("No data returned.");
        // console.log(response);
        setCategories(response.data.results);
        setTotalResults(response.data.count);
      } catch (err) {
        console.error(`An error occurred: ${err}`);
      }
    })();
  }, [baseUrl]);
  // console.log("products", products);
  const changeUrl = (url) => {
    setBaseUrl(base + url);
  };
  const links = [];
  let limit = 12;
  let totalLinks = totalResults / limit;
  for (let i = 1; i <= totalLinks; i++) {
    links.push(
      <li className="page-item" key={i}>
        <Link
          className="page-link"
          onClick={() => changeUrl(`categories/?page=${i}`)}
          to={`?page=${i}`}
        >
          {i}
        </Link>
      </li>
    );
  }
  return (
    <section className="container mt-4">
      <h3 className="mb-4">All Categories </h3>
      <div className="row mb-4">
        {categories?.map((category, idx) => (
          <div className="col-md-3 col-12 mb-4" key={idx}>
            <div className="card">
              <img src={logo} className="card-img-top" alt={category.title} />
              <div className="card-body">
                <h4 className="card-title">
                  <Link to={`/category/${category.title}/${category.id}`}>
                    {category.title}
                  </Link>
                </h4>
                <h5 className="card-title">
                  Price : <span className="text-muted">Rs. 499</span>
                </h5>
              </div>
              <div className="card-footer ">Product Download: 1243</div>
            </div>
          </div>
        ))}
      </div>
      <nav aria-label="Page navigation">
        <ul className="pagination">{links}</ul>
      </nav>
    </section>
  );
};

export default Categories;
