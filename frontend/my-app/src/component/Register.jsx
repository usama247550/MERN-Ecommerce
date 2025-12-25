import React, { useEffect, useState } from "react";
import Navbar from "../component/Navbar";
import Footer from "../component/Footer";
import "../css/Register.css";
import { Link, useNavigate } from "react-router-dom";
import Loader from "../component/Loader";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import {
  register,
  removeError,
  removeSuccess,
} from "../features/user/userSlice.js";
import PageTitle from "./PageTitle.jsx";

const Register = () => {
  const { loading, error, success } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [avatar, setAvater] = useState("");
  const [previewAvatar, setpreviewAvater] = useState("/images/avatar.jpeg");
  const [userInfo, setUserInfo] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    if (e.target.name === "avatar") {
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.readyState === 2) {
          setAvater(reader.result);
          setpreviewAvater(reader.result);
        }
      };
      reader.readAsDataURL(e.target.files[0]);
    } else {
      setUserInfo({ ...userInfo, [e.target.name]: e.target.value });
    }
  };

  const { name, email, password } = userInfo;

  const handleSubmit = (e) => {
    e.preventDefault();
    const myData = new FormData();
    myData.set("name", name);
    myData.set("email", email);
    myData.set("password", password);
    myData.set("avatar", avatar);
    dispatch(register(myData));
  };

  useEffect(() => {
    if (error) {
      toast.error(error, { autoClose: 3000 });
      dispatch(removeError());
    }
  }, [dispatch, error]);

  useEffect(() => {
    if (success) {
      toast.success("Registration successfully", { autoClose: 3000 });
      dispatch(removeSuccess());
      navigate("/login");
    }
  }, [dispatch, navigate, success]);

  return (
    <>
      <Navbar />
      <>
        <PageTitle title="Sign up" />
        <div className="register-container">
          <form
            className="register-form"
            onSubmit={handleSubmit}
            encType="multipart/form-data"
          >
            <h2 className="form-title">Create Account</h2>
            <div className="form-group">
              <img
                src={previewAvatar}
                name="avatar"
                onChange={handleChange}
                alt={previewAvatar}
                className="profile-avatar"
              />
            </div>

            <div className="form-group">
              <label htmlFor="name">Full Name</label>
              <input
                type="text"
                placeholder="Enter your name"
                required
                name="name"
                value={name}
                onChange={handleChange}
              />
            </div>

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

            <div className="form-group">
              <label htmlFor="image">Upload Image</label>
              <input
                type="file"
                placeholder="Upload image"
                required
                name="avatar"
                onChange={handleChange}
                accept="image/*"
              />
            </div>

            <button
              type="submit"
              className={
                loading ? "btn-submit btn-submit-loading" : "btn-submit"
              }
              disabled={loading}
            >
              {loading ? "Sign Up.." : "Sign Up"}
            </button>

            <p className="signin-text">
              Already have an account?{" "}
              <Link className="signin-link" to="/login">
                Sign in here
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
