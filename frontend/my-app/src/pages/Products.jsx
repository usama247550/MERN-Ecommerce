import React, { useEffect, useState } from "react";
import "../css/Products.css";
import Navbar from "../component/Navbar";
import Footer from "../component/Footer";
import Loader from "../component/Loader.jsx";
import { toast } from "react-toastify";
import { removeErrors } from "../features/products/productSlice.js";
import { useSelector, useDispatch } from "react-redux";
import Product from "../component/Product";
import { fetchProducts } from "../features/products/productSlice.js";
import { useLocation, useNavigate } from "react-router-dom";
import Pagination from "../component/Pagination.jsx";
import NoProduct from "../component/NoProduct.jsx";
import PageTitle from "../component/PageTitle.jsx";

const Products = () => {
  const { loading, products, error } = useSelector((state) => state.Products);

  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  const searchParams = new URLSearchParams(location.search);
  const keyword = searchParams.get("keyword");
  const category = searchParams.get("category");
  const pageFromUrl = parseInt(searchParams.get("page"), 10) || 1;

  const [currPage, setCurrPage] = useState(pageFromUrl);

  useEffect(() => {
    dispatch(fetchProducts({ keyword, page: currPage, category }));
  }, [dispatch, keyword, currPage, category]);

  useEffect(() => {
    if (error) {
      toast.error(error, { autoClose: 3000 });
      dispatch(removeErrors());
    }
  }, [dispatch, error]);

  const handlePage = (page) => {
    if (page !== currPage) {
      setCurrPage(page);
      const newSearchParams = new URLSearchParams(location.search);
      if (page === 1) {
        newSearchParams.delete("page");
      } else {
        newSearchParams.set("page", page);
      }
      navigate(`?${newSearchParams.toString()}`);
    }
  };

  const handleCategory = (category) => {
    const newSearchParams = new URLSearchParams(location.search);
    newSearchParams.set("category", category);
    newSearchParams.delete("page");
    navigate(`?${newSearchParams.toString()}`);
  };

  const categoryArr = [
    "phone",
    "laptop",
    "watch",
    "women",
    "men",
    "bag",
  ];
  return (
    <>
      <PageTitle title={"Products"} />
      <Navbar />
      {loading ? (
        <Loader />
      ) : (
        <div className="container">
          <div className="filter-container">
            <h3 className="filter-heading">CATEGORY</h3>
            {categoryArr.map((category) => (
              <p key={category} onClick={() => handleCategory(category)}>
                {category}
              </p>
            ))}
          </div>
          <div className="products-container">
            <div className="Home-container">
              <div className="home-product">
                {products?.map((product) => (
                  <Product product={product} key={product._id} />
                ))}
              </div>
              <Pagination currPage={currPage} onPageChange={handlePage} />
            </div>
          </div>
        </div>
      )}

      <Footer />
    </>
  );
};

export default Products;
