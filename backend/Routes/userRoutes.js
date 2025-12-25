import express from "express";
const router = express.Router();
import {
  allUsers,
  login,
  register,
  logout,
  userInfo,
  forgotPassword,
  resetPassword,
  singleUser,
  updateUserRole,
  updateProfile,
  updatePassword,
  deleteUser,
} from "../controller/userController.js";

import { varifyUserAuth, roleBaseAccess } from "../middleware/userAuth.js";

router.post("/register", register);
router.post("/login", login);
router.post("/logout", logout);
router.get("/profile", varifyUserAuth, userInfo);
router.put("/updateProfile", varifyUserAuth, updateProfile);
router.put("/updatePassword", varifyUserAuth, updatePassword);
router.post("/password/forgot", forgotPassword);
router.post("/reset/:token", resetPassword);

router.get(
  "/admin/allUsers",
  varifyUserAuth,
  roleBaseAccess("admin"),
  allUsers
);
router.get(
  "/admin/singleUser/:id",
  varifyUserAuth,
  roleBaseAccess("admin"),
  singleUser
);
router.put(
  "/admin/updateUserRole/:id",
  varifyUserAuth,
  roleBaseAccess("admin"),
  updateUserRole
);
router.delete(
  "/admin/deleteUser/:id",
  varifyUserAuth,
  roleBaseAccess("admin"),
  deleteUser
);

export default router;
