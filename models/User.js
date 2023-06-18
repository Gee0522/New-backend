const mongoose = require("mongoose");
const bcrypt = require("bcrypt");


const userSchema = new mongoose.Schema({
    fullName:{
        type: String,
        required: [true, "Full Name is required"]
    },
    email:{
        type: String,
        required: [true, "Email is required"]
    },
    password:{
        type: String,
        required: [true, "Password is required"]
    },
    isAdmin:{
        type: Boolean,
        default: false
    },
    mobileNo: {
        type: Number,
        required: [true, "Mobile number is required"]
    },
    createdOn:{
        type: Date,
        default: new Date()
    },
    cartItem: [
        {   
            productId:{
                type: String,
                required:[true, "Product ID is required"]
            },
            quantity:{
                type: Number,
                default: 1
            },
            checkOutOn: {
                type: Date,
                default: new Date()
            },
            status:{
                type: String,
                default: "Complete"
            }
        }

    ]

});



module.exports = mongoose.model("User", userSchema);