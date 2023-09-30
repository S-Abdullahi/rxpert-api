const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  username: {
    type: String,
    required: [true, "Please add the user name"],
  },
  email: {
    type: String,
    required: [true, "please add the email address"],
    unique: [true, "Email address already exist"],
  },
  password: {
    type: String,
    required: [true, "Please add password"]
  }
}, {
    timeStamps: true
});

module.exports = mongoose.model('User', userSchema)
