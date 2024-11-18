const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
    {
        firstName: {
            type: String,
            require: [true, "Please Enter Your First Name"],
        },
        lastName: {
            type: String,
            require: [true, "Please Enter Your Last Name"],
        },
        email: {
            type: String,
            require: [true, "Please Enter Your Email"],    
        },
        password: {
            type: String,
            require: [true, "Please Enter Your Password"], 
        },
        age: {
            type: Number,
            require: [true, "Please Enter Your Age"],
        },
        gender: {
            type: String,
            require: [true, "Please Enter Your Gender"],
        },
        bloodGroup: { // Correcting this from BloodGroup to bloodGroup to keep consistency
            type: String,
            require: [true, "Please Enter Your Blood Group"],
        },
        phoneNumber: {
            type: Number,
            require: [true, "Please Enter Your Phone Number"],
        },
    }
);

// User model ko export karo
module.exports = mongoose.model("User", userSchema);