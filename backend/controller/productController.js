import Product from "../models/productModel.js";
import handleError from "../utils/handleError.js";
import catchAsyncError from "../middleware/catchAsyncError.js";
import apiFunctionality from "../utils/apiFunctionality.js";
import { v2 as cloudinary } from "cloudinary";

const createProduct = catchAsyncError(async (req, res) => {
  let image = [];
  if (typeof req.body.image === "string") {
    image.push(req.body.image);
  } else {
    image = req.body.image;
  }

  const imageLink = [];
  for (let i = 0; i < image.length; i++) {
    const result = await cloudinary.uploader.upload(image[i], {
      folder: "product",
    });
    imageLink.push({
      public_id: result.public_id,
      url: result.secure_url,
    });
  }
  req.body.image = imageLink;
  req.body.user = req.user.id;
  const product = await Product.create(req.body);
  res.status(201).json({
    success: true,
    message: "Product create successfully",
    product,
  });
});

const allProducts = catchAsyncError(async (req, res, next) => {
  const limit = 12;
  const apiFeatures = new apiFunctionality(Product.find(), req.query)
    .search()
    .filter();

  const filterQuery = apiFeatures.query.clone();
  const totalProduct = await filterQuery.countDocuments();
  const totalPages = Math.ceil(totalProduct / limit);
  const currPage = Number(req.query.page) || 1;

  if (currPage > totalPages && totalProduct > 0) {
    return next(new handleError("page not exist", 404));
  }

  apiFeatures.pagination(limit);
  const products = await apiFeatures.query;
  if (!products || products.length === 0) {
    return next(new handleError("products not found", 404));
  }

  res.status(200).json({
    success: true,
    message: "Products get successfully",
    products,
    totalProduct,
    totalPages,
    limit,
    currPage,
  });
});

const getAllProducts = catchAsyncError(async (req, res, next) => {
  const product = await Product.find();

  res.status(200).json({
    success: true,
    message: "Products get successfully",
    product,
  });
});

const getSingleProduct = catchAsyncError(async (req, res, next) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    return next(new handleError("product not found", 404));
  }

  res.status(200).json({
    success: true,
    message: "Product get successfully",
    product,
  });
});

const updateProduct = catchAsyncError(async (req, res, next) => {
  let productExist = await Product.findById(req.params.id);

  if (!productExist) {
    return next(new handleError("Product not found", 404));
  }

  let images = [];

  if (typeof req.body.image === "string") {
    images.push(req.body.image);
  } else if (Array.isArray(req.body.image)) {
    images = req.body.image;
  }

  if (images.length > 0) {
    for (let i = 0; i < productExist.image.length; i++) {
      await cloudinary.uploader.destroy(productExist.image[i].public_id);
    }

    // upload new images
    const imageLinks = [];
    for (let i = 0; i < images.length; i++) {
      const result = await cloudinary.uploader.upload(images[i], {
        folder: "product",
      });
      imageLinks.push({
        public_id: result.public_id,
        url: result.secure_url,
      });
    }

    req.body.image = imageLinks;
  }

  // req.body.user = req.user.id;
  const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  res.status(200).json({
    success: true,
    message: "Product updated successfully",
    product,
  });
});

const deleteProduct = catchAsyncError(async (req, res, next) => {
  const product = await Product.findByIdAndDelete(req.params.id);

  if (!product) {
    return next(new handleError("product not found", 404));
  }

  res.status(200).json({
    success: true,
    message: "Product deleted successfully",
  });
});

const createReview = catchAsyncError(async (req, res, next) => {
  const { rating, comment, productId } = req.body;
  const review = {
    user: req.user.id,
    name: req.user.name,
    rating: rating,
    comment: comment,
  };
  const product = await Product.findById(productId);
  if (!product) {
    return next(new handleError("Product not found"));
  }

  const reviewExist = product.reviews.find((review) => {
    return review.user.toString() === req.user.id.toString();
  });
  if (reviewExist) {
    product.reviews.forEach((review) => {
      if (review.user.toString() === req.user.id.toString()) {
        (review.rating = rating), (review.comment = comment);
      }
    });
  } else {
    product.reviews.push(review);
  }

  product.numOfReviews = product.reviews.length;
  let sum = 0;
  product.reviews.forEach((review) => {
    sum += review.rating;
  });
  product.rating =
    product.reviews.length > 0 ? sum / product.reviews.length : 0;

  await product.save({ validateBeforeSave: true });
  res.status(201).json({
    success: true,
    message: "Product review created successfully",
  });
});

const getReviews = catchAsyncError(async (req, res, next) => {
  const product = await Product.findById(req.query.id);
  if (!product) {
    return next(new handleError("Product not found"));
  }

  res.status(200).json({
    success: true,
    message: "Product reviews get successfully",
    reviews: product.reviews,
  });
});

const deleteReview = catchAsyncError(async (req, res, next) => {
  const product = await Product.findById(req.query.productId);
  if (!product) {
    return next(new handleError("Product not found"));
  }

  const reviews = product.reviews.filter((review) => {
    return review._id.toString() != req.query.reviewId.toString();
  });

  let sum = 0;
  reviews.forEach((review) => {
    sum += review.rating;
  });
  const rating = reviews.length > 0 ? sum / reviews.length : 0;
  const numOfReviews = reviews.length;

  const updatedProduct = await Product.findByIdAndUpdate(
    req.query.productId,
    { reviews, rating, numOfReviews },
    {
      new: true,
      runValidators: true,
    }
  );

  res.status(200).json({
    success: true,
    message: "Product review deleted successfully",
    reviews: updatedProduct.reviews,
    numOfReviews: updatedProduct.numOfReviews,
  });
});

export {
  createProduct,
  allProducts,
  getAllProducts,
  updateProduct,
  deleteProduct,
  getSingleProduct,
  createReview,
  getReviews,
  deleteReview,
};
