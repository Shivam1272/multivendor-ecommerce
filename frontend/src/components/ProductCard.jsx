import React, { useContext } from "react";
import logo from "../logo.svg";
import { Link } from "react-router-dom";
import { CurrencyContext } from "../Contex";

const ProductCard = ({ product }) => {
  const { currency } = useContext(CurrencyContext);

  if (!product) {
    return <div>Loading...</div>;
  }
  console.log("product card", product);
  const { id, title, price, image, usd_price } = product;
  // console.log(product);
  // console.log(title, price);
  return (
    <div className="col-md-3 col-12 mb-4">
      <div className="card">
        <Link to={`/product/${title}/${id}`}>
          <img
            src={image || logo}
            width={150}
            height={150}
            className="card-img-top"
            alt="product_img"
          />
        </Link>
        <div className="card-body">
          <Link to={`/product/${title}/${id}`}>
            <h5 className="card-title text-break">{title}</h5>
          </Link>
          {currency != "usd" ? (
            <h5 className="text-muted">₹ {price}</h5>
          ) : (
            <h5 className="text-muted">$ {usd_price}</h5>
          )}
        </div>
        <div className="card-footer ">
          <button title="Add to Cart" className="btn btn-success btn-sm">
            <i className="fa-solid fa-cart-plus p-1"></i>
          </button>
          <button
            title="Add to Wishlist"
            className="btn btn-danger btn-sm ms-2"
          >
            <i className="fa fa-heart p-1"></i>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
