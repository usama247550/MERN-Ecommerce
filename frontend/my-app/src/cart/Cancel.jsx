import React from "react";
import { Link } from "react-router-dom";
import Navbar from "../component/Navbar";
import Footer from "../component/Footer";

const Cancel = () => {
  return (
    <>
      <Navbar />
      <div
        className="cancel-container"
        style={{ textAlign: "center", marginTop: "25vh", marginBottom: "25vh" }}
      >
        <h2 style={{ color: "red" }}> Payment Cancelled</h2>
        <p>Your payment was not completed. Please try again.</p>
        <Link
          to="/payment"
          className="retry-btn"
          style={{
            textDecoration: "none",
            color: "black",
          }}
        >
          Try Again
        </Link>
      </div>
      <Footer />
    </>
  );
};

export default Cancel;
