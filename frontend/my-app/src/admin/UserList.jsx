import React, { useEffect } from "react";
import "../css/styleAdmin/ProductList.css";
import { MdModeEditOutline, MdDelete } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import Navbar from "../component/Navbar";
import Footer from "../component/Footer";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import {
  deleteUser,
  getAllUsers,
  removeError,
  removeMessage,
} from "../features/admin/adminSlice.js";
import PageTitle from "../component/PageTitle";

const UserList = () => {
  const dispatch = useDispatch();
  const { users, error, message } = useSelector((state) => state.admin);

  useEffect(() => {
    dispatch(getAllUsers());
  }, [dispatch]);

  const removeUser = (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this user?"
    );
    if (confirmDelete) {
      dispatch(deleteUser({ id }));
    }
  };
  useEffect(() => {
    if (message) {
      dispatch(removeMessage());
      dispatch(getAllUsers());
    }
  }, [dispatch, message]);

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(removeError());
    }
  }, [dispatch, error]);

  return (
    <>
      <Navbar />

      <PageTitle title="User List" />

      <div className="productListContainer">
        <h2 className="productListHeading">User List</h2>

        <table className="productTable">
          <thead>
            <tr>
              <th>Sr No</th>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {users?.map((user, index) => (
              <tr key={user._id}>
                <td>{index + 1}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.role}</td>

                <td>
                  <Link to={`/updateUserRole/${user._id}`} className="editBtn">
                    <MdModeEditOutline />
                  </Link>
                  <button
                    className="deleteBtn"
                    onClick={() => removeUser(user?._id)}
                  >
                    <MdDelete />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Footer />
    </>
  );
};

export default UserList;
