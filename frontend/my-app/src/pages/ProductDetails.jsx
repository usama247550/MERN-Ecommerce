import React, { useEffect, useState } from "react";
import Navbar from "../component/Navbar";
import Footer from "../component/Footer";
import "../css/ProductDetail.css";
import Rating from "../component/Rating";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import {
  createReview,
  fetchSingleProduct,
} from "../features/products/productSlice";
import { toast } from "react-toastify";
import Loader from "../component/Loader.jsx";

import {
  removeErrors,
  removeSuccess,
} from "../features/products/productSlice.js";
import {
  removeMessage,
  removeError,
  addItemToCart,
} from "../features/cart/cartSlice.js";
import PageTitle from "../component/PageTitle.jsx";

const ProductDetails = () => {
  const [userRating, setUserRating] = useState(0);
  const [userComment, setUserComment] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [productImage, setProductImage] = useState("");
  const dispatch = useDispatch();
  const { id } = useParams();
  const handleRatingChange = (newRating) => {
    setUserRating(newRating);
  };

  const { loading, singleProduct, error, reviewLoading, reviewSuccess } =
    useSelector((state) => state.Products);

  const {
    loading: cartLoading,
    error: cartError,
    success,
    message,
    cartItems,
  } = useSelector((state) => state.cart);

  const { name, price, description, numOfReviews, stock, rating, reviews } =
    singleProduct?.product || {};

  useEffect(() => {
    if (id) {
      dispatch(fetchSingleProduct(id));
    }
    return () => {
      dispatch(removeErrors());
    };
  }, [dispatch, id]);

  useEffect(() => {
    if (error) {
      toast.error(error, { autoClose: 3000 });
      dispatch(removeErrors());

      if (cartError) {
        toast.error(cartError, { autoClose: 3000 });
        dispatch(removeError());
      }
    }
  }, [dispatch, error, cartError]);

  useEffect(() => {
    if (success) {
      toast.success(message, { autoClose: 3000 });
      dispatch(removeMessage());
    }
  }, [dispatch, success, message]);

  const increaseQuentity = () => {
    if (quantity >= stock) {
      toast.error("cannot exceed available quantity ");
      dispatch(removeErrors());
      return;
    }
    setQuantity((preQuantity) => preQuantity + 1);
  };

  const decreaseQuentity = () => {
    if (quantity <= 1) {
      toast.error("Quantity cannot be less then 1 ");
      dispatch(removeErrors());
      return;
    }
    setQuantity((preQuantity) => preQuantity - 1);
  };

  const addItem = () => {
    dispatch(addItemToCart({ id, quantity }));
    setQuantity(1);
  };

  useEffect(() => {
    if (singleProduct?.product?.image?.length > 0) {
      setProductImage(singleProduct?.product?.image[0].url);
    }
  }, [singleProduct]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!userRating) {
      toast.error("Please select rating");
      return;
    }
    dispatch(
      createReview({ rating: userRating, comment: userComment, productId: id })
    );
  };

  useEffect(() => {
    if (reviewSuccess) {
      toast.success("Review Submitted Successfully");
      dispatch(removeSuccess());
      setUserRating(0);
      setUserComment("");
      dispatch(fetchSingleProduct(id));
    }
  }, [dispatch, reviewSuccess, id]);

  return (
    <>
      <PageTitle title={"Product Details"} />
      <Navbar />
      {loading ? (
        <Loader />
      ) : (
        <>
          <div className="product-detail-container">
            <div className="product-detail-image">
              <img src={productImage} alt="img" className="product-image" />
              <div className="related-images-container">
                {singleProduct.product?.image.map((img, ind) => (
                  <img
                    key={ind}
                    src={img?.url}
                    alt={`image ${ind}`}
                    className="related-images"
                    onClick={() => setProductImage(img?.url)}
                  />
                ))}
              </div>
            </div>

            <div className="product-detail-info">
              <h2 className="product-detail-heading">{name}</h2>
              <p className="product-detail-description">{description}</p>
              <h4 className="product-detail-price">Price: {price}/-</h4>
              <Rating
                value={rating}
                onRatingChange={handleRatingChange}
                disable={true}
              />
              <p className="product-detail-reviews">
                ({`${numOfReviews} Reviews`})
              </p>
              <h4
                className={stock > 0 ? `product-detail-stock` : `out-of-stock`}
              >
                {stock > 0 ? ` In Stock: (${stock} available)` : `Out of Stock`}
              </h4>
              {stock > 0 ? (
                <>
                  <label htmlFor="quantity">Quantity: </label>
                  <button
                    className="product-detail-btn"
                    onClick={increaseQuentity}
                  >
                    +
                  </button>
                  <input
                    type="text"
                    value={quantity}
                    readOnly
                    className="product-detail-input"
                  />
                  <button
                    className="product-detail-btn"
                    onClick={decreaseQuentity}
                  >
                    -
                  </button>
                  <div>
                    <button
                      className="product-detail-cart-btn"
                      onClick={addItem}
                      disabled={cartLoading}
                    >
                      {cartLoading ? "Adding" : "Add to Cart"}
                    </button>
                  </div>
                </>
              ) : (
                ""
              )}

              <h2 className="review-heading">Write a Review</h2>

              <Rating
                value={userRating}
                onRatingChange={handleRatingChange}
                disable={false}
              />

              <textarea
                name="review"
                placeholder="write your review here"
                value={userComment}
                onChange={(e) => setUserComment(e.target.value)}
              ></textarea>
              <div>
                <button
                  type="submit"
                  className="submit-review-btn"
                  onClick={handleSubmit}
                >
                  Submit Review
                </button>
              </div>
            </div>
          </div>

          <div className="reviews-container">
            <h3 className="costomer-reviews-heading">Customer Reviews</h3>

            {reviews?.length < 1 ? (
              "Not review yet"
            ) : (
              <>
                {reviews?.map((review) => (
                  <div className="user" key={review._id}>
                    <h5 className="use-name">{review.name}</h5>
                    <Rating
                      value={review.rating}
                      onRatingChange={handleRatingChange}
                      disable={true}
                    />
                    <div className="user-comment">{review.comment}</div>
                  </div>
                ))}
              </>
            )}
          </div>
        </>
      )}

      <Footer />
    </>
  );
};

export default ProductDetails;
