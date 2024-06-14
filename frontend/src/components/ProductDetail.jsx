import React, { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import RelatedProductCard from "./RelatedProductCard";
import { CartContext, CurrencyContext, UserContext } from "../Contex";

const ProductDetail = () => {
  let params = useParams();
  const { product_id } = params;
  let baseUrl = "http://localhost:8000/api/";
  const [product, setProduct] = useState();
  const [productInWishlist, setProductInWishlist] = useState(false);
  const [relatedProduct, setRelatedProduct] = useState();
  const [productImgs, setProductImgs] = useState([]);
  const [productTags, setProductTags] = useState();
  const [cartBtnClickStatus, setCartBtnClickStatus] = useState(false);

  // const _currency = localStorage.getItem("currency");
  const { cartData, setCartData } = useContext(CartContext);
  const { currency } = useContext(CurrencyContext);
  const userContext = useContext(UserContext);
  // const { userCtx } = useContext(UserContext);

  // console.log("userContext", userContext);

  const checkProductInCart = (product_id) => {
    const existingCart = localStorage.getItem("cart");
    if (existingCart) {
      const cartItems = JSON.parse(existingCart);
      cartItems.map((cart) => {
        if (cart != null && cart.product.id == product_id) {
          setCartBtnClickStatus(true);
        }
      });
    }
  };

  const customerId = localStorage.getItem("customer_id");

  useEffect(() => {
    (async () => {
      try {
        const res = await axios(baseUrl + "product/" + product_id);
        console.log(res);
        if (res.status === 200) {
          setProduct(res.data);
          setProductImgs(res.data.product_imgs);
          setProductTags(res.data.tag_list);
        }
      } catch (err) {
        console.log("Error: ", err);
      }
    })();

    (async () => {
      try {
        const res = await axios(baseUrl + "related-products/" + product_id);
        if (res.status === 200) {
          setRelatedProduct(res.data.results);
        }
      } catch (err) {
        console.log("Error: ", err);
      }
    })();

    checkProductInCart(product_id);

    (async () => {
      const formData = new FormData();
      formData.append("customer", customerId);
      formData.append("product", product_id);

      axios
        .post(`${baseUrl}check-in-wishlist/`, formData)
        .then((res) => {
          setProductInWishlist(res.data.success);
        })
        .catch((err) => {
          console.log(err);
        });
    })();
  }, [product_id, baseUrl, cartBtnClickStatus, productInWishlist]);

  if (!product || !relatedProduct) return <div>Loading....</div>;
  const tagsLinks = [];
  for (let i = 0; i < productTags?.length; i++) {
    let tag = productTags[i].trim();
    tagsLinks.push(
      <Link
        key={i}
        to={`/product/${tag}`}
        className="badge bg-secondary text-white me-1 px-2"
      >
        {tag}
      </Link>
    );
  }

  const addToCart = () => {
    const cartData = {
      product: {
        id: product.id,
        title: product.title,
        price: product.price,
        usd_price: product.usd_price,
        image: product.image,
      },
      user: {
        id: 1,
      },
    };

    const existingCart = localStorage.getItem("cart");
    let newCart = [];
    if (existingCart) {
      newCart = [...JSON.parse(existingCart), cartData];
    } else {
      newCart = [cartData];
    }

    localStorage.setItem("cart", JSON.stringify(newCart));
    setCartData(newCart);
    setCartBtnClickStatus(true);
  };

  const removeFromCart = () => {
    const existingCart = localStorage.getItem("cart");

    if (existingCart) {
      const cartItems = JSON.parse(existingCart);
      const updatedCartItems = cartItems.filter(
        (item) => item.product.id !== product.id
      );
      localStorage.setItem("cart", JSON.stringify(updatedCartItems));
      setCartData(updatedCartItems);
    }
    setCartBtnClickStatus(false);
  };

  const saveInWishlist = () => {
    const formData = new FormData();
    formData.append("customer", customerId);
    formData.append("product", product_id);

    axios
      .post(`${baseUrl}wishlist/`, formData)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  console.log(productImgs);

  return (
    <section className="container m-4">
      <div className="row justify-content-center align-baseline">
        <div className="col-4 mt-2">
          <div
            id="ProductsThubmnailSlider"
            className="carousel carousel-dark carousel-fade slide"
          >
            <div className="carousel-indicators">
              {productImgs?.map((pimage, idx) => {
                if (idx === 0) {
                  return (
                    <button
                      type="button"
                      data-bs-target="ProductsThubmnailSlider"
                      data-bs-slide-to={idx}
                      className="active"
                      aria-current="true"
                      aria-label={`Slide ${idx}`}
                      key={idx}
                    ></button>
                  );
                } else {
                  return (
                    <button
                      type="button"
                      key={idx}
                      data-bs-target="ProductsThubmnailSlider"
                      data-bs-slide-to={idx}
                      className="active"
                      aria-current="true"
                      aria-label={`Slide ${idx}`}
                    ></button>
                  );
                }
              })}
            </div>
            <div className="carousel-inner">
              {productImgs.map((img, idx) => {
                if (idx === 0) {
                  return (
                    <div className="carousel-item active" key={idx}>
                      <img
                        src={img.image}
                        className="my-5 img-thumbnail"
                        alt={idx}
                      />
                    </div>
                  );
                } else {
                  return (
                    <div className="carousel-item" key={idx}>
                      <img
                        src={img.image}
                        className="my-5 img-thumbnail"
                        alt={idx}
                      />
                    </div>
                  );
                }
              })}
            </div>
            <button
              className="carousel-control-prev"
              type="button"
              data-bs-target="#ProductsThubmnailSlider"
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
              data-bs-target="#ProductsThubmnailSlider"
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
        <div className="col-8">
          <h1>{product.title}</h1>
          <p>{product.detail}</p>
          {currency != "usd" ? (
            <h5 className="text-muted">₹ {product.price}</h5>
          ) : (
            <h5 className="text-muted">$ {product.usd_price}</h5>
          )}
          {/* <h5 className="text-muted">₹ {product.price}</h5> */}
          <p className="mt-3">
            <Link
              to={product.demo_url}
              target="_blank"
              title="Demo"
              className="btn btn-secondary"
            >
              <i className="fa-solid fa-share-from-square p-1"></i> Demo
            </Link>
            {!cartBtnClickStatus && (
              <button
                title="Add to Cart"
                type="button"
                onClick={addToCart}
                className="btn btn-primary ms-1"
              >
                <i className="fa-solid fa-cart-plus p-1"></i> Add to Cart
              </button>
            )}
            {cartBtnClickStatus && (
              <button
                title="Remove From Cart"
                type="button"
                onClick={removeFromCart}
                className="btn btn-warning ms-1"
              >
                <i className="fa-solid fa-cart-plus p-1"></i> Remove From Cart
              </button>
            )}
            <Link
              to="/checkout"
              title="Buy Now"
              className="btn btn-success ms-1"
            >
              <i className="fa-solid fa-bag-shopping p-1"></i> Buy Now
            </Link>
            {userContext == "true" ? (
              <button title="Add to Wishlist" className="btn btn-danger ms-1">
                {productInWishlist == true ? (
                  <span>
                    <i className="fa fa-heart-crack p-1 ms-1"></i>Remove From
                    Wishlist
                  </span>
                ) : (
                  <span onClick={saveInWishlist}>
                    <i className="fa fa-heart p-1 ms-1"></i>Add to Wishlist
                  </span>
                )}
              </button>
            ) : (
              <button
                title="Add to Wishlist"
                className="btn btn-danger ms-1 disabled"
              >
                <i className="fa fa-heart p-1"></i> Add to Wishlist
              </button>
            )}
          </p>
          <hr />
          <div>
            <h5>Tags</h5>
            <p className="text-muted">{tagsLinks}</p>
          </div>
        </div>
      </div>
      <hr />
      <h3 className="mt-2 mb-4">Related Products</h3>
      <div id="relatedProductsSlider" className="carousel carousel-dark slide">
        <div>
          <div className="carousel-indicators mb-auto">
            {relatedProduct?.map((pimage, idx) => {
              if (idx === 0) {
                return (
                  <button
                    type="button"
                    data-bs-target="relatedProductsSlider"
                    data-bs-slide-to={idx}
                    className="active"
                    aria-current="true"
                    aria-label={`Slide ${idx}`}
                    key={idx}
                  ></button>
                );
              } else {
                return (
                  <button
                    type="button"
                    key={idx}
                    data-bs-target="relatedProductsSlider"
                    data-bs-slide-to={idx}
                    className="active"
                    aria-current="true"
                    aria-label={`Slide ${idx}`}
                  ></button>
                );
              }
            })}
          </div>
        </div>
        <div className="carousel-inner">
          {relatedProduct?.map((pro, idx) => {
            if (idx === 0) {
              return (
                <div className="carousel-item active row" key={idx}>
                  <RelatedProductCard product={pro} />
                </div>
              );
            } else {
              return (
                <div className="carousel-item" key={idx}>
                  <RelatedProductCard product={pro} />
                </div>
              );
            }
          })}
        </div>
        <button
          className="carousel-control-prev"
          type="button"
          data-bs-target="#relatedProductsSlider"
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
          data-bs-target="#relatedProductsSlider"
          data-bs-slide="next"
        >
          <span
            className="carousel-control-next-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>
      {/* <h3>No Related Product</h3> */}
    </section>
  );
};

export default ProductDetail;
