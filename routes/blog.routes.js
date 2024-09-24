const express = require("express");
const { viewBlog, createBlog } = require("../controller/blogController");
const { isAuthenticated } = require("../middleware/auth");
const router = express.Router();

router.get("/view", isAuthenticated, viewBlog);

router.post("/create", isAuthenticated, createBlog);

module.exports = router;
