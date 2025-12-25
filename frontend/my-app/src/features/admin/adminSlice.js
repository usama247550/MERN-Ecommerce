import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

// fetch product
export const adminProducts = createAsyncThunk(
  "admin/adminProducts",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axios.get("/api/v1/admin/getAllProducts");
      return data;
    } catch (error) {
      return rejectWithValue(
        error.response.data || "error while fetching products"
      );
    }
  }
);

export const createProducts = createAsyncThunk(
  "admin/createProducts",
  async ({ productData }, { rejectWithValue }) => {
    try {
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };
      const { data } = await axios.post(
        "/api/v1/admin/createProduct",
        productData,
        config
      );
      return data;
    } catch (error) {
      return rejectWithValue(
        error.response.data || "error while createing product"
      );
    }
  }
);

export const updateProduct = createAsyncThunk(
  "admin/updateProduct",
  async ({ id, productData }, { rejectWithValue }) => {
    try {
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };
      const { data } = await axios.put(
        `/api/v1/admin/updateProduct/${id}`,
        productData,
        config
      );
      return data;
    } catch (error) {
      return rejectWithValue(
        error.response.data || "error while updating product"
      );
    }
  }
);

export const deleteProduct = createAsyncThunk(
  "admin/daleteProduct",
  async ({ id }, { rejectWithValue }) => {
    try {
      const { data } = await axios.delete(`/api/v1/admin/deleteProduct/${id}`);
      return { success: data.success, id };
    } catch (error) {
      return rejectWithValue(
        error.response.data || "error while deletion product"
      );
    }
  }
);

// fetch users
export const getAllUsers = createAsyncThunk(
  "admin/getAllUsers",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(`/api/v1/admin/allUsers`);
      return data;
    } catch (error) {
      return rejectWithValue(error.response.data || "Failed to fetch users");
    }
  }
);

export const getSingleUser = createAsyncThunk(
  "admin/getSingleUser",
  async (id, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(`/api/v1/admin/singleUser/${id}`);
      return data;
    } catch (error) {
      return rejectWithValue(error.response.data || "Failed to fetch user");
    }
  }
);

export const updateUserRole = createAsyncThunk(
  "admin/updateUserRole",
  async ({ id, userRole }, { rejectWithValue }) => {
    try {
      const { data } = await axios.put(`/api/v1/admin/updateUserRole/${id}`, {
        role: userRole,
      });
      return data;
    } catch (error) {
      return rejectWithValue(error.response.data || "Failed to update user");
    }
  }
);

export const deleteUser = createAsyncThunk(
  "admin/deleteUser",
  async ({ id }, { rejectWithValue }) => {
    try {
      const { data } = await axios.delete(`/api/v1/admin/deleteUser/${id}`);
      return data;
    } catch (error) {
      return rejectWithValue(error.response.data || "Failed to delete user");
    }
  }
);

// fetch orders
export const getAllOrders = createAsyncThunk(
  "admin/getAllOrders",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axios.get("/api/v1/admin/allOrders");
      return data;
    } catch (error) {
      return rejectWithValue(error.response.data || "Failed to fetch orders");
    }
  }
);

export const deleteOrder = createAsyncThunk(
  "admin/deleteOrder",
  async (id, { rejectWithValue }) => {
    try {
      const { data } = await axios.delete(`/api/v1/admin/order/${id}`);
      return data;
    } catch (error) {
      return rejectWithValue(
        error.response.data?.message || "Failed to detete order"
      );
    }
  }
);

export const updateOrderStatus = createAsyncThunk(
  "admin/updateOrderStatus",
  async ({ id, status }, { rejectWithValue }) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const { data } = await axios.put(
        `/api/v1/admin/updateStatus/${id}`,
        { status },
        config
      );
      return data;
    } catch (error) {
      return rejectWithValue(
        error.response.data || "Failed to update order status"
      );
    }
  }
);

// Get Product Reviews
export const getProdcutReviews = createAsyncThunk(
  "admin/getProdcutReviews",
  async (id, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(`/api/v1/getReviews?id=${id}`);
      return data;
    } catch (error) {
      return rejectWithValue(
        error.response.data || "Failed to get product reviews"
      );
    }
  }
);

export const deleteProdcutReviews = createAsyncThunk(
  "admin/deleteProdcutReviews",
  async ({ productId, reviewId }, { rejectWithValue }) => {
    try {
      const { data } = await axios.delete(
        `/api/v1/deleteReview?productId=${productId}&reviewId=${reviewId}`
      );
      return data;
    } catch (error) {
      return rejectWithValue(
        error.response.data || "Failed to delete product reviews"
      );
    }
  }
);

