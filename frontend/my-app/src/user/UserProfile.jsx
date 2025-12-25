import React from "react";
import { Link } from "react-router-dom";
import "../css/Profile.css";
import Navbar from "../component/Navbar";
import Footer from "../component/Footer";
import { useSelector } from "react-redux";
import Loader from "../component/Loader";
import PageTitle from "../component/PageTitle.jsx";

const UserProfile = () => {
  const { user, loading } = useSelector((state) => state.user);

  return (
    <>
      <Navbar />
      {loading ? (
        <Loader />
      ) : (
        <>
          <PageTitle title="My Profile" />
          <div className="profile-container">
            <div className="profile-card">
              <img
                src={user?.avatar?.url || "/images/avatar.jpeg"}
                alt=""
                className="profile-avatar"
              />
              <Link className="edit-btn" to="/profile/update">
                Edit Profile
              </Link>
              <div className="profile-info">
                <h2>{user?.name}</h2>
                <p>{user?.email}</p>
                <span className="join-date">
                  Joined on {String(user?.createdAt).substring(0, 10)}
                </span>
              </div>
              <div className="profile-links">
                <Link to="/user/order" className="profile-link">
                  My Orders
                </Link>
                <Link to="/password/update" className="profile-link">
                  Change Password
                </Link>
              </div>
            </div>
          </div>
        </>
      )}

      <Footer />
    </>
  );
};
export default UserProfile;
