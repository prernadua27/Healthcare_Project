const asyncHandler = require("express-async-handler");
const Doctor = require("../models/doctorDetailsModels");
const bcrypt = require("bcrypt");
require('dotenv').config();

const registerDoctor = asyncHandler(async (req, res) => {
    const { name, email, speciality, phoneNumber, experience, address } = req.body;

    // Check if all fields are provided
    if (!name || !email || !speciality || !phoneNumber || !experience || !address) {
        res.status(400);
        throw new Error("Please add all fields");
    }

    // Check if user already exists
    const userExists = await Doctor.findOne({ email });

    if (userExists) {
        res.status(400);
        throw new Error("User already exists");
    }

    // Create user
    const user = await Doctor.create({
        name,
        email,
        speciality, 
        phoneNumber,
        experience,
        address,
    });

    if (user) { 
        res.status(201).json({
            _id: user.id,
            name: user.name,
            email: user.email,
            speciality: user.speciality,
            phoneNumber: user.phoneNumber,
            experience: user.experience,
            address: user.address
        });
    } else {
        res.status(400);
        throw new Error("Invalid user data");
    }
});

module.exports = { registerDoctor };