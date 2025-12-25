import React from "react";
import { useSelector } from "react-redux";
import Loader from "../component/Loader";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ element, onlyAdmin = false }) => {
  const { isAuthenticated, loading, user } = useSelector((state) => state.user);
  if (loading) return <Loader />;
  if (!isAuthenticated) return <Navigate to="/login" />;
  if (onlyAdmin && user.role !== "admin") {
    return <Navigate to={"/"} />;
  }

  return element;
};

export default ProtectedRoute;
