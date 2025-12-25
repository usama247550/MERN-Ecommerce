import React, { useEffect } from "react";
import Footer from "../component/Footer";
import Navbar from "../component/Navbar";
import Banner from "../component/Banner";
import Product from "../component/Product";
import { useSelector, useDispatch } from "react-redux";
import { fetchProducts } from "../features/products/productSlice.js";
import { toast } from "react-toastify";
import { removeErrors } from "../features/products/productSlice.js";
import Loader from "../component/Loader.jsx";
import "../css/Home.css";
import PageTitle from "../component/PageTitle.jsx";

const Home = () => {
  const dispatch = useDispatch();

  const { loading, products, productsCount, error } = useSelector(
    (state) => state.Products
  );

  useEffect(() => {
    dispatch(fetchProducts({ keyword: "" }));
  }, [dispatch]);

  useEffect(() => {
    if (error) {
      toast.error(error, { autoClose: 3000 });
      dispatch(removeErrors());
    }
  }, [dispatch, error]);
  return (
    <>
      <PageTitle title={"Home"} />
      {loading ? (
        <Loader />
      ) : (
        <>
          <Navbar />
          <Banner />
          <div className="Home-container">
            <h2 className="home-heading">Trenging Now</h2>
            <div className="home-product">
              {products?.map((product, ind) => (
                <Product product={product} key={ind} />
              ))}
            </div>
          </div>
          <Footer />
        </>
      )}
    </>
  );
};

export default Home;
