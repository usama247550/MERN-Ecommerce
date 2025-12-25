import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import Navbar from "../component/Navbar";
import Footer from "../component/Footer";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { createOrder } from "../features/orders/orderSlice";
import { removeError, removeSuccess } from "../features/orders/orderSlice.js";
import { clearCart } from "../features/cart/cartSlice.js";
import Loader from "../component/Loader";
import { toast } from "react-toastify";

const Success = () => {
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get("session_id");
  const { cartItems, shippingDetails } = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const { loading, success, error } = useSelector((state) => state.order);

  useEffect(() => {
    const payment = JSON.parse(sessionStorage.getItem("payment"));
    if (!payment) return;
    const createOrderData = () => {
      try {
        const orderData = {
          shippingDetails: {
            country: shippingDetails.country,
            state: shippingDetails.state,
            city: shippingDetails.city,
            address: shippingDetails.address,
            number: shippingDetails.number,
            pinCode: shippingDetails.pinCode,
          },
          orderItems: cartItems.map((item) => ({
            name: item.name,
            price: item.price,
            quantity: item.quantity,
            image: item.image,
            product: item.productId,
          })),
          paymentInfo: {
            id: sessionId,
            status: "Paid",
          },
          itemsPrice: payment.subtotal,
          taxPrice: payment.tax,
          shippingPrice: payment.shipping,
          totalPrice: payment.total,
        };
        dispatch(createOrder(orderData));
      } catch (error) {
        console.log(error);
      }
    };

    createOrderData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (success) {
      toast.success("Order placed");
      dispatch(removeSuccess());
      dispatch(clearCart());
      sessionStorage.removeItem("payment");
    }
  }, [dispatch, success]);

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(removeError());
    }
  }, [dispatch, error]);

  return loading ? (
    <Loader />
  ) : (
    <>
      <Navbar />
      <div
        className="success-container"
        style={{
          display: "flax",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          marginTop: "25vh",
          marginBottom: "25vh",
          position: "relative",
        }}
      >
        <h2 style={{ color: "green" }}> Payment Successful!</h2>
        <p>Your order has been placed successfully.</p>
        <Link
          to="/user/order"
          className="go-home-btn"
          style={{
            textDecoration: "none",
            color: "white",
            background: "black",
            padding: "7px 10px",
            borderRadius: "10px",
            position: "absolute",
            top: "12vh",
            left: "45vw",
          }}
        >
          View orders
        </Link>
      </div>
      <Footer />
    </>
  );
};

export default Success;
