const mongoose = require("mongoose");

const doctorSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "Please Enter Your Name"],
        },
        email: {
            type: String,
            required: [true, "Please Enter Your Email"],    
        },
        speciality: {
            type: String,
            required: [true, "Please Enter Your Speciality"], 
        },
        phoneNumber: {
            type: Number,
            required: [true, "Please Enter Your Phone Number"],
        },
        experience: {
            type: Number,
            required: [true, "Please Enter Your Experience"],
        },
        address: {
            type: String,
            required: [true, "Please Enter Your Address"],
        }
    },{timestamps:true}
);

// Export the Doctor model
module.exports = mongoose.model("Doctor", doctorSchema);