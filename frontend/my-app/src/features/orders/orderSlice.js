import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const createOrder = createAsyncThunk(
  "order/createOrder",
  async (order, { rejectWithValue }) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const { data } = await axios.post("/api/v1/createOrder", order, config);
      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "failed createing order");
    }
  }
);
export const getOrder = createAsyncThunk(
  "order/getOrder",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axios.get("/api/v1/myOrders");
      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "failed to fetch orders");
    }
  }
);
export const orderDetail = createAsyncThunk(
  "order/orderDetail",
  async (id, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(`/api/v1/order/${id}`);
      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "failed to fetch order");
    }
  }
);
const initialState = {
  loading: false,
  orders: [],
  order: {},
  error: null,
  success: false,
};
const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    removeError(state) {
      state.error = null;
    },
    removeSuccess(state) {
      state.success = false;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(createOrder.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createOrder.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.order = action.payload?.order;
        state.success = action.payload.success;
      })
      .addCase(createOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message || "Order creating failed ";
      });

    builder
      .addCase(getOrder.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getOrder.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = action.payload?.orders;
        state.success = action.payload.success;
      })
      .addCase(getOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message || "failed to fetch orders ";
      });

    builder
      .addCase(orderDetail.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(orderDetail.fulfilled, (state, action) => {
        state.loading = false;
        state.order = action.payload?.order;
        state.success = action.payload.success;
      })
      .addCase(orderDetail.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message || "failed to fetch orders ";
      });
  },
});

export default orderSlice.reducer;
export const { removeError, removeSuccess } = orderSlice.actions;
