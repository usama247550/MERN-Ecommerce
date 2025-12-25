import React, { useEffect, useState } from "react";
import Navbar from "../component/Navbar";
import Footer from "../component/Footer";
import "../css/Register.css";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../component/Loader";
import {
  login,
  removeError,
  removeSuccess,
} from "../features/user/userSlice.js";
import { toast } from "react-toastify";
import PageTitle from "./PageTitle.jsx";

const Register = () => {
  const { loading, error, success } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const [userInfo, setUserInfo] = useState({
    email: "",
    password: "",
  });

  const redirect = new URLSearchParams(location.search).get("redirect") || "/";

  const handleChange = (e) => {
    setUserInfo({ ...userInfo, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(login({ email, password }));
  };

  useEffect(() => {
    if (error) {
      toast.error(error, { autoClose: 3000 });
      dispatch(removeError());
    }
  }, [dispatch, error]);

  useEffect(() => {
    if (success) {
      toast.success("Login successfully", { autoClose: 3000 });
      dispatch(removeSuccess());
      navigate(redirect);
    }
  }, [dispatch, navigate, success, redirect]);

  const { email, password } = userInfo;

  return (
    <>
      <Navbar />
      <>
        <PageTitle title="Login" />
        <div className="register-container">
          <form className="register-form" onSubmit={handleSubmit}>
            <h2 className="form-title">Login</h2>

            <div className="form-group">
              <label htmlFor="email">Email Address</label>
              <input
                type="email"
                placeholder="xyz@gmail.com"
                required
                name="email"
                value={email}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                placeholder="Min 6 characters"
                required
                name="password"
                value={password}
                onChange={handleChange}
              />
            </div>

            <button
              type="submit"
              className={
                loading ? "btn-submit btn-submit-loading" : "btn-submit"
              }
              disabled={loading}
            >
              {loading ? "Sign In.." : "Sign In"}
            </button>

            <p className="signin-text">
              Don't have an account?{" "}
              <Link className="signin-link" to="/register">
                Sign up here
              </Link>
            </p>
            <p className="signin-text">
              Forgot your password?{" "}
              <Link className="signin-link" to="/password/forgot">
                Reset here
              </Link>
            </p>
          </form>
        </div>
      </>

      <Footer />
    </>
  );
};

export default Register;
