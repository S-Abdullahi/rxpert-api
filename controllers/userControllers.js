const asyncHandler = require("express-async-handler");
const User = require("../models/userModels.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

//@desx POST user
//@route POST /api/register
//@access public
const registerUser = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;
  if (!username || !email || !password) {
    res.status(400);
    throw new Error("All fields required");
  }
  const availableUser = await User.findOne({ email });
  console.log(availableUser);
  if (availableUser) {
    res.status(400);
    throw new Error("Email already exist");
  }
  if (password.length < 5) {
    res.status(400);
    throw new Error("Password should be more than 5 characters");
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await User.create({
    username,
    email: email.trim(),
    password: hashedPassword,
  });
  res.status(201).json({ _id: user._id, username });
});

//@desx POST user
//@route POST /api/login
//@access public
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    req.status(400);
    throw new Error("All fields are required");
  }
  const user = await User.findOne({ email });
  const isPassword = bcrypt.compare(password, user.password);
  if (user && isPassword) {
    const accessToken = jwt.sign(
      {
        user: {
          username: user.username,
          email: user.email,
          id: user._id,
        },
      },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "10m" }
    );
    res.status(200).json({ accessToken });
  } else {
    res.status(401);
    throw new Error("Email or Password are invalid");
  }

  res.status(200).json({ message: "Create User" });
});

//@desx GET user
//@route GET /api/users
//@access private
const getUser = asyncHandler(async (req, res) => {
  
  res.status(200).json(req.user);
});


module.exports = { registerUser, loginUser, getUser };
