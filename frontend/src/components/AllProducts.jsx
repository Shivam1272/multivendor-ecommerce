import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import ProductCard from "./ProductCard";

const AllProducts = () => {
  const base = "http://localhost:8000/api/";
  const [products, setProducts] = useState();
  const [totalResults, setTotalResults] = useState(0);
  const [baseUrl, setBaseUrl] = useState(base + "products/");
  // Get all products on component mount.
  useEffect(() => {
    (async () => {
      try {
        let response = await axios.get(baseUrl);
        if (!response) throw new Error("  No data returned.");
        // console.log(response);
        setProducts(response.data.results);
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
          onClick={() => changeUrl(`products/?page=${i}`)}
          to={`?page=${i}`}
        >
          {i}
        </Link>
      </li>
    );
  }
  // console.log(products);
  return (
    <section className="container mt-4">
      <h3 className="mb-4">All Products</h3>
      <div className="row mb-4">
        {products?.map((product, idx) => (
          <ProductCard key={idx} product={product} />
        ))}
      </div>
      <nav aria-label="Page navigation">
        <ul className="pagination">{links}</ul>
      </nav>
    </section>
  );
};

export default AllProducts;
