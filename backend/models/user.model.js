const mongoose = require('mongoose');

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: [true, "email is required"],
        trim: true,
        match: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
        minLength: [2, "minimum length is 2"],
        maxLength: [40, "maximum length is 40"],
        unique: [true, "email should be unique"],
    },
    password: {
        type: String,
        required: [true, "email is required"],
        match: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>]).{8,}$/,
        select: false
    }
}, { timestamps: true });



userSchema.statics.hashPassword = async function(password) {
    return await bcrypt.hash(password, 10);
}

userSchema.methods.isValidPassword = async function(password) {
    return await bcrypt.compare(password, this.password);
}


userSchema.methods.generateJWT = async function() {
    return jwt.sign({ email: this.email }, process.env.JWT_SECRET);
}


module.exports = mongoose.model("User", userSchema);