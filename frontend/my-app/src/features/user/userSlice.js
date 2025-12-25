import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const register = createAsyncThunk(
  "user/register",
  async (myData, { rejectWithValue }) => {
    try {
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };
      const { data } = await axios.post("/api/v1/register", myData, config);
      return data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || "Registration failed, Try again later"
      );
    }
  }
);

export const login = createAsyncThunk(
  "user/login",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const { data } = await axios.post(
        "/api/v1/login",
        { email, password },
        config
      );
      return data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || "Login failed, Try again later"
      );
    }
  }
);

export const getUser = createAsyncThunk(
  "user/getUser",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axios.get("/api/v1/profile");
      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "User not found");
    }
  }
);

export const userLogout = createAsyncThunk(
  "user/userLogout",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axios.post("/api/v1/logout", {
        withCredentials: true,
      });
      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Logout  failed");
    }
  }
);

export const profileUpdate = createAsyncThunk(
  "user/profileUpdate",
  async (myData, { rejectWithValue }) => {
    try {
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };
      const { data } = await axios.put("/api/v1/updateProfile", myData, config);
      return data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || "Profile not updated, Try again later"
      );
    }
  }
);

export const resetPassword = createAsyncThunk(
  "user/resetPassword",
  async (myData, { rejectWithValue }) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const { data } = await axios.put(
        "/api/v1/updatePassword",
        myData,
        config
      );
      return data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || "Password not updated, Try again later"
      );
    }
  }
);

export const forgotPassword = createAsyncThunk(
  "user/forgotPassword",
  async (myData, { rejectWithValue }) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const { data } = await axios.post(
        "/api/v1/password/forgot",
        myData,
        config
      );
      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Forgot Password failed");
    }
  }
);

export const updatePassword = createAsyncThunk(
  "user/updatePassword",
  async ({ token, myData }, { rejectWithValue }) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const { data } = await axios.post(
        `/api/v1/reset/${token}`,
        myData,
        config
      );
      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Reset Password failed");
    }
  }
);

const initialState = {
  loading: false,
  user: localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user"))
    : null,
  error: null,
  success: false,
  isAuthenticated: localStorage.getItem("isAuthenticated") === "true",
  message: null,
};
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    removeError(state) {
      state.error = null;
    },
    removeSuccess(state) {
      state.success = null;
    },
  },

  extraReducers(builder) {
    builder
      .addCase(register.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.user = action.payload?.user || null;
        state.success = action.payload.success;
        state.isAuthenticated = Boolean(action.payload?.user);

        localStorage.setItem("user", JSON.stringify(state.user));
        localStorage.setItem(
          "isAuthenticated",
          JSON.stringify(state.isAuthenticated)
        );
      })
      .addCase(register.rejected, (state, action) => {
        state.loading = false;
        state.error =
          action.payload.message || "Registration failed, Try again later";
        state.user = null;
        state.isAuthenticated = false;
      });

    builder
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.user = action.payload?.user || null;
        state.success = action.payload.success;
        state.isAuthenticated = Boolean(action.payload?.user);

        localStorage.setItem("user", JSON.stringify(state.user));
        localStorage.setItem(
          "isAuthenticated",
          JSON.stringify(state.isAuthenticated)
        );
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error =
          action.payload.message || "Logout failed, Try again later";
        state.user = null;
        state.isAuthenticated = false;
      });

    builder
      .addCase(getUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getUser.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.user = action.payload?.user || null;
        state.success = action.payload.success;
        state.isAuthenticated = Boolean(action.payload?.user);

        localStorage.setItem("user", JSON.stringify(state.user));
        localStorage.setItem(
          "isAuthenticated",
          JSON.stringify(state.isAuthenticated)
        );
      })
      .addCase(getUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message || "User not found";
        state.user = null;
        state.isAuthenticated = false;

        if (action.payload?.statusCode === 401) {
          state.user = null;
          state.isAuthenticated = false;
          localStorage.removeItem("user");
          localStorage.removeItem("isAuthenticated");
        }
      });

    builder
      .addCase(userLogout.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(userLogout.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.user = action.payload = null;
        state.success = false;
        state.isAuthenticated = false;

        localStorage.removeItem("user");
        localStorage.removeItem("isAuthenticated");
      })
      .addCase(userLogout.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message || "Logout failed";
      });

    builder
      .addCase(profileUpdate.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(profileUpdate.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.user = action.payload?.user || null;
        state.success = action.payload.success;
        state.isAuthenticated = Boolean(action.payload?.user);
      })
      .addCase(profileUpdate.rejected, (state, action) => {
        state.loading = false;
        state.error =
          action.payload.message || "Profile not updated, Try again later";
        state.user = null;
        state.isAuthenticated = false;
      });

    builder
      .addCase(resetPassword.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(resetPassword.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.success = action.payload.success;
      })
      .addCase(resetPassword.rejected, (state, action) => {
        state.loading = false;
        state.error =
          action.payload.message || "Password not updated, Try again later";
      });

    builder
      .addCase(forgotPassword.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(forgotPassword.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.success = action.payload.success;
        state.message = action.payload.message;
      })
      .addCase(forgotPassword.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || "Forgot Password failed";
      });

    builder
      .addCase(updatePassword.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updatePassword.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.success = action.payload.success;
        state.user = null;
        state.isAuthenticated = false;
      })
      .addCase(updatePassword.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || "Reset Password failed";
      });
  },
});

export default userSlice.reducer;
export const { removeError, removeSuccess } = userSlice.actions;
