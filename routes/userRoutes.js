const express = require("express");
const router = express.Router();
const {
  registerUser,
  loginUser,
  getUser,
} = require("../controllers/userControllers");
const validateToken = require("../middleware/validateTokenHandler.js");

router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/current").get(validateToken,getUser);


module.exports = router;
