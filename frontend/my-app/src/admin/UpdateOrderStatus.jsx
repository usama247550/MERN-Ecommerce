import React from "react";
import Navbar from "../component/Navbar";
import Footer from "../component/Footer";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import { orderDetail } from "../features/orders/orderSlice";
import { useState } from "react";
import {
  removeError,
  removeMessage,
  updateOrderStatus,
} from "../features/admin/adminSlice";
import { toast } from "react-toastify";
import PageTitle from "../component/PageTitle";

const UpdateOrderStatus = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const { order } = useSelector((state) => state.order);
  const { error, message, loading } = useSelector((state) => state.admin);
  const [selectStatus, setSelectStatus] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      dispatch(orderDetail(id));
    }
  }, [dispatch, id]);

  const handleSubmit = () => {
    if (selectStatus) {
      dispatch(updateOrderStatus({ id, status: selectStatus }));
    }
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(removeError());
    }

    if (message) {
      dispatch(removeMessage());
      toast.success("Order status update success");
      navigate("/admin/orders");
    }
  }, [dispatch, error, message, navigate]);
  return (
    <>
      <Navbar />

      <PageTitle title="Update Order Status" />
      <div className="order-confirm-container">
        <div className="shipping-details">
          <h3>Order Information</h3>
          <hr />
          <table className="shipping-table">
            <tbody>
              <tr>
                <td>
                  <strong>order ID:</strong>
                </td>
                <td>{order._id}</td>
              </tr>

              <tr>
                <td>
                  <strong>Shipping Address:</strong>
                </td>
                <td>{order.shippingDetails?.address}</td>
              </tr>
              <tr>
                <td>
                  <strong>Phone:</strong>
                </td>
                <td>{order.shippingDetails?.number}</td>
              </tr>
              <tr>
                <td>
                  <strong>Order Status:</strong>
                </td>
                <td>{order.orderStatus}</td>
              </tr>
              <tr>
                <td>
                  <strong>Payment Status:</strong>
                </td>
                <td>{order.paymentInfo?.status}</td>
              </tr>
              <tr>
                <td>
                  <strong>Total Price:</strong>
                </td>
                <td>{order.totalPrice}</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="cart-items-section">
          <h3>Order Items</h3>
          <table className="cart-table">
            <thead>
              <tr>
                <th>Image</th>
                <th>Name</th>
                <th>Quantity</th>
                <th>Price</th>
              </tr>
            </thead>
            <tbody>
              {order.orderItems?.map((item, ind) => (
                <tr key={ind}>
                  <td>
                    <img
                      src={order.orderItems[0]?.image}
                      alt={item.name}
                      className="cart-img"
                    />
                  </td>
                  <td>{item.name}</td>
                  <td>{item.quantity}</td>
                  <td>{item?.price}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="order-summary">
          <h3>Update Order Status</h3>
          <div className="form-group">
            <select
              name="category"
              value={selectStatus}
              onChange={(e) => setSelectStatus(e.target.value)}
            >
              <option value="">Select Status</option>
              <option value="Shipped">Shipped</option>
              <option value="On The Way">On The Way</option>
              <option value="Delivered">Delivered</option>
            </select>
            <button
              type="submit"
              className="update-status"
              onClick={handleSubmit}
              disabled={loading}
            >
              {loading ? "Processing.." : "Update Status"}
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};
export default UpdateOrderStatus;
