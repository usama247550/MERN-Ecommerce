import React, { useEffect, useState } from "react";
import Navbar from "../component/Navbar";
import Footer from "../component/Footer";
import "../css/Register.css";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../component/Loader";
import {
  forgotPassword,
  removeError,
  removeSuccess,
} from "../features/user/userSlice.js";
import { toast } from "react-toastify";
import PageTitle from "../component/PageTitle.jsx";
const ForgotPassword = () => {
  const { loading, error, success, message } = useSelector(
    (state) => state.user
  );
  const dispatch = useDispatch();
  const [userEmail, setUserEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const myData = new FormData();
    myData.set("email", userEmail);
    dispatch(forgotPassword(myData));
    setUserEmail("");
  };

  useEffect(() => {
    if (error) {
      toast.error(error, { autoClose: 3000 });
      dispatch(removeError());
    }
  }, [dispatch, error]);

  useEffect(() => {
    if (success) {
      toast.success(message, { autoClose: 3000 });
      dispatch(removeSuccess());
    }
  }, [dispatch, success, message]);

  return (
    <>
      <Navbar />
      <>
        <PageTitle title="Forgot Password" />
        <div className="register-container">
          <form className="register-form" onSubmit={handleSubmit}>
            <h2 className="form-title">Forgot Password</h2>

            <div className="form-group">
              <label htmlFor="email">Email Address</label>
              <input
                type="email"
                placeholder="xyz@gmail.com"
                required
                name="email"
                value={userEmail}
                onChange={(e) => setUserEmail(e.target.value)}
              />
            </div>

            <button type="submit" className="btn-submit" disabled={loading}>
              {loading ? "Sending.." : "Send"}
            </button>
          </form>
        </div>
      </>

      <Footer />
    </>
  );
};

export default ForgotPassword;
