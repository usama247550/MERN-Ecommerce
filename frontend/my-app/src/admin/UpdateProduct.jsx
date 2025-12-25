import React, { useEffect, useState } from "react";
import "../css/styleAdmin/CreateProduct.css";
import Loader from "../component/Loader";
import Navbar from "../component/Navbar";
import Footer from "../component/Footer";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import {
  removeError,
  removeSuccess,
  updateProduct,
} from "../features/admin/adminSlice.js";
import { useNavigate, useParams } from "react-router-dom";
import { fetchSingleProduct } from "../features/products/productSlice.js";
import PageTitle from "../component/PageTitle";

const UpdateProduct = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { singleProduct } = useSelector((state) => state.Products);
  const { loading, success, error } = useSelector((state) => state.admin);
  const [product, setProduct] = useState({
    name: "",
    price: "",
    description: "",
    category: "",
  });
  const [images, setImages] = useState([]);
  const [previewImg, setPreviewImg] = useState([]);
  const categories = ["phone", "laptop", "watch", "women", "men"];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct({
      ...product,
      [name]: value,
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const { name, price, description, category } = product;
    const myForm = new FormData();
    myForm.set("name", name);
    myForm.set("price", price);
    myForm.set("description", description);
    myForm.set("category", category);
    images.forEach((img) => {
      myForm.append("image", img);
    });
    dispatch(updateProduct({ id, productData: myForm }));
  };

  useEffect(() => {
    if (id) {
      dispatch(fetchSingleProduct(id));
    }
  }, [dispatch, id]);

  useEffect(() => {
    if (success) {
      toast.success("Product updated successfully!");
      dispatch(removeSuccess());
      navigate("/ProductList");
    }

    if (error) {
      toast.error(error);
      dispatch(removeError());
    }
  }, [dispatch, success, error, navigate]);

  const createImage = (e) => {
    const files = Array.from(e.target.files);
    setPreviewImg([]);
    setImages([]);
    files.forEach((file) => {
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.readyState === 2) {
          setPreviewImg((old) => [...old, reader.result]);
          setImages((old) => [...old, reader.result]);
        }
      };
      reader.readAsDataURL(file);
    });
  };

  useEffect(() => {
    if (singleProduct) {
      setProduct({
        name: singleProduct.product?.name,
        price: singleProduct.product?.price,
        description: singleProduct.product?.description,
        category: singleProduct?.product?.category,
      });
    }
  }, [singleProduct]);

  return (
    <>
      <Navbar />
      <>
        <PageTitle title="Update Product" />
        <div className="create-product-container">
          <h2 className="create-product-heading">Update Product</h2>
          <form className="create-product-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Product Name</label>
              <input
                type="text"
                placeholder="Enter product name"
                name="name"
                value={product.name || ""}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label>Price</label>
              <input
                type="number"
                placeholder="Enter product price"
                name="price"
                value={product.price || ""}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label>Description</label>
              <textarea
                rows="4"
                placeholder="Enter product description"
                name="description"
                value={product.description || ""}
                onChange={handleChange}
              ></textarea>
            </div>

            <div className="form-group">
              <label>Category</label>
              <select
                name="category"
                value={product.category || ""}
                onChange={handleChange}
              >
                <option value="">Choose Category</option>
                {categories.map((category, index) => {
                  return (
                    <option key={index} value={category}>
                      {category}
                    </option>
                  );
                })}
              </select>
            </div>

            <div className="form-group">
              <label>Product Images</label>
              <input type="file" multiple name="image" onChange={createImage} />
            </div>
            <div className="preview">
              {previewImg.map((img, ind) => {
                return (
                  <img
                    key={ind}
                    src={img}
                    alt="preview"
                    className="image-preview"
                  />
                );
              })}
            </div>
            <button
              type="submit"
              className={
                loading ? "create-btn create-btn-loading" : "create-btn"
              }
              disabled={loading}
            >
              {loading ? "Updating.." : "Update"}
            </button>
          </form>
        </div>
      </>
      <Footer />
    </>
  );
};

export default UpdateProduct;
