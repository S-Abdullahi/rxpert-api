const express = require("express");
const router = express.Router();
const {
  getBlogs,
  getSingleBlog,
  createBlog,
  updateBlog,
  deleteBlog,
} = require("../controllers/blogControllers");
const validateToken = require("../middleware/validateTokenHandler");

router.route("/").get(getBlogs);

router.route("/:id").get(getSingleBlog);

router.route("/").post(validateToken, createBlog);

router.route("/:id").put(validateToken, updateBlog);

router.route("/:id").delete(validateToken, deleteBlog);

module.exports = router;
