import catchAsyncError from "../middleware/catchAsyncError.js";
import handleError from "../utils/handleError.js";
import jwt from "jsonwebtoken";
import User from "../models/userModel.js";

const varifyUserAuth = catchAsyncError(async (req, res, next) => {
  const { token } = req.cookies;

  if (!token) {
    return next(new handleError("invalid user", 401));
  }

  const decoded = jwt.verify(token, process.env.SECRET_ID);
  req.user = await User.findById(decoded.id);

  next();
});
const roleBaseAccess = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({
        message: `${req.user.role} is not allowed to access the resource`,
      });
    }
    next();
  };
};

export { varifyUserAuth, roleBaseAccess };
