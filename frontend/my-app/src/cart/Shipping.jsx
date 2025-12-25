import React, { useState } from "react";
import ShippingPath from "./ShippingPath";
import "../css/Shipping.css";
import { useDispatch } from "react-redux";
import { shippingInfo } from "../features/cart/cartSlice";
import { useNavigate } from "react-router-dom";
import Navbar from "../component/Navbar";
import Footer from "../component/Footer";

const Shipping = () => {
  const [shippinInfo, setShippingInfo] = useState({
    address: "",
    pinCode: "",
    number: "",
    country: "",
    state: "",
    city: "",
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { address, pinCode, number, country, state, city } = shippinInfo;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setShippingInfo({
      ...shippinInfo,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(shippingInfo({ address, pinCode, number, country, state, city }));
    navigate("/order/confirm");
    setShippingInfo({
      address: "",
      pinCode: "",
      number: "",
      country: "",
      state: "",
      city: "",
    });
  };
  return (
    <>
      <Navbar />
      <ShippingPath currentStep={1} />
      <div className="shipping-container">
        <div className="shipping-info">
          <h2 className="shipping-title">Shipping Details</h2>
          <form className="shipping-form" onSubmit={handleSubmit}>
            <div className="form-grid">
              <div className="form-column">
                <div className="form-group">
                  <label htmlFor="address">Address</label>
                  <input
                    type="text"
                    id="address"
                    placeholder="Enter your address"
                    required
                    name="address"
                    value={address}
                    onChange={handleChange}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="pincode">Pin Code</label>
                  <input
                    type="number"
                    id="pincode"
                    placeholder="Enter your postal code"
                    required
                    name="pinCode"
                    value={pinCode}
                    onChange={handleChange}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="phoneNumber">Phone Number</label>
                  <input
                    type="number"
                    id="phoneNumber"
                    placeholder="Enter your phone number"
                    required
                    name="number"
                    value={number}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="form-column">
                <div className="form-group">
                  <label htmlFor="country">Country</label>
                  <input
                    type="text"
                    id="country"
                    placeholder="Enter your country name"
                    required
                    name="country"
                    value={country}
                    onChange={handleChange}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="state">State</label>
                  <input
                    type="text"
                    id="state"
                    placeholder="Enter your state name"
                    required
                    name="state"
                    value={state}
                    onChange={handleChange}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="city">City</label>
                  <input
                    type="text"
                    id="city"
                    placeholder="Enter your city name"
                    required
                    name="city"
                    value={city}
                    onChange={handleChange}
                  />
                </div>
              </div>
            </div>

            <div className="btn-row">
              <button type="submit" className="continue-btn">
                Continue
              </button>
            </div>
          </form>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Shipping;
