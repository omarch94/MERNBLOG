const mongoose = require("mongoose");

// Category Schema
const verifyTokenSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    token: {
        type: String,
        required: true,
     },
}, {
    timestamps: true,
});

// Category Model
const VerifyToken = mongoose.model("verifyToken", verifyTokenSchema);

// Validate Create Category



module.exports = {VerifyToken}