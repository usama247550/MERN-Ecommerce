import Order from "../models/orderModel.js";
import Product from "../models/productModel.js";
import handleError from "../utils/handleError.js";
import catchAsyncError from "../middleware/catchAsyncError.js";

const createOrder = catchAsyncError(async (req, res, next) => {
  const {
    shippingDetails,
    orderItems,
    paymentInfo,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
  } = req.body;
  const order = await Order.create({
    shippingDetails,
    orderItems,
    paymentInfo,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
    user: req.user?.id,
    paidAt: Date.now(),
  });
  res.status(201).json({
    success: true,
    message: "Order created successfully",
    order,
  });
});

const myOrders = catchAsyncError(async (req, res, next) => {
  const orders = await Order.find({ user: req.user._id });
  if (!orders) {
    return next(new handleError("order not found", 404));
  }

  res.status(200).json({
    success: true,
    message: "Order get successfully",
    orders,
  });
});
const allOrders = catchAsyncError(async (req, res, next) => {
  const orders = await Order.find();
  if (!orders) {
    return next(new handleError("orders not found", 404));
  }
  let totalAmount = 0;
  orders.forEach((order) => {
    totalAmount += order.totalPrice;
  });

  res.status(200).json({
    success: true,
    message: "Orders get successfully",
    orders,
    totalAmount,
  });
});

const singleOrder = catchAsyncError(async (req, res, next) => {
  const order = await Order.findById(req.params.id);
  if (!order) {
    return next(new handleError("order not found", 404));
  }

  res.status(200).json({
    success: true,
    message: "Order get successfully",
    order,
  });
});

const deleteOrder = catchAsyncError(async (req, res, next) => {
  const order = await Order.findById(req.params.id);

  if (!order) {
    return next(new handleError("order not found", 400));
  }

  if (order.orderStatus !== "Delivered") {
    return res.status(400).json({
      message: "This order is under process  and cannot be deleted",
    });
  }

  await Order.deleteOne({ _id: req.params.id });

  res.status(200).json({
    success: true,
    message: "Order deleted successfully",
  });
});

const orderStatusUpdate = catchAsyncError(async (req, res, next) => {
  const order = await Order.findById(req.params.id);

  if (!order) {
    return next(new handleError("order not found", 400));
  }

  if (order.orderStatus === "Delivered") {
    return res.status(400).json({
      message: "This order is already  Delivered",
    });
  }

  await Promise.all(
    order.orderItems.map((item) => {
      return updateStock(item.product, item.quantity);
    })
  );

  order.orderStatus = req.body.status;

  if (order.orderStatus == "Delivered") {
    order.DeliveredAt = Date.now();
  }

  await order.save({ validateBeforeSave: false });
  res.status(200).json({
    success: true,
    message: "Order status update successfully",
    order,
  });
});

const updateStock = async (id, quantity) => {
  const product = await Product.findById(id);

  if (!product) {
    throw new Error("Product not found");
  }

  product.stock -= quantity;
  await product.save({ validateBeforeSave: false });
};

export {
  createOrder,
  myOrders,
  allOrders,
  singleOrder,
  deleteOrder,
  orderStatusUpdate,
};
