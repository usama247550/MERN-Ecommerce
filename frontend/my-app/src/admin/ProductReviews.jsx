import React, { useEffect, useState } from "react";
import "../css/styleAdmin/ProductReviews.css";
import Navbar from "../component/Navbar";
import Footer from "../component/Footer";
import { useDispatch, useSelector } from "react-redux";
import {
  adminProducts,
  deleteProdcutReviews,
  getProdcutReviews,
  removeError,
  removeSuccess,
} from "../features/admin/adminSlice";
import PageTitle from "../component/PageTitle";

const ProductReviews = () => {
  const [selectedProductId, setSelectedProductId] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState([]);
  const { loading, error, reviews, products, success } = useSelector(
    (state) => state.admin
  );

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(adminProducts());

    if (error) {
      dispatch(removeError());
    }
  }, [dispatch, error]);

  const viewReviews = (id) => {
    if (id) {
      setSelectedProductId(id);
      dispatch(getProdcutReviews(id));
    }
  };

  useEffect(() => {
    setSelectedProduct(reviews);
  }, [reviews]);

  const deleteReview = (id) => {
    dispatch(
      deleteProdcutReviews({ productId: selectedProductId, reviewId: id })
    );
    dispatch(adminProducts());
  };

  useEffect(() => {
    if (success && selectedProductId) {
      dispatch(removeSuccess());
      dispatch(getProdcutReviews(selectedProductId));
    }

    if (error) {
      dispatch(removeError());
    }
  }, [dispatch, success, error, selectedProductId]);

  return (
    <>
      <PageTitle title="Product Reviews" />
      <Navbar />
      <div className="apr-container">
        <h1 className="apr-heading">Product Reviews Management</h1>
        <div className="apr-card">
          <h2 className="apr-subheading">All Products</h2>
          <div className="apr-table-wrap">
            <table className="apr-table">
              <thead>
                <tr>
                  <th>Sr No</th>
                  <th>Product Name</th>
                  <th>Image</th>
                  <th>Reviews</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {products.map((p, idx) => (
                  <tr key={p._id}>
                    <td>{idx + 1}</td>
                    <td>{p.name}</td>
                    <td>
                      <div className="apr-img-placeholder">
                        <img
                          src={p.image[0].url}
                          alt={p.name}
                          className="review-image"
                        />
                      </div>
                    </td>
                    <td>{p.numOfReviews}</td>
                    <td>
                      <button
                        className="apr-btn"
                        onClick={() => viewReviews(p._id)}
                      >
                        View Reviews
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <div className="apr-reviews-header">
          <h2>Reviews for Product</h2>
        </div>
        <div className="apr-card">
          {selectedProductId ? (
            <>
              <div className="apr-selected-product">
                Selected:
                {products.find((p) => p._id === selectedProductId)?.name}
              </div>
              <div className="apr-table-wrap">
                <table className="apr-table">
                  <thead>
                    <tr>
                      <th>Sr No</th>
                      <th>Reviewer Name</th>
                      <th>Rating</th>
                      <th>Comment</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {selectedProduct.length === 0 ? (
                      <tr>
                        <td colSpan={5} className="apr-empty">
                          No reviews found
                        </td>
                      </tr>
                    ) : (
                      selectedProduct.map((r, idx) => (
                        <tr key={r._id}>
                          <td>{idx + 1}</td>
                          <td>{r.name}</td>
                          <td>{r.rating}</td>
                          <td>{r.comment}</td>
                          <td>
                            <button
                              className="apr-btn apr-btn-danger"
                              onClick={() => deleteReview(r._id)}
                            >
                              Delete
                            </button>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </>
          ) : (
            <div className="apr-no-selection">
              Select a product to view reviews
            </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};
export default ProductReviews;
