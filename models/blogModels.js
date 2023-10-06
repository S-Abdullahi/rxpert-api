const mongoose = require("mongoose");

const blogSchema = mongoose.Schema(
  {
    imgUrl: {
      type: String,
      required: [true, "please add img url"],
    },
    heading: {
      type: String,
      required: [true, "please add the heading"],
    },
    textPlain: {
      type: String,
      required: [true, "please add text plain"],
    },
    textColored: {
      type: String,
      required: [true, "please add text colored"],
    },
    preview: {
      type: String,
      required: [true, "please add preview text"],
    },
    body: {
      type: String,
      required: [true, "please add body text"],
    }
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Blog', blogSchema)
