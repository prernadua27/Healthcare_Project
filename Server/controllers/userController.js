const asyncHandler = require("express-async-handler");
const User = require("../models/userModels"); // Ensure this path is correct
const bcrypt = require("bcrypt");

// Register user
const registerUser = asyncHandler(async (req, res) => {
    const { firstName, lastName, email, password, age, gender, bloodGroup, phoneNumber } = req.body;

    if (!firstName || !lastName || !email || !password || !age || !gender || !bloodGroup || !phoneNumber) {
        res.status(400);
        throw new Error("Please fill all fields");
    }

    // Check if user already exists
    const userExists = await User.findOne({ email });
    if (userExists) {
        res.status(400);
        throw new Error("User already exists");
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create user
    const user = await User.create({
        firstName,
        lastName,
        email,
        password: hashedPassword,
        age,
        gender,
        bloodGroup,
        phoneNumber
    });

    if (user) {
        res.status(201).json({
            _id: user.id,
            email: user.email
        });
    } else {
        res.status(400);
        throw new Error("Invalid user data");
    }
});

// Login user
const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        res.status(400);
        throw new Error("Please enter both email and password");
    }

    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
        res.status(400);
        throw new Error("User not found");
    }

    // Check if password matches
    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
        res.status(400);
        throw new Error("Invalid email or password");
    }

    // Successful login
    res.status(200).json({
        _id: user.id,
        email: user.email,
        message: "Login successful"
    });
});

const getUserProfile = async (req, res) => {
    try {
        const email = req.body;
        const data = await User.findOne(email);
        if (!data) return res.status(401).json({ err });
        return res.status(200).json({ data });
    } catch (err) {
        return res.status(500).json({ err, message });
    }
};

const updateUserProfile=async(req,res)=>{
    try {
        const { email } = req.body;
        if (!email) return res.status(400).json({ message: "Email is required" });
        const updatedUser = await User.findOneAndUpdate({ email }, updateData, { new: true });
        if (!updatedUser) return res.status(404).json({ message: "User not found" });

        res.status(200).json({ data: updatedUser });
    } catch (err){
        res.status(500).json({ message:"error",error: err.message});
    }
};

module.exports = { registerUser, loginUser };