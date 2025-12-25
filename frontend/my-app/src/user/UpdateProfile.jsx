import React, { useEffect, useState } from "react";
import Navbar from "../component/Navbar";
import Footer from "../component/Footer";
import "../css/Register.css";
import { useNavigate } from "react-router-dom";
import Loader from "../component/Loader";
import { useDispatch, useSelector } from "react-redux";
import {
  profileUpdate,
  removeError,
  removeSuccess,
} from "../features/user/userSlice.js";
import { toast } from "react-toastify";
import PageTitle from "../component/PageTitle.jsx";

const UpdateProfile = () => {
  const { user, loading, error, success } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [avatar, setAvater] = useState("");
  const [previewAvatar, setpreviewAvater] = useState("/images/avatar.jpeg");
  const [userInfo, setUserInfo] = useState({
    name: "",
    email: "",
  });

  useEffect(() => {
    if (user) {
      setUserInfo({
        name: user.name,
        email: user.email,
      });
      setpreviewAvater(user.avatar?.url || "/images/avatar.jpeg");
    }
  }, [user]);

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
  const { name, email } = userInfo;

  const handleSubmit = (e) => {
    e.preventDefault();
    const myData = new FormData();
    myData.set("name", name);
    myData.set("email", email);
    myData.set("avatar", avatar);
    dispatch(profileUpdate(myData));
  };

  useEffect(() => {
    if (error) {
      toast.error(error, { autoClose: 3000 });
      dispatch(removeError());
    }
  }, [dispatch, error]);

  useEffect(() => {
    if (success) {
      toast.success("Profile update successfully", { autoClose: 2000 });
      dispatch(removeSuccess());
      navigate("/profile");
    }
  }, [dispatch, navigate, success]);
  return (
    <>
      <Navbar />

      <>
        <PageTitle title="Update Profile" />
        <div className="register-container">
          <form
            className="register-form"
            onSubmit={handleSubmit}
            // encType="multipart/form-data"
          >
            <h2 className="form-title">Update Profile</h2>

            <img
              src={previewAvatar}
              name="avatar"
              onChange={handleChange}
              alt={previewAvatar}
              style={{
                width: "60px",
                height: "60px",
                margin: "auto",
                borderRadius: "50%",
              }}
            />

            <div className="form-group">
              <label htmlFor="name">Full Name</label>
              <input
                type="text"
                placeholder={user.name}
                name="name"
                value={name}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label htmlFor="email">Email Address</label>
              <input
                type="email"
                placeholder={user.email}
                name="email"
                value={email}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label htmlFor="image">Upload Image</label>
              <input
                type="file"
                placeholder="Upload image"
                name="avatar"
                onChange={handleChange}
                accept="image/*"
              />
            </div>

            <button type="submit" className="btn-submit" disabled={loading}>
              {loading ? "Updating.." : "Update"}
            </button>
          </form>
        </div>
      </>

      <Footer />
    </>
  );
};

export default UpdateProfile;
UpdateProfile;
