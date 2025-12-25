import express from "express";
const router = express.Router();
import {
  createProduct,
  allProducts,
  getAllProducts,
  updateProduct,
  deleteProduct,
  getSingleProduct,
  createReview,
  getReviews,
  deleteReview,
} from "../controller/productController.js";
import { varifyUserAuth, roleBaseAccess } from "../middleware/userAuth.js";

router.get("/getProducts", allProducts);
router.get("/singleProduct/:id", getSingleProduct);
router.get("/getReviews", getReviews);
router.put("/product/review", varifyUserAuth, createReview);

router.get(
  "/admin/getAllProducts",
  varifyUserAuth,
  roleBaseAccess("admin"),
  getAllProducts
);
router.post(
  "/admin/createProduct",
  varifyUserAuth,
  roleBaseAccess("admin"),
  createProduct
);
router.put(
  "/admin/updateProduct/:id",
  varifyUserAuth,
  roleBaseAccess("admin"),
  updateProduct
);
router.delete(
  "/admin/deleteProduct/:id",
  varifyUserAuth,
  roleBaseAccess("admin"),
  deleteProduct
);

router.delete(
  "/deleteReview",
  varifyUserAuth,
  roleBaseAccess("admin"),
  deleteReview
);

export default router;
