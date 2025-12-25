import catchAsyncError from "../middleware/catchAsyncError.js";
import handleError from "../utils/handleError.js";
import User from "../models/userModel.js";
import sendToken from "../utils/sendToken.js";
import sendEmail from "../utils/sendEmail.js";
import crypto from "crypto";
import { v2 as cloudinary } from "cloudinary";

const register = catchAsyncError(async (req, res, next) => {
  const { name, email, password, avatar } = req.body;

  const userExist = await User.findOne({ email });

  if (userExist) {
    return next(
      new handleError("user already register, please login to continue", 401)
    );
  }

  const myCloud = await cloudinary.uploader.upload(avatar, {
    folder: "avatar",
    width: "150",
    crop: "scale",
  });

  const user = await User.create({
    name,
    email,
    password,
    avatar: {
      public_id: myCloud.public_id,
      url: myCloud.secure_url,
    },
  });

  sendToken(user, res, 201);
});

const login = catchAsyncError(async (req, res, next) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email }).select("+password");

  if (!user) {
    return next(
      new handleError("user not register, please register to continue", 401)
    );
  }

  const validpassword = await user.comparePassword(password);
  if (!validpassword) {
    return next(new handleError("Invalid email or password", 400));
  }

  sendToken(user, res, 200);
});

const logout = catchAsyncError(async (req, res, next) => {
  res.cookie("token", null, {
    expire: new Date(Date.now(), {
      httpOnly: true,
    }),
  });

  res.status(200).json({
    success: true,
    message: "successfully logout",
  });
});

const userInfo = catchAsyncError(async (req, res, next) => {
  const user = await User.findById(req.user.id);

  if (!user) {
    return next(new handleError("user not found", 404));
  }

  res.status(200).json({
    success: true,
    message: "user get successfully",
    user,
  });
});

const updateProfile = catchAsyncError(async (req, res, next) => {
  const { name, email, avatar } = req.body;

  const updateInfo = {
    name,
    email,
  };

  if (avatar !== "") {
    const user = await User.findById(req.user.id);
    const imgId = user.avatar.public_id;
    await cloudinary.uploader.destroy(imgId);
    const myCloud = await cloudinary.uploader.upload(avatar, {
      folder: "avatar",
      width: "150",
      crop: "scale",
    });

    updateInfo.avatar = {
      public_id: myCloud.public_id,
      url: myCloud.secure_url,
    };
  }

  const user = await User.findByIdAndUpdate(req.user.id, updateInfo, {
    new: true,
    runValidators: true,
  });

  if (!user) {
    return next(new handleError("user not found", 404));
  }

  res.status(200).json({
    success: true,
    message: "User profile update successfully",
    user,
  });
});

const updatePassword = catchAsyncError(async (req, res, next) => {
  const { oldPassword, newPassword, confirmPassword } = req.body;

  const user = await User.findById(req.user.id).select("+password");

  if (!user) {
    return next(new handleError("user not found", 404));
  }

  const checkPasswordMatch = await user.comparePassword(oldPassword);

  if (!checkPasswordMatch) {
    return next(new handleError("old password is incorrect", 401));
  }

  if (newPassword !== confirmPassword) {
    return next(
      new handleError("confirm password  password is not match", 401)
    );
  }

  user.password = newPassword;
  await user.save();

  res.status(200).json({
    success: true,
    message: "User password update successfully",
  });
});

const forgotPassword = catchAsyncError(async (req, res, next) => {
  let resetToken;
  const { email } = req.body;
  const user = await User.findOne({ email });

  if (!user) {
    return next(new handleError("user not found", 404));
  }

  resetToken = user.genrateResetPasswordToken();
  await user.save({ validateBeforeSave: false });

  // const resetPasswordUrl = `${req.protocol}://${req.get("host")}/reset/${resetToken}`;
  const resetPasswordUrl = `${process.env.FRONTEND_URL}/reset/${resetToken}`;
  const message = `Use the following link to reset your password, ${resetPasswordUrl},
    This link will expire in 30 minutes.If you didn't request a password reset, please ignore this message`;

  try {
    await sendEmail({
      email: user.email,
      subject: "Reset Password Request",
      message: message,
    });

    res.status(201).json({
      success: true,
      message: `Email is sent ${user.email}`,
    });
  } catch (error) {
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;
    await user.save({ validateBeforeSave: true });
    return res
      .status(500)
      .json({ message: " Email couldn't be sent, please try again later" });
  }
});

const resetPassword = catchAsyncError(async (req, res, next) => {
  const resetPasswordToken = crypto
    .createHash("sha256")
    .update(req.params.token)
    .digest("hex");

  const user = await User.findOne({
    resetPasswordToken,
    resetPasswordExpire: { $gt: Date.now() },
  });

  if (!user) {
    return next(
      new handleError(
        "reset password token is not valid or has been expired",
        400
      )
    );
  }
  const { newPassword, confirmPassword } = req.body;
  if (newPassword !== confirmPassword) {
    return next(new handleError("Passwords do not match", 400));
  }

  user.password = newPassword;
  (user.resetPasswordToken = undefined),
    (user.resetPasswordExpire = undefined),
    await user.save();
  sendToken(user, res, 200);
});

const allUsers = catchAsyncError(async (req, res, next) => {
  const users = await User.find();

  if (!users) {
    return next(new handleError("users not found", 404));
  }

  res.status(200).json({
    success: true,
    message: "users get successfully",
    users,
  });
});

const singleUser = catchAsyncError(async (req, res, next) => {
  const user = await User.findById(req.params.id);

  if (!user) {
    return next(new handleError("user not found", 404));
  }

  res.status(200).json({
    success: true,
    message: "user get successfully",
    user,
  });
});

const updateUserRole = catchAsyncError(async (req, res, next) => {
  const updateRole = {
    role: req.body.role,
  };
  const user = await User.findByIdAndUpdate(req.params.id, updateRole, {
    new: true,
    runValidators: true,
  });

  if (!user) {
    return next(new handleError("user not found", 404));
  }

  res.status(200).json({
    success: true,
    message: "User role update successfully",
    user,
  });
});

const deleteUser = catchAsyncError(async (req, res, next) => {
  let user = await User.findById(req.params.id);

  if (!user) {
    return next(new handleError("user not found", 404));
  }

  const imageId = user.avatar.public_id;

  await cloudinary.uploader.destroy(imageId);

  user = await User.findByIdAndDelete(req.params.id);

  res.status(200).json({
    success: true,
    message: "users delete successfully",
    user,
  });
});
export {
  register,
  login,
  logout,
  userInfo,
  forgotPassword,
  resetPassword,
  allUsers,
  singleUser,
  updateUserRole,
  updateProfile,
  updatePassword,
  deleteUser,
};