const initialState = {
  loading: false,
  success: false,
  error: null,
  message: null,
  products: [],
  product: {},
  users: [],
  user: {},
  orders: [],
  order: {},
  totalAmount: 0,
  reviews: [],
};
const adminSlice = createSlice({
  name: "admin",
  initialState,
  reducers: {
    removeError(state) {
      state.error = null;
    },
    removeSuccess(state) {
      state.success = false;
    },
    removeMessage(state) {
      state.message = null;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(adminProducts.pending, (state) => {
        (state.loading = true), (state.error = null);
      })
      .addCase(adminProducts.fulfilled, (state, action) => {
        (state.loading = false), (state.products = action.payload?.product);
        state.error = null;
      })
      .addCase(adminProducts.rejected, (state, action) => {
        (state.loading = false), (state.error = action.payload);
      });

    builder
      .addCase(createProducts.pending, (state) => {
        (state.loading = true), (state.error = null);
      })
      .addCase(createProducts.fulfilled, (state, action) => {
        (state.loading = false), state.products.push(action.payload?.product);
        state.success = action.payload.success;
      })
      .addCase(createProducts.rejected, (state, action) => {
        (state.loading = false),
          (state.error = action.payload || "error while createing product");
      });

    builder
      .addCase(updateProduct.pending, (state) => {
        (state.loading = true), (state.error = null);
      })
      .addCase(updateProduct.fulfilled, (state, action) => {
        (state.loading = false), (state.success = action.payload.success);
        const updateProduct = action.payload?.product;

        state.product = updateProduct;

        state.products = state.products?.map((p) =>
          p._id === updateProduct._id ? updateProduct : p
        );
      })
      .addCase(updateProduct.rejected, (state, action) => {
        (state.loading = false),
          (state.error = action.payload || "error while updating produc");
      });

    builder
      .addCase(deleteProduct.pending, (state) => {
        (state.loading = true), (state.error = null);
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        (state.loading = false), (state.success = action.payload.success);
        state.products = state.products.filter(
          (p) => p._id !== action.payload.id
        );
      })
      .addCase(deleteProduct.rejected, (state, action) => {
        (state.loading = false),
          (state.error = action.payload || "error while deletion product");
      });

    builder
      .addCase(getAllUsers.pending, (state) => {
        (state.loading = true), (state.error = null);
      })
      .addCase(getAllUsers.fulfilled, (state, action) => {
        (state.loading = false), (state.users = action.payload?.users);
        state.success = action.payload.success;
      })
      .addCase(getAllUsers.rejected, (state, action) => {
        (state.loading = false),
          (state.error = action.payload || "Failed to fetch users");
      });

    builder
      .addCase(getSingleUser.pending, (state) => {
        (state.loading = true), (state.error = null);
      })
      .addCase(getSingleUser.fulfilled, (state, action) => {
        (state.loading = false), (state.user = action.payload?.user);
        state.success = action.payload.success;
      })
      .addCase(getSingleUser.rejected, (state, action) => {
        (state.loading = false),
          (state.error = action.payload || "Failed to fetch user");
      });

    builder
      .addCase(updateUserRole.pending, (state) => {
        (state.loading = true), (state.error = null);
      })
      .addCase(updateUserRole.fulfilled, (state, action) => {
        state.loading = false;
        state.success = action.payload.success;
      })
      .addCase(updateUserRole.rejected, (state, action) => {
        (state.loading = false),
          (state.error = action.payload || "Failed to update user");
      });

    builder
      .addCase(deleteUser.pending, (state) => {
        (state.loading = true), (state.error = null);
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.loading = false;
        const deletedUser = action.payload?.user;
        state.users = state.users.filter(
          (user) => user._id !== deletedUser._id
        );
        state.message = action.payload?.message;
      })
      .addCase(deleteUser.rejected, (state, action) => {
        (state.loading = false),
          (state.error = action.payload || "Failed to delete user");
      });

    builder
      .addCase(getAllOrders.pending, (state) => {
        (state.loading = true), (state.error = null);
      })
      .addCase(getAllOrders.fulfilled, (state, action) => {
        (state.loading = false), (state.orders = action.payload?.orders);
        state.success = action.payload.success;
        state.totalAmount = action.payload.totalAmount;
      })
      .addCase(getAllOrders.rejected, (state, action) => {
        (state.loading = false),
          (state.error = action.payload || "Failed to fetch orders");
      });

    builder
      .addCase(deleteOrder.pending, (state) => {
        (state.loading = true), (state.error = null);
      })
      .addCase(deleteOrder.fulfilled, (state, action) => {
        state.loading = false;
        state.message = action.payload.message;
        state.success = action.payload.success;
      })
      .addCase(deleteOrder.rejected, (state, action) => {
        (state.loading = false),
          (state.error = action.payload || "Failed to delete orders");
      });

    builder
      .addCase(updateOrderStatus.pending, (state) => {
        (state.loading = true), (state.error = null);
      })
      .addCase(updateOrderStatus.fulfilled, (state, action) => {
        state.loading = false;
        state.message = action.payload.message;
        state.success = action.payload.success;
      })
      .addCase(updateOrderStatus.rejected, (state, action) => {
        (state.loading = false),
          (state.error = action.payload || "Failed to update order status");
      });

    builder
      .addCase(getProdcutReviews.pending, (state) => {
        (state.loading = true), (state.error = null);
      })
      .addCase(getProdcutReviews.fulfilled, (state, action) => {
        state.loading = false;
        state.reviews = action.payload.reviews;
      })
      .addCase(getProdcutReviews.rejected, (state, action) => {
        (state.loading = false),
          (state.error = action.payload || "Failed to get product reviews");
      });

    builder
      .addCase(deleteProdcutReviews.pending, (state) => {
        (state.loading = true), (state.error = null);
      })
      .addCase(deleteProdcutReviews.fulfilled, (state, action) => {
        state.loading = false;
        state.success = action.payload.success;
        state.reviews = action.payload.reviews; // <-- FIX
      })
      .addCase(deleteProdcutReviews.rejected, (state, action) => {
        (state.loading = false),
          (state.error = action.payload || "Failed to delete product reviews");
      });
  },
});

export default adminSlice.reducer;
export const { removeError, removeSuccess, removeMessage } = adminSlice.actions;
