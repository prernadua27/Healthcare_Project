const express = require("express");
const router = express.Router();
const { registerUser, loginUser } = require("../controllers/userController");

// User registration route
router.post("/register", registerUser);

// User login route
router.post("/login", loginUser);

//Route to get the user specific data
router.get("/myaccount",getUserProfile)

//Route for updating the user specific data
router.patch("/myaccount",getUserProfile)

module.exports = router;