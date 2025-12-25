import React, { useEffect, useState } from "react";
import "../css/styleAdmin/AdminDashboard.css";
import { MdDashboard } from "react-icons/md";
import { MdOutlineProductionQuantityLimits } from "react-icons/md";
import { MdAddBox } from "react-icons/md";
import { HiUsers } from "react-icons/hi2";
import { FaShoppingCart } from "react-icons/fa";
import { FaStar } from "react-icons/fa";
import { FaCoins } from "react-icons/fa6";
import { FaCircleExclamation } from "react-icons/fa6";
import { FaCheckCircle } from "react-icons/fa";
import Navbar from "../component/Navbar";
import Footer from "../component/Footer";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  adminProducts,
  getAllOrders,
  getAllUsers,
} from "../features/admin/adminSlice";
import PageTitle from "../component/PageTitle";

const AdminDashboard = () => {
  const { products, orders, users, totalAmount } = useSelector(
    (state) => state.admin
  );

  const totalProducts = products.length;
  const totalOrders = orders.length;
  const totalUsers = users.length;
  const outOfStock = products.filter((p) => p.stock === 0).length;
  const inStock = products.filter((p) => p.stock > 0).length;
  const totalReviews = products.reduce(
    (acc, product) => acc + product.reviews.length || 0,
    0
  );

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(adminProducts());
    dispatch(getAllOrders());
    dispatch(getAllUsers());
  }, [dispatch]);

  return (
    <>
      <Navbar />
      <PageTitle title="Admin Dashboard" />

      <div className="dashboard-container">
        <aside className="sidebar">
          <h2>
            <MdDashboard />
            Admin Panel
          </h2>
          <p>products</p>
          <Link to={"/ProductList"} className="sidebar-menu">
            <MdOutlineProductionQuantityLimits /> All products
          </Link>

          <p>create products</p>
          <Link to={"/CreateProduct"} className="sidebar-menu">
            <MdAddBox /> create products
          </Link>

          <p>Users</p>
          <Link to={"/userList"} className="sidebar-menu">
            <HiUsers /> all User
          </Link>

          <p>orders</p>
          <Link to={"/admin/orders"} className="sidebar-menu">
            <FaShoppingCart /> all orders
          </Link>

          <p>Reviews</p>
          <Link to={"/admin/productReview"} className="sidebar-menu">
            <FaStar /> all reviews
          </Link>
        </aside>

        <main className="main-content">
          <section className="cards-section">
            <div className="card">
              <HiUsers className="item-icon" />
              <h3>Total Product</h3>
              <p>{totalProducts}</p>
            </div>
            <div className="card">
              <FaShoppingCart className="item-icon" />
              <h3>Total Orders</h3>
              <p>{totalOrders}</p>
            </div>
            <div className="card">
              <FaStar className="item-icon" />
              <h3>Total Reviews</h3>
              <p>{totalReviews}</p>
            </div>
            <div className="card">
              <FaCoins className="item-icon" />
              <h3>Total Revenue</h3>
              <p>{totalAmount}</p>
            </div>
            <div className="card">
              <FaCircleExclamation className="item-icon" />
              <h3>out of stock</h3>
              <p>{outOfStock}</p>
            </div>
            <div className="card">
              <FaCheckCircle className="item-icon" />
              <h3>in stock</h3>
              <p>{inStock}</p>
            </div>
            <div className="card">
              <HiUsers className="item-icon" />
              <h3>Total Users</h3>
              <p>{totalUsers}</p>
            </div>
          </section>
        </main>
      </div>
      <Footer />
    </>
  );
};

export default AdminDashboard;
