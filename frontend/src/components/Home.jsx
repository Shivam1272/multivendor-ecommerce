import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ProductCard } from "./";
import axios from "axios";

const Home = () => {
  // const products = [
  //   {
  //     id: 1,
  //     title: "Product 1",
  //     description: "This is product one.",
  //     price: 20,
  //     usd_price: 2,
  //   },
  //   {
  //     id: 2,
  //     title: "Product 2",
  //     description: "This is product two.",
  //     price: 35,
  //     usd_price: 2,
  //   },
  //   {
  //     id: 3,
  //     title: "Product 3",
  //     description: "This is product three.",
  //     price: 15,
  //     usd_price: 2,
  //   },
  //   {
  //     id: 4,
  //     title: "Product 4",
  //     description: "This is product Four.",
  //     price: 40,
  //     usd_price: 2,
  //   },
  // ];

  const base = "http://localhost:8000/api/products/?fetch_limit=4";
  const [products, setProducts] = useState();

  useEffect(() => {
    (async () => {
      try {
        let response = await axios.get(base);
        if (!response) throw new Error("  No data returned.");
        console.log(response);
        setProducts(response.data.results);
        // setTotalResults(response.data.count);
      } catch (err) {
        console.error(`An error occurred: ${err}`);
      }
    })();
  }, [base]);

  return (
    <main className="mt-4">
      {/* Latest Product */}
      <div className="container">
        <h3 className="mb-4">
          Latest Product{" "}
          <Link
            className="float-end btn btn-sm btn-secondary p-2"
            to="/products"
          >
            View All Latest Products
            <i className="fa fa-arrow-right-long ms-2"></i>
          </Link>
        </h3>
        <div className="row mb-4">
          {products?.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
        {/* End of Latest Product */}
        {/* Popular Category */}

        <h3 className="mb-4">
          Popular Categories{" "}
          <Link
            className="float-end btn btn-sm btn-secondary p-2"
            to="/categories"
          >
            View All Popular Categories
            <i className="fa fa-arrow-right-long ms-2"></i>
          </Link>
        </h3>
        <div className="row mb-4">
          {products?.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
        {/* End of Popular Category */}
        {/* Popular Products */}
        <h3 className="mb-4">
          Popular Products{" "}
          <a className="float-end btn btn-sm btn-secondary p-2" href="/">
            View All Popular Products
            <i className="fa fa-arrow-right-long ms-2"></i>
          </a>
        </h3>
        <div className="row mb-4">
          {products?.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
        {/* End of Popular Product */}
        {/* Popular Seller */}
        <h3 className="mb-4">
          Popular Seller{" "}
          <a className="float-end btn btn-sm btn-secondary p-2" href="/">
            View All Popular Seller
            <i className="fa fa-arrow-right-long ms-2"></i>
          </a>
        </h3>
        <div className="row mb-4">
          {products?.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
        {/* End of Popular Product */}
        {/* Rating & Reviews */}
        <div
          id="carouselExampleIndicators"
          className="carousel slide my-4 border bg-dark p-5 text-white"
        >
          <div className="carousel-indicators">
            <button
              type="button"
              data-bs-target="#carouselExampleIndicators"
              data-bs-slide-to="0"
              className="active"
              aria-current="true"
              aria-label="Slide 1"
            ></button>
            <button
              type="button"
              data-bs-target="#carouselExampleIndicators"
              data-bs-slide-to="1"
              aria-label="Slide 2"
            ></button>
            <button
              type="button"
              data-bs-target="#carouselExampleIndicators"
              data-bs-slide-to="2"
              aria-label="Slide 3"
            ></button>
          </div>
          <div className="carousel-inner">
            <div className="carousel-item active">
              <figure className="text-center">
                <blockquote className="blockquote">
                  <p>A well-known quote, contained in a blockquote element.</p>
                </blockquote>
                <figcaption className="blockquote-footer">
                  <i className="fa fa-star text-warning"></i>{" "}
                  <cite title="Source Title">Customer Name</cite>
                </figcaption>
              </figure>
            </div>
            <div className="carousel-item">
              <figure className="text-center">
                <blockquote className="blockquote">
                  <p>A well-known quote, contained in a blockquote element.</p>
                </blockquote>
                <figcaption className="blockquote-footer">
                  <i className="fa fa-star text-warning"></i>{" "}
                  <i className="fa fa-star text-warning"></i>{" "}
                  <i className="fa fa-star text-warning"></i>{" "}
                  <i className="fa fa-star text-warning"></i>{" "}
                  <cite title="Source Title">Customer Name</cite>
                </figcaption>
              </figure>
            </div>
            <div className="carousel-item">
              <figure className="text-center">
                <blockquote className="blockquote">
                  <p>A well-known quote, contained in a blockquote element.</p>
                </blockquote>
                <figcaption className="blockquote-footer">
                  <i className="fa fa-star text-warning"></i>{" "}
                  <cite title="Source Title">Customer Name</cite>
                </figcaption>
              </figure>
            </div>
          </div>
          <button
            className="carousel-control-prev"
            type="button"
            data-bs-target="#carouselExampleIndicators"
            data-bs-slide="prev"
          >
            <span
              className="carousel-control-prev-icon"
              aria-hidden="true"
            ></span>
            <span className="visually-hidden">Previous</span>
          </button>
          <button
            className="carousel-control-next"
            type="button"
            data-bs-target="#carouselExampleIndicators"
            data-bs-slide="next"
          >
            <span
              className="carousel-control-next-icon"
              aria-hidden="true"
            ></span>
            <span className="visually-hidden">Next</span>
          </button>
        </div>
      </div>
      {/* END OF Rating & Reviews */}
    </main>
  );
};

export default Home;
