import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { CiSearch } from "react-icons/ci";
import { BsCart3 } from "react-icons/bs";
import { MdMenu } from "react-icons/md";
import { IoPersonAddOutline, IoClose } from "react-icons/io5";
import "../css/Navbar.css";
import { useSelector } from "react-redux";
import UserDashboard from "../user/UserDashboard";

const Navbar = () => {
  const { cartItems } = useSelector((state) => state.cart);
  const { isAuthenticated, user } = useSelector((state) => state.user);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/products?keyword=${encodeURIComponent(searchQuery.trim())}`);
    } else {
      navigate("/products");
    }
    setSearchQuery("");
  };

  return (
    <>
      <nav className="navbar">
        <div className="navbar-container">
          <div className="navbar-logo">
            <Link to="/">ShopEasy</Link>
          </div>

          <div className={`navbar-links ${isMenuOpen ? "active" : ""} `}>
            <ul>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/products">Products</Link>
              </li>
              <li>
                <Link to="/about-us">About Us</Link>
              </li>
              <li>
                <Link to="/contact-Us">Contact-Us</Link>
              </li>
            </ul>
          </div>

          <div className="navbar-icons">
            <div className="search-container">
              <form className="search-form" onSubmit={handleSubmit}>
                <input
                  type="text"
                  placeholder="Search products.."
                  className="search-input"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <button
                  type="submit"
                  className="search-btn"
                  aria-label="Search"
                >
                  <CiSearch className="search-icon" />
                </button>
              </form>
            </div>

            <div className="cart-container">
              <Link to="/cart">
                <BsCart3 className="cart-icon" />
                {cartItems.length <= 0 ? (
                  ""
                ) : (
                  <span className="cart-badge">{cartItems.length}</span>
                )}
              </Link>
            </div>
            {!isAuthenticated ? (
              <Link to="/register" className="register-link">
                <IoPersonAddOutline className="register-icon" />
              </Link>
            ) : (
              <UserDashboard user={user} />
            )}

            <div className="navbar-hamburger" onClick={toggleMenu}>
              {isMenuOpen ? (
                <IoClose className="hamburger-icon" />
              ) : (
                <MdMenu className="menu-icon" />
              )}
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
