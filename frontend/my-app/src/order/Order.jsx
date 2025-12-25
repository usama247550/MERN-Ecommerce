import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getOrder } from "../features/orders/orderSlice";
import Loader from "../component/Loader";
import { toast } from "react-toastify";
import { removeError, removeSuccess } from "../features/orders/orderSlice.js";
import { Link } from "react-router-dom";
import "../css/Order.css";
import { MdEditCalendar } from "react-icons/md";
import Navbar from "../component/Navbar";
import Footer from "../component/Footer";
import PageTitle from "../component/PageTitle.jsx";

const Order = () => {
  const { loading, error, success, orders } = useSelector(
    (state) => state.order
  );

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getOrder());
  }, [dispatch]);

  useEffect(() => {
    if (success) {
      dispatch(removeSuccess());
    }
  }, [dispatch, success]);

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(removeError());
    }
  }, [dispatch, error]);
  return (
    <>
      <Navbar />
      {loading ? (
        <Loader />
      ) : (
        <>
        <PageTitle title="My Orders"/>
          <div className="order-container">
            <h2 className="order-title">My Orders</h2>
            <table className="order-table">
              <thead>
                <tr>
                  <th>Order ID</th>
                  <th>Items</th>
                  <th>Status</th>
                  <th>Total Price</th>
                  <th>Action</th>
                </tr>
              </thead>

              <tbody>
                {orders && orders.length > 0 ? (
                  orders.map((order) => (
                    <tr key={order._id}>
                      <td>{order._id}</td>
                      <td>{order.orderItems?.length || 0}</td>
                      <td>
                        <span
                          className={`status ${
                            order.orderStatus === "Delivered"
                              ? "delivered"
                              : order.orderStatus === "Processing"
                              ? "processing"
                              : "pending"
                          }`}
                        >
                          {order.orderStatus}
                        </span>
                      </td>
                      <td>Rs {order.totalPrice?.toLocaleString()}/-</td>
                      <td>
                        <Link
                          to={`/orderDetails/${order._id}`}
                          className="view-btn"
                        >
                          <MdEditCalendar />
                        </Link>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className="no-orders">
                      No orders found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </>
      )}

      <Footer />
    </>
  );
};

export default Order;
