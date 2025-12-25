import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { MdModeEditOutline, MdDelete } from "react-icons/md";
import { Link } from "react-router-dom";
import {
  deleteOrder,
  getAllOrders,
  removeError,
  removeMessage,
  removeSuccess,
} from "../features/admin/adminSlice";
import Loader from "../component/Loader";
import Navbar from "../component/Navbar";
import Footer from "../component/Footer";
import { toast } from "react-toastify";
import PageTitle from "../component/PageTitle";

const Orders = () => {
  const dispatch = useDispatch();
  const { orders, loading, error, success, message } = useSelector(
    (state) => state.admin
  );

  useEffect(() => {
    dispatch(getAllOrders());
  }, [dispatch]);

  const removeOrder = (id) => {
    const confirm = window.confirm(
      "Are you sure you want to delete this order"
    );
    if (confirm) {
      dispatch(deleteOrder(id));
    }
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(removeError());
    }

    if (message) {
      toast.success(message);
      dispatch(removeMessage());
      dispatch(getAllOrders());
    }
  }, [error, message, dispatch]);

  return (
    <>
      <Navbar />
      {loading ? (
        <Loader />
      ) : (
        <>
          <PageTitle title="Orders" />
          <div className="productListContainer">
            <h2 className="productListHeading">All Order</h2>

            <table className="productTable">
              <thead>
                <tr>
                  <th>Sr No</th>
                  <th>OrderID</th>
                  <th>Status</th>
                  <th>Price</th>
                  <th>NumberOfItems</th>
                  <th>Action</th>
                </tr>
              </thead>

              <tbody>
                {orders.map((order, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{order._id}</td>
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
                        {order?.orderStatus}
                      </span>
                    </td>
                    <td>{order.totalPrice}</td>
                    <td>{order.orderItems?.length}</td>
                    <td>
                      <Link
                        to={`/admin/updateOrder/${order._id}`}
                        className="editBtn"
                      >
                        <MdModeEditOutline />
                      </Link>
                      <button
                        className="deleteBtn"
                        onClick={() => removeOrder(order?._id)}
                      >
                        <MdDelete />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}

      <Footer />
    </>
  );
};

export default Orders;
