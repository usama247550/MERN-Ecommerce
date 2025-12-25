import React from "react";
import { MdLocalShipping } from "react-icons/md";
import { GiConfirmed } from "react-icons/gi";
import { BsBank2 } from "react-icons/bs";
import "../css/ShippingPath.css";

const ShippingPath = ({ currentStep }) => {
  const ShippingPathArr = [
    { name: "Shipping", icon: <MdLocalShipping /> },
    { name: "Confirm Order", icon: <GiConfirmed /> },
    { name: "Payment", icon: <BsBank2 /> },
  ];

  return (
    <div className="shipping-path-container">
      {ShippingPathArr.map((value, index) => (
        <div
          key={index}
          className={`shipping-path ${
            index + 1 <= currentStep ? "active" : ""
          }`}
        >
          <div className="path-icon">{value.icon}</div>
          <p className="path-name">{value.name}</p>
          {index !== ShippingPathArr.length - 1 && (
            <span
              className={`${
                index + 1 <= currentStep ? "path-line active" : " path-line"
              }`}
            ></span>
          )}
        </div>
      ))}
    </div>
  );
};

export default ShippingPath;
