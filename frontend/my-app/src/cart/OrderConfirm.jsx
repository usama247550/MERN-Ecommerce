import React from "react";
import ShippingPath from "./ShippingPath";
import "../css/OrderConfirm.css";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Navbar from "../component/Navbar";
import Footer from "../component/Footer";
import PageTitle from "../component/PageTitle";

const OrderConfirm = () => {
  const navigate = useNavigate();
  const { shippingDetails, cartItems } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.user);

  const subtotal = cartItems.reduce((acc, items) => {
    return acc + items.price * items.quantity;
  }, 0);

  const tax = subtotal * 0.05;
  const shipping = subtotal < 1000 ? 0 : 500;
  const total = subtotal + tax + shipping;

  const handleProceed = () => {
    const data = {
      subtotal,
      tax,
      shipping,
      total,
    };
    sessionStorage.setItem("payment", JSON.stringify(data));

    navigate("/payment");
  };

  return (
    <>
      <Navbar />
      <ShippingPath currentStep={2} />
      <div className="order-confirm-container">
        <div className="shipping-details">
          <h3>Shipping Details</h3>
          <table className="shipping-table">
            <tbody>
              <tr>
                <td>
                  <strong>Name:</strong>
                </td>
                <td>{user.name}</td>
              </tr>
              <tr>
                <td>
                  <strong>Phone:</strong>
                </td>
                <td>{shippingDetails.number}</td>
              </tr>
              <tr>
                <td>
                  <strong>Address:</strong>
                </td>
                <td>
                  <address style={{ whiteSpace: "pre-line" }}>
                    {`${shippingDetails.address}, 
                    ${shippingDetails.state}, ${shippingDetails.country}`}
                  </address>
                </td>
                <td></td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="cart-items-section">
          <h3>Your Cart Items</h3>
          <table className="cart-table">
            <thead>
              <tr>
                <th>Image</th>
                <th>Product</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
              {cartItems.map((item) => (
                <tr key={item.productId}>
                  <td>
                    <img
                      src={item.image}
                      alt={item.name}
                      className="cart-img"
                    />
                  </td>
                  <td>{item.name}</td>
                  <td>Rs {item.price}/-</td>
                  <td>{item.quantity}</td>
                  <td>Rs {item.price * item.quantity}/-</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="order-summary">
          <h3>Order Summary</h3>
          <table className="summary-table">
            <tbody>
              <tr>
                <th>Subtotal:</th>
                <td>Rs {subtotal.toFixed(2)}</td>
              </tr>
              <tr>
                <th>Shipping Charges:</th>
                <td>{shipping === 0 ? "Free" : `Rs ${shipping.toFixed(2)}`}</td>
              </tr>
              <tr>
                <th>GST (5%):</th>
                <td>Rs {tax.toFixed(2)}</td>
              </tr>
              <tr className="total-row">
                <td>
                  <strong>Total:</strong>
                </td>
                <td>
                  <strong>Rs {total.toFixed(2)}</strong>
                </td>
              </tr>
            </tbody>
          </table>
          <button className="proceed-btn" onClick={handleProceed}>
            Proceed to Payment
          </button>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default OrderConfirm;
