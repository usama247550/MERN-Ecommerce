import React, { useEffect, useState } from "react";
import { FaMinus, FaPlus, FaTrash } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { addItemToCart, removeItem } from "../features/cart/cartSlice";
import { removeError, removeMessage } from "../features/cart/cartSlice";

const CartItems = ({ item }) => {
  const [quantity, setQuantity] = useState(item.quantity);
  const { loading, success, message, error } = useSelector(
    (state) => state.cart
  );

  const dispatch = useDispatch();

  const increaseQuentity = () => {
    if (quantity >= item.stock) {
      toast.error("cannot exceed available quantity ");
      dispatch(removeError());
      return;
    }
    setQuantity((preQuantity) => preQuantity + 1);
  };

  const decreaseQuentity = () => {
    if (quantity <= 1) {
      toast.error("Quantity cannot be less then 1 ");
      dispatch(removeError());
      return;
    }
    setQuantity((preQuantity) => preQuantity - 1);
  };

  useEffect(() => {
    if (error) {
      toast.error(error.message);
      dispatch(removeError());
    }
  }, [dispatch, error]);

  useEffect(() => {
    if (success) {
      toast.success(message, { toastId: "cart" });
      dispatch(removeMessage());
    }
  }, [dispatch, success, message]);

  const updateQuantity = () => {
    if (loading) return;
    if (item.quantity !== quantity) {
      dispatch(addItemToCart({ id: item.productId, quantity }));
    }
  };

  const removeItemFromCart = () => {
    if (loading) return;
    dispatch(removeItem({ id: item.productId }));
    toast.success("Item remove from cart");
  };
  return (
    <>
      <tr key={item.id}>
        <td>
          <div className="product-info">
            <img src={item.image} alt={item.name} />
            <div className="product-details">
              <h3>{item.name}</h3>
              <p>Price: Rs {item.price.toFixed(2)}</p>
              <p> Quantity: {item.quantity}</p>
            </div>
          </div>
        </td>

        <td>
          <div className="quantity-controls">
            <button onClick={decreaseQuentity}>
              <FaMinus size={8} />
            </button>
            <span>{quantity}</span>
            <button onClick={increaseQuentity}>
              <FaPlus size={8} />
            </button>
          </div>
        </td>

        <td>
          <strong>Rs {item.price * item.quantity}/-</strong>
        </td>

        <td>
          <div className="action-buttons">
            <button
              className="update-btn"
              onClick={updateQuantity}
              disabled={loading || quantity === item.quantity}
            >
              Update
            </button>
            <button className="remove-btn" onClick={removeItemFromCart}>
              <FaTrash size={12} /> Remove
            </button>
          </div>
        </td>
      </tr>
    </>
  );
};

export default CartItems;
