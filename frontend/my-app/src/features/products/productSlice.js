import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async ({ keyword, page = 1, category }, { rejectWithValue }) => {
    try {
      let link = `/api/v1/getProducts?page=` + page;
      if (category) {
        link += `&category=${category}`;
      }
      if (keyword) {
        link += `&keyword=${keyword}`;
      }

      const { data } = await axios.get(link);
      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "An error occurred");
    }
  }
);
export const fetchSingleProduct = createAsyncThunk(
  "products/fetchSingleProduct",
  async (id, { rejectWithValue }) => {
    try {
      const link = `/api/v1/singleProduct/${id}`;
      const { data } = await axios.get(link);
      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "An error occurred");
    }
  }
);
export const createReview = createAsyncThunk(
  "products/createReview",
  async ({ rating, comment, productId }, { rejectWithValue }) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const link = `/api/v1/product/review`;
      const { data } = await axios.put(
        link,
        { rating, comment, productId },
        config
      );
      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "An error occurred");
    }
  }
);

const initialState = {
  loading: false,
  products: [],
  productsCount: 0,
  singleProduct: {},
  error: null,
  itemsPerPage: 0,
  totalPages: 0,
  reviewLoading: false,
  reviewSuccess: false,
};

const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    removeErrors(state) {
      state.error = null;
    },

    removeSuccess(state) {
      state.reviewSuccess = false;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload.products;
        state.error = null;
        state.productsCount = action.payload.totalProduct;
        state.itemsPerPage = action.payload.limit;
        state.totalPages = action.payload.totalPages;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Something went wrong";
      });

    builder
      .addCase(fetchSingleProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSingleProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.singleProduct = action.payload.singleProduct || action.payload;
        state.error = null;
      })
      .addCase(fetchSingleProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Something went wrong";
      });

    builder
      .addCase(createReview.pending, (state) => {
        state.reviewLoading = true;
        state.error = null;
      })
      .addCase(createReview.fulfilled, (state, action) => {
        state.reviewLoading = false;
        state.reviewSuccess = true;
        state.error = null;
      })
      .addCase(createReview.rejected, (state, action) => {
        state.reviewLoading = false;
        state.error = action.payload || "Something went wrong";
      });
  },
});

export default productSlice.reducer;
export const { removeErrors, removeSuccess } = productSlice.actions;
