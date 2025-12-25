import express from "express";
const router = express.Router();
import {
  allOrders,
  createOrder,
  myOrders,
  singleOrder,
  deleteOrder,
  orderStatusUpdate,
} from "../controller/orderController.js";
import { varifyUserAuth, roleBaseAccess } from "../middleware/userAuth.js";

router.post("/createOrder", varifyUserAuth, createOrder);
router.get("/myOrders", varifyUserAuth, myOrders);
router.get("/order/:id", varifyUserAuth, singleOrder);
router.get(
  "/admin/allOrders",
  varifyUserAuth,
  roleBaseAccess("admin"),
  allOrders
);
router.delete(
  "/admin/order/:id",
  varifyUserAuth,
  roleBaseAccess("admin"),
  deleteOrder
);
router.put(
  "/admin/updateStatus/:id",
  varifyUserAuth,
  roleBaseAccess("admin"),
  orderStatusUpdate
);

export default router;
