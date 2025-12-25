import express from "express";
const router = express.Router();
import createPayment from "../controller/paymentController.js";

router.post("/create-payment-intent", createPayment);

export default router;
