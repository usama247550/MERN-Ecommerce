import React, { useEffect, useState } from "react";
import "../css/styleAdmin/CreateProduct.css";
import Navbar from "../component/Navbar";
import Footer from "../component/Footer";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  createProducts,
  removeError,
  removeSuccess,
} from "../features/admin/adminSlice.js";
import PageTitle from "../component/PageTitle";

const CreateProduct = () => {
  const { loading, success, error } = useSelector((state) => state.admin);
  const [isFirstRender, setIsFirstRender] = useState(true);

  const [product, setProduct] = useState({
    name: "",
    price: "",
    description: "",
    category: "",
  });
  const [images, setImages] = useState([]);
  const [previewImg, setPreviewImg] = useState([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();

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
    dispatch(createProducts({ productData: myForm }));
  };

  useEffect(() => {
    dispatch(removeSuccess());
  }, [dispatch]);

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(removeError());
    }
  }, [dispatch, error]);

  useEffect(() => {
    if (isFirstRender) {
      setIsFirstRender(false);
      return;
    }
    if (success) {
      toast.success("Product created successfully!");
      dispatch(removeSuccess());
      setProduct({
        name: "",
        price: "",
        description: "",
        category: "",
      });
      setPreviewImg([]);
      navigate("/ProductList");
    }
  }, [dispatch, success, isFirstRender, navigate]);

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

  return (
    <>
      <PageTitle title="Create Product" />
      <Navbar />
      <div className="create-product-container">
        <h2 className="create-product-heading">Create New Product</h2>
        <form className="create-product-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Product Name</label>
            <input
              type="text"
              placeholder="Enter product name"
              name="name"
              value={product.name}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>Price</label>
            <input
              type="number"
              placeholder="Enter product price"
              name="price"
              value={product.price}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>Description</label>
            <textarea
              rows="4"
              placeholder="Enter product description"
              name="description"
              value={product.description}
              onChange={handleChange}
            ></textarea>
          </div>

          <div className="form-group">
            <label>Category</label>
            <select
              name="category"
              value={product.category}
              onChange={handleChange}
              className="category-name"
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
            className={loading ? "create-btn create-btn-loading" : "create-btn"}
            disabled={loading}
          >
            {loading ? "Processing.." : "Create"}
          </button>
        </form>
      </div>
      <Footer />
    </>
  );
};

export default CreateProduct;
