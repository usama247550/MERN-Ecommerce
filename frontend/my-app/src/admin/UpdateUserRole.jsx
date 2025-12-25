import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getSingleUser, updateUserRole } from "../features/admin/adminSlice";
import { removeSuccess } from "../features/admin/adminSlice";
import PageTitle from "../component/PageTitle";

const UpdateUserRole = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, success } = useSelector((state) => state.admin);
  const { user } = useSelector((state) => state.admin);
  const [userInfo, setUserInfo] = useState({
    name: "",
    email: "",
    role: "",
  });

  useEffect(() => {
    if (user) {
      setUserInfo({
        name: user?.name || "",
        email: user?.email || "",
        role: user?.role || "",
      });
    }
  }, [user]);

  useEffect(() => {
    dispatch(getSingleUser(id));
  }, [dispatch, id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserInfo({
      ...userInfo,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(updateUserRole({ id, userRole: userInfo?.role }));
    if (success) {
      dispatch(removeSuccess());
      navigate("/userList");
    }
  };

  return (
    <>
      <PageTitle title="Update User Role" />
      <div className="create-product-container">
        <h2 className="create-product-heading">Update User Role</h2>
        <form className="create-product-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Name</label>
            <input
              type="text"
              name="name"
              readOnly
              value={userInfo.name || ""}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>Email</label>
            <input
              type="text"
              name="email"
              readOnly
              value={userInfo.email || ""}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>User Role</label>
            <select
              name="role"
              value={userInfo.role || ""}
              onChange={handleChange}
            >
              <option value="">Select Role</option>
              <option value="user">User</option>
              <option value="admin">Admin</option>
            </select>
          </div>

          <button type="submit" className="create-btn">
            {loading ? "Update..." : "Update"}
          </button>
        </form>
      </div>
    </>
  );
};

export default UpdateUserRole;
