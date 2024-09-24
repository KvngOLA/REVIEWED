const express = require("express");
const {
  homePage,
  getAllUsers,
  createUser,
  getUserbyName,
  deleteUser,
  userLogin,
  userProfile,
  updateUser,
  logout,
  adminOnly,
} = require("../controller/controller");
const upload = require("../fileuploads/fileuploads");
const {
  isAuthenticated,
  isSuperAdmin,
  generateToken,
} = require("../middleware/auth");
const router = express.Router();

router.get("/", homePage);

router.get("/all", getAllUsers);

router.post("/create", upload.single("file"), createUser);

router.get("/user/:name", getUserbyName);

router.delete("/user/:name", deleteUser);

router.post("/login", generateToken, userLogin);

router.get("/profile", isAuthenticated, userProfile);

router.patch("/user/:name", isAuthenticated, upload.single("file"), updateUser);

router.get("/logout", logout, logout);

router.get("/admin", isAuthenticated, isSuperAdmin, adminOnly);

module.exports = router;
