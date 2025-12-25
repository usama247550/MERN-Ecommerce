import React from "react";
import {
  FaPhoneAlt,
  FaGithub,
  FaLinkedin,
  FaInstagramSquare,
  FaYoutube,
} from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import "../css/Footer.css";

const Footer = () => {
  return (
    <>
      <footer className="footer">
        <div className="footer-container">
          <div className="footer-section-contact">
            <h2>Contact Us</h2>
            <p>
              <FaPhoneAlt />
              Phone: +92123456789
            </p>
            <p>
              <MdEmail />
              Email: Example@gmail.com
            </p>
          </div>
          <div className="footer-section-icon">
            <h2>Follow me</h2>
            <span>
              <FaGithub />
            </span>
            <span>
              <FaLinkedin />
            </span>
            <span>
              <FaYoutube />
            </span>
            <span>
              <FaInstagramSquare />
            </span>
          </div>
          <div className="footer-section-about">
            <h2>About</h2>
            <p>
              We are a leading e-commerce store providing top quality products
              at affordable prices. Our mission is to deliver convenience,
              trust, and satisfaction to our customers worldwide.
            </p>
          </div>
        </div>
        <div className="footer-bottom">
          <p> &copy; 2025 MyEcommerce. All rights reserved.</p>
        </div>
      </footer>
    </>
  );
};

export default Footer;
