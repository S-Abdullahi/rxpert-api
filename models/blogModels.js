const mongoose = require("mongoose");

const blogSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "please add the blog title"],
    },
    description: {
      type: String,
      required: [true, "please add the description"],
    },
    imageUrl: {
      type: String,
      required: [true, "please add the image url"],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Blog', blogSchema)
