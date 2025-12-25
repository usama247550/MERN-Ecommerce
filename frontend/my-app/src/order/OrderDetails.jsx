import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { orderDetail } from "../features/orders/orderSlice";
import { useParams } from "react-router-dom";
import Loader from "../component/Loader";
import { toast } from "react-toastify";
import { removeError, removeSuccess } from "../features/orders/orderSlice.js";
import Navbar from "../component/Navbar";
import Footer from "../component/Footer";
import PageTitle from "../component/PageTitle.jsx";

const OrderDetails = () => {
  const { loading, error, success, order } = useSelector(
    (state) => state.order
  );

  const dispatch = useDispatch();
  const { id } = useParams();

  useEffect(() => {
    dispatch(orderDetail(id));
  }, [dispatch, id]);

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
      <PageTitle title="Order Details" />

      <div className="order-confirm-container">
        <div className="shipping-details">
          <h3>Shipping Details</h3>
          <table className="shipping-table">
            <tbody>
              <tr>
                <td>
                  <strong>Phone:</strong>
                </td>
                <td>{order.shippingDetails?.number}</td>
              </tr>
              <tr>
                <td>
                  <strong>Address:</strong>
                </td>
                <td>
                  <address>
                    {`${order.shippingDetails?.address}, ${order.shippingDetails?.state}, ${order.shippingDetails?.country}`}
                  </address>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="cart-items-section">
          <h3>Your Cart Items</h3>
          <table className="cart-table">
            <thead>
              <tr>
                <th>Image</th>
                <th>Product</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
              {order.orderItems?.map((item) => (
                <tr key={item.productId}>
                  <td>
                    <img
                      src={item.image}
                      alt={item.name}
                      className="cart-img"
                    />
                  </td>
                  <td>{item.name}</td>
                  <td>Rs {item.price}/-</td>
                  <td>{item.quantity}</td>
                  <td>Rs {item.price * item.quantity}/-</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="order-summary">
          <h3>Order Summary</h3>
          <table className="summary-table">
            <tbody>
              <tr>
                <th>Order status:</th>
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
              </tr>
              <tr>
                <th>Payment:</th>
                <td>
                  <span
                    className={`status ${
                      order.paymentInfo?.status === "Paid" ? "paid" : "not-paid"
                    }`}
                  >
                    {order?.paymentInfo?.status}
                  </span>
                </td>
              </tr>
              <tr>
                <th>Paid At:</th>
                <td>{order?.paidAt?.substring(0, 10)}</td>
              </tr>
              <tr>
                <th>Subtotal:</th>
                <td>Rs {order?.itemsPrice}/-</td>
              </tr>
              <tr>
                <th>Shipping Charges:</th>
                <td>
                  {order.shipping === 0 ? "Free" : `Rs ${order.shippingPrice}`}
                </td>
              </tr>
              <tr>
                <th>GST (5%):</th>
                <td>Rs {order.taxPrice}</td>
              </tr>
              <tr className="total-row">
                <td>
                  <strong>Total:</strong>
                </td>
                <td>
                  <strong>Rs {order.totalPrice}/-</strong>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default OrderDetails;
