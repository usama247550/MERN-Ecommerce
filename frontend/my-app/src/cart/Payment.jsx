import React from "react";
import { Link } from "react-router-dom";
import ShippingPath from "./ShippingPath";
import "../css/Payment.css";
import Navbar from "../component/Navbar";
import Footer from "../component/Footer";
import axios from "axios";
import { toast } from "react-toastify";

const Payment = () => {
  const payment = JSON.parse(sessionStorage.getItem("payment"));

  const handlePayment = async () => {
    try {
      const product = {
        name: "Order Payment",
        price: payment.total,
      };

      const res = await axios.post(
        "/api/v1/create-payment-intent",
        { product },
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      if (res.data.sessionId) {
        sessionStorage.setItem("sessionId", res.data.sessionId);
      }
      if (res.data.url) {
        window.location.href = res.data.url;
      } else {
        alert("Payment failed to initialize.");
      }
    } catch (err) {
      console.error(err);
      toast.success("Something went wrong. Please try again.");
    }
  };

  return (
    <>
      <Navbar />
      <ShippingPath currentStep={3} />
      <div className="payment-container">
        <h2 className="payment-heading">Payment</h2>

        <div className="payment-summary">
          <p>Total Amount:</p>
          <span>Rs {payment.total}/-</span>
        </div>

        <div className="payment-buttons">
          <Link to="/order/confirm" className="go-back-btn">
            ← Go Back
          </Link>

          <button className="pay-now-btn" onClick={handlePayment}>
            Pay Now
          </button>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Payment;
