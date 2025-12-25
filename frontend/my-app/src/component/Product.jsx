import React, { useState } from "react";
import { Link } from "react-router-dom";
import Rating from "./Rating";
import "../css/Product.css";

const Product = ({ product }) => {
  const [rating, setRating] = useState(0);
  const handleRatingChange = (newRating) => {
    setRating(newRating);
  };
  return (
    <>
      <Link to={`/singleProduct/${product._id}`} className="product-id">
        <div className="product-card">
          <div className="image-container">
            <img
              src={product.image[0].url}
              alt="Product"
              className="product-image"
            />
          </div>

          <div className="info-box">
            <h2 className="product-title">{product.name}</h2>
            <div className="product-rating">
              <Rating
                value={product.rating}
                onRatingChange={handleRatingChange}
                disable={true}
              />
            </div>
            <p className="price">PKR: {product.price}/-</p>
          </div>
        </div>
      </Link>
    </>
  );
};

export default Product;
