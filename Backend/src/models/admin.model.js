// admin.model.js

import mongoose from "mongoose";
import jwt from "jsonwebtoken";

const adminSchema = new mongoose.Schema({
    hospital: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
    },
    password: {
        type: String,
        required: true,
    },
}, {
    timestamps: true,
});

adminSchema.methods.generateAccessToken = function () {
    return jwt.sign(
        { id: this._id, role: "admin" },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: "1d" }
    );
};

export const Admin = mongoose.model("Admin", adminSchema);
