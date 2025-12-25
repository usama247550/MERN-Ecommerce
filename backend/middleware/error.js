import handleError from "../utils/handleError.js";

const errorMiddleware = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.message = err.message || "Internal server error";

  if (err.name === "CastError") {
    const Message = `invalied resource ${err.path}`;
    err = new handleError(Message, 404);
  }

  res.status(err.statusCode).json({
    success: false,
    Message: err.message,
  });
};

export default errorMiddleware;
