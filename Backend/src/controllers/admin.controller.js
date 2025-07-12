import jwt from "jsonwebtoken";
import Admin from "../models/admin.model.js";
import bcrypt from "bcryptjs";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js"

const registerAdmin = asyncHandler(async (req, res) => {

    const { username, password } = req.body;

    try {

        const existing = await Admin.findOne({ username });

        if (existing) throw new ApiError(400, "Admin already exists");

        const hashedPassword = await bcrypt.hash(password, 10);
        const newAdmin = new Admin({ username, password: hashedPassword });

        await newAdmin.save();

        return res.status(201).json(
            new ApiResponse(200, newAdmin, "Admin registered successfully"))

    } catch (err) {

        throw new ApiError(500, "Registration failed")
    }
})

const loginAdmin = asyncHandler(async (req, res) => {

    const { username, password } = req.body;

    try {

        const admin = await Admin.findOne({ username });

        if (!admin) throw new ApiError(404, "Admin not found")

        const isMatch = await bcrypt.compare(password, admin.password);

        if (!isMatch) throw new ApiError(401, "Incorrect failed")

        const token = jwt.sign({ id: admin._id }, process.env.JWT_SECRET, { expiresIn: "1d" });

        return res.status(201).json(
            new ApiResponse(200, token, "Admin registered successful"))


    } catch (err) {
        throw new ApiError(500, "Login error")
    }
});

const checkPassword = asyncHandler(async (req, res) => {
    const { password } = req.body;
    const adminId = req.user?.id;

    if (!adminId) {
        throw new ApiError(401, "Unauthorized");
    }

    try {
        const admin = await Admin.findById(adminId);

        if (!admin) {
            throw new ApiError(404, "Admin not found");
        }

        const isMatch = await bcrypt.compare(password, admin.password);

        if (!isMatch) {
            throw new ApiError(401, "Password does not match");
        }

        return res.status(200).json(
            new ApiResponse(200, null, "Password is correct")
        );
    } catch (err) {
        throw new ApiError(500, "Password check failed");
    }
});

export {
    registerAdmin,
    loginAdmin,
    checkPassword
}

