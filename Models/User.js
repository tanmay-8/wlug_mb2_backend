const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: true,
        unique: true,
    },
    branch: {
        type: String,
        required: true,
    },
    mobileNo: {
        type: String,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    favoriteQuote: {
        type: String,
        required: true,
    },
    whyJoinClub: {
        type: String,
        required: true,
    },
    resume: {
        type: String,
        required: true,
    },
    photo: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        required: true,
        default: Date.now,
    },
});

const User = mongoose.model("user", userSchema);

module.exports = User;
