import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const addItemToCart = createAsyncThunk(
  "cart/addItemToCart",
  async ({ id, quantity }, { rejectWithValue }) => {
    try {
      const link = `/api/v1/singleProduct/${id}`;
      const { data } = await axios.get(link);

      return {
        productId: data.product._id,
        name: data.product.name,
        price: data.product.price,
        image: data.product.image[0].url,
        stock: data.product.stock,
        quantity,
      };
    } catch (error) {
      return rejectWithValue(error.response.data || "An error occurred");
    }
  }
);

const initialState = {
  loading: false,
  cartItems: JSON.parse(localStorage.getItem("cartItems")) || [],
  error: null,
  success: false,
  message: null,
  shippingDetails: JSON.parse(localStorage.getItem("shippingDetails")) || {},
};
const cartSlice = createSlice({
  name: "cart",
  initialState,

  reducers: {
    removeError(state) {
      state.error = null;
    },

    removeMessage(state) {
      state.message = null;
    },

    removeItem(state, action) {
      state.cartItems = state.cartItems.filter(
        (items) => items.productId !== action.payload.id
      );
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },

    shippingInfo(state, action) {
      state.shippingDetails = action.payload;
      localStorage.setItem(
        "shippingDetails",
        JSON.stringify(state.shippingDetails)
      );
    },
    clearCart(state) {
      state.cartItems = [];
      localStorage.removeItem("cartItems");
      localStorage.removeItem("shippingDetails");
    },
  },

  extraReducers(builder) {
    builder
      .addCase(addItemToCart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addItemToCart.fulfilled, (state, action) => {
        state.loading = false;
        const item = action.payload;
        const itemExist = state.cartItems.find(
          (items) => items.productId === item.productId
        );
        if (itemExist) {
          itemExist.quantity = item.quantity;
          state.message = `Update ${item.name} quantity in the cart`;
        } else {
          state.cartItems.push(item);
          state.message = `${item.name} is added to cart`;
        }
        localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
        state.error = null;
        state.success = true;
      })
      .addCase(addItemToCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message || "An error occurred";
      });
  },
});

export default cartSlice.reducer;
export const {
  removeError,
  removeMessage,
  removeItem,
  shippingInfo,
  clearCart,
} = cartSlice.actions;
