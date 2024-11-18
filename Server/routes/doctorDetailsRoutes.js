const express = require("express");
const router = express.Router();
const { registerDoctor } = require("../controllers/doctorDetailsController");

// Doctor registration route
router.post("/register", registerDoctor);

module.exports = router;