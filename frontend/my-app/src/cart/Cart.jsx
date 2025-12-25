import React from "react";
import "../css/Cart.css";
import Navbar from "../component/Navbar";
import Footer from "../component/Footer";
import CartItems from "./CartItems";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import Loader from "../component/Loader";
import PageTitle from "../component/PageTitle";
const Cart = () => {
  const { cartItems, loading } = useSelector((state) => state.cart);
  const { isAuthenticated } = useSelector((state) => state.user);
  const navigate = useNavigate();

  const subtotal = cartItems.reduce((acc, items) => {
    return acc + items.price * items.quantity;
  }, 0);
  const tax = subtotal * 0.05;
  const shipping = subtotal < 1000 ? 0 : 500;
  const total = subtotal + tax + shipping;

  const goToCheckout = () => {
    if (isAuthenticated) {
      navigate("/shipping");
    } else {
      navigate(`/login?redirect=/shipping`);
    }
  };
  return (
    <>
      <PageTitle title="Cart" />
      <Navbar />
      {loading ? (
        <Loader />
      ) : (
        <>
          {cartItems.length === 0 ? (
            <div className="empty-cart">
              <h2>Your cart is empty</h2>
              <Link className="empty-cart-link" to="/products">
                View products
              </Link>
            </div>
          ) : (
            <div className="item-cart-container">
              <h1 className="cart-heading">Your Cart</h1>

              <div className="cart-flex">
                <div className="cart-table">
                  <table>
                    <thead>
                      <tr>
                        <th>Product</th>
                        <th>Quantity</th>
                        <th>Total</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {cartItems &&
                        cartItems.map((item) => (
                          <CartItems item={item} key={item.name} />
                        ))}
                    </tbody>
                  </table>
                </div>

                <div className="price-summary">
                  <h2>Price Summary</h2>
                  <div className="summary-row">
                    <span>Subtotal</span>
                    <span>Rs {subtotal.toFixed(2)}</span>
                  </div>
                  <div className="summary-row">
                    <span>Tax (5%)</span>
                    <span>Rs {tax.toFixed(2)}</span>
                  </div>
                  <div className="summary-row">
                    <span>Shipping</span>
                    <span>{`${
                      shipping === 0 ? "Free" : `Rs ${shipping.toFixed(2)}`
                    }`}</span>
                  </div>
                  <hr />
                  <div className="summary-row total">
                    <span>Total</span>
                    <span>Rs {total.toFixed(2)}</span>
                  </div>
                  <button className="proceed-btn" onClick={goToCheckout}>
                    Proceed to Checkout
                  </button>
                </div>
              </div>
            </div>
          )}
        </>
      )}

      <Footer />
    </>
  );
};

export default Cart;
