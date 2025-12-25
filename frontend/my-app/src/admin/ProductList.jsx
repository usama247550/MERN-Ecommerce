import React, { useEffect, useState } from "react";
import "../css/styleAdmin/ProductList.css";
import { MdModeEditOutline, MdDelete } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import {
  adminProducts,
  removeError,
  removeSuccess,
} from "../features/admin/adminSlice";
import Loader from "../component/Loader";
import Navbar from "../component/Navbar";
import Footer from "../component/Footer";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { deleteProduct } from "../features/admin/adminSlice.js";
import PageTitle from "../component/PageTitle";

const ProductList = () => {
  const dispatch = useDispatch();
  const { products, loading, error, success } = useSelector(
    (state) => state.admin
  );
  const [isFirstRender, setIsFirstRender] = useState(true);

  useEffect(() => {
    dispatch(removeSuccess());
  }, [dispatch]);

  const removeProduct = (id) => {
    dispatch(deleteProduct({ id: id }));
  };

  useEffect(() => {
    if (isFirstRender) {
      setIsFirstRender(false);
      return;
    }
    if (success) {
      toast.success("Product delete successfully!");
      dispatch(removeSuccess());
      dispatch(adminProducts());
    }
    if (error) {
      toast.error(error);
      dispatch(removeError());
    }
  }, [dispatch, error, success, isFirstRender]);

  return (
    <>
      <Navbar />
      {loading ? (
        <Loader />
      ) : (
        <>
          <PageTitle title="Product List" />
          <div className="productListContainer">
            <h2 className="productListHeading">Product List</h2>

            <table className="productTable">
              <thead>
                <tr>
                  <th>Sr No</th>
                  <th>Image</th>
                  <th>Name</th>
                  <th>Price</th>
                  <th>Rating</th>
                  <th>Category</th>
                  <th>Stock</th>
                  <th>Created At</th>
                  <th>Action</th>
                </tr>
              </thead>

              <tbody>
                {products.map((product, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>
                      <img
                        src={product?.image[0].url}
                        alt={product.name}
                        className="productImg"
                      />
                    </td>
                    <td>{product.name}</td>
                    <td>{product.price}</td>
                    <td>{product.rating}</td>
                    <td>{product.category}</td>
                    <td>{product.stock}</td>
                    <td>{product.createdAt.substring(0, 10)}</td>
                    <td>
                      <Link
                        to={`/updateProduct/${product._id}`}
                        className="editBtn"
                      >
                        <MdModeEditOutline />
                      </Link>
                      <button
                        className="deleteBtn"
                        onClick={() => removeProduct(product?._id)}
                      >
                        <MdDelete />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}

      <Footer />
    </>
  );
};

export default ProductList;
