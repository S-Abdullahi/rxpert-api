const Blog = require("../models/blogModels");
const asyncHandler = require("express-async-handler");
//@desc Get All Blogs
//@route GET /api/blog
//@access public
const getBlogs = asyncHandler(async (req, res) => {
  const blogs = await Blog.find();
  res.status(200).json(blogs);
});
//@desc Get Single Blog
//@route GET /api/blog/:id
//@access public
const getSingleBlog = asyncHandler(async (req, res) => {
  const blog = await Blog.findById(req.params.id);
  if (!blog) {
    res.status(404);
    throw new Error("Blog post not found");
  }
  res.status(200).json(blog);
});

//@desc Create A Blogs
//@route POST /api/blog
//@access public
const createBlog = asyncHandler(async (req, res) => {
  const { title, description, imageUrl } = req.body;
  if (!title || !description || !imageUrl) {
    res.status(400);
    throw new Error("Fill all fields");
  }
  console.log("request body is", req.body);
  const blog = await Blog.create({
    title,
    description,
    imageUrl,
  });
  res.status(201).json(blog);
});

//@desc Update A Blogs
//@route PUT /api/blog/:id
//@access public
const updateBlog = asyncHandler(async (req, res) => {
  const blog = await Blog.findById(req.params.id);
  if (!blog) {
    res.status(404);
    throw new Error(" Blog post not found");
  }
  const updatedBlog = await Blog.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  res.status(200).json(updatedBlog);
});

//@desc Delete A Blogs
//@route DELETE /api/blog/:id
//@access public
const deleteBlog = asyncHandler(async (req, res) => {
  const blog = await Blog.findById(req.params.id);
  if (!blog) {
    res.status(404);
    throw new Error("Blog post not found");
  }
  blog.deleteOne({_id: req.params.id})
  res.status(200).json({ message: "blog post deleted successfully" });
});

module.exports = {
  getBlogs,
  getSingleBlog,
  createBlog,
  updateBlog,
  deleteBlog,
};
