import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import ProductDetails from "./pages/ProductDetails";
import Products from "./pages/Products";
import Register from "./component/Register";
import Login from "./component/Login";
import { useDispatch, useSelector } from "react-redux";
import { getUser } from "./features/user/userSlice";
import UserDashboard from "./user/UserDashboard";
import UserProfile from "./user/UserProfile";
import ProtectedRoute from "./component/ProtectedRoute";
import UpdateProfile from "./user/UpdateProfile";
import UpdatePassword from "./user/UpdatePassword";
import ForgotPassword from "./user/ForgotPassword";
import ResetPassword from "./user/ResetPassword";
import Cart from "./cart/Cart";
import Shipping from "./cart/Shipping";
import OrderConfirm from "./cart/OrderConfirm";
import Payment from "./cart/Payment";
import Success from "./cart/Success";
import Cancel from "./cart/Cancel";
import Order from "./order/Order";
import OrderDetails from "./order/OrderDetails";
import AdminDashboard from "./admin/AdminDashboard";
import ProductList from "./admin/ProductList";
import CreateProduct from "./admin/CreateProduct";
import UpdateProduct from "./admin/UpdateProduct";
import UserList from "./admin/UserList";
import UpdateUserRole from "./admin/UpdateUserRole";
import Orders from "./admin/Orders";
import UpdateOrderStatus from "./admin/UpdateOrderStatus";
import ProductReviews from "./admin/ProductReviews";

const App = () => {
  const { isAuthenticated, user } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUser());
  }, [dispatch]);

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/singleProduct/:id" element={<ProductDetails />} />
          <Route path="/products" element={<Products />} />
          <Route path="/products/:keyword" element={<Products />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route
            path="/profile"
            element={<ProtectedRoute element={<UserProfile />} />}
          />

          <Route
            path="/profile"
            element={<ProtectedRoute element={<UserDashboard user={user} />} />}
          />

          <Route
            path="/profile/update"
            element={<ProtectedRoute element={<UpdateProfile />} />}
          />

          <Route
            path="/password/update"
            element={<ProtectedRoute element={<UpdatePassword />} />}
          />

          <Route path="/password/forgot" element={<ForgotPassword />} />
          <Route path="/reset/:token" element={<ResetPassword />} />

          <Route path="/cart" element={<Cart />} />

          <Route
            path="/shipping"
            element={<ProtectedRoute element={<Shipping />} />}
          />

          <Route
            path="/order/confirm"
            element={<ProtectedRoute element={<OrderConfirm />} />}
          />

          <Route
            path="/payment"
            element={<ProtectedRoute element={<Payment />} />}
          />

          <Route path="/success" element={<Success />} />
          <Route path="/cancel" element={<Cancel />} />
          <Route path="/user/order" element={<Order />} />

          <Route
            path="/orderDetails/:id"
            element={<ProtectedRoute element={<OrderDetails />} />}
          />

          {/* Admin Routes */}
          <Route
            path="/admin/dashboard"
            element={
              <ProtectedRoute element={<AdminDashboard />} onlyAdmin={true} />
            }
          />
          <Route
            path="/ProductList"
            element={
              <ProtectedRoute element={<ProductList />} onlyAdmin={true} />
            }
          />
          <Route
            path="/CreateProduct"
            element={
              <ProtectedRoute element={<CreateProduct />} onlyAdmin={true} />
            }
          />
          <Route
            path="/updateProduct/:id"
            element={
              <ProtectedRoute element={<UpdateProduct />} onlyAdmin={true} />
            }
          />
          <Route
            path="/userList"
            element={<ProtectedRoute element={<UserList />} onlyAdmin={true} />}
          />

          <Route
            path="/updateUserRole/:id"
            element={
              <ProtectedRoute element={<UpdateUserRole />} onlyAdmin={true} />
            }
          />

          <Route
            path="/admin/orders"
            element={<ProtectedRoute element={<Orders />} onlyAdmin={true} />}
          />
          <Route
            path="/admin/updateOrder/:id"
            element={
              <ProtectedRoute
                element={<UpdateOrderStatus />}
                onlyAdmin={true}
              />
            }
          />

          <Route
            path="/admin/productReview"
            element={
              <ProtectedRoute element={<ProductReviews />} onlyAdmin={true} />
            }
          />
        </Routes>

        {/* {isAuthenticated && <UserDashboard user={user} />} */}
      </BrowserRouter>
    </>
  );
};

export default App;
