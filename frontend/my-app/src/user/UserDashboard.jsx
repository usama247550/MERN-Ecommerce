import React, { useState } from "react";
import "../css/UserDashboard.css";
import { useDispatch } from "react-redux";
import { removeSuccess, userLogout } from "../features/user/userSlice";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const UserDashboard = ({ user }) => {
  const [showOptions, setShowOptions] = useState(false);

  const toggleMenu = () => setShowOptions(!showOptions);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const orders = () => {
    navigate("/user/order");
  };
  const account = () => {
    navigate("/profile");
  };
  const logout = () => {
    dispatch(userLogout())
      .unwrap()
      .then(() => {
        toast.success("Logout successful");
        dispatch(removeSuccess());
        navigate("/login");
      })
      .catch((error) => {
        toast.success(error.message || "Logout failed");
      });
  };

  const adminDashboard = () => {
    navigate("/admin/dashboard");
  };

  const options = [
    { name: "My Orders", func: orders },
    { name: "Profile", func: account },
    { name: "Logout", func: logout },
  ];
  if (user?.role === "admin") {
    options.unshift({ name: "Admin Dashboard", func: adminDashboard });
  }
  return (
    <>
      <div className="user-info" onClick={toggleMenu}>
        <img
          src={user?.avatar?.url || "/images/avatar.png"}
          alt={user?.name || "User"}
          className="user-img"
        />
        <p className="user-name">{user?.name || "User"}</p>
        {showOptions && (
          <div className="dropdown">
            {options.map((value, index) => (
              <button key={index} onClick={value.func} className="dropdown-btn">
                {value.name}
              </button>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default UserDashboard;
