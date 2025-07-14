import jwt from "jsonwebtoken";
import { Admin } from "../models/admin.model.js";
import bcrypt from "bcryptjs";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";

const generateAccess = async (userId) => {
    try {
        const user = await Admin.findById(userId)
        const accessToken = user.generateAccessToken()

        await user.save({ validateBeforeSave: false })

        return { accessToken }

    } catch (error) {
        throw new ApiError(500,error, "Something went wrong while generating access token")
    }
}

const registerAdmin = asyncHandler(async (req, res) => {
    const { hospital, email, password } = req.body;

    if ([hospital, email, password].some((field) => !field?.trim())) {
        throw new ApiError(400, "All fields are required");
    }

    const existingAdmin = await Admin.findOne({ email });
    if (existingAdmin) {
        throw new ApiError(409, "User with email already exists");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const admin = await Admin.create({
        hospital,
        email: email.toLowerCase(),
        password: hashedPassword,
    });

    const adminData = await Admin.findById(admin._id).select("-password");

    return res
        .status(201)
        .json(new ApiResponse(201, { admin: adminData }, "Admin registered successfully"));
});

const loginAdmin = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        throw new ApiError(400, "Email and password are required");
    }

    const admin = await Admin.findOne({ email: email.toLowerCase() });
    if (!admin) {
        throw new ApiError(404, "Admin not found");
    }

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
        throw new ApiError(401, "Incorrect credentials");
    }

    const { accessToken } = await generateAccess(admin._id)

    const accessTokenOptions = {
        httpOnly: true,
        secure: false,
        sameSite: "None",
        maxAge: 24 * 60 * 60 * 1000
    };

    const adminData = await Admin.findById(admin._id).select("-password");

    return res
        .status(200)
        .cookie("accessToken", accessToken, accessTokenOptions)
        .json(new ApiResponse(200, {
            user: adminData, accessToken
        }, "User logged In Successfully"));
});

const checkPassword = asyncHandler(async (req, res) => {
    const { password } = req.body;
    const adminId = req.user?.id;

    if (!adminId) {
        throw new ApiError(401, "Unauthorized");
    }

    const admin = await Admin.findById(adminId);
    if (!admin) {
        throw new ApiError(404, "Admin not found");
    }

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
        throw new ApiError(401, "Password does not match");
    }

    return res.status(200).json(new ApiResponse(200, null, "Password is correct"));
});

const getCurrentAdmin = asyncHandler(async (req, res) => {
    return res
        .status(200)
        .json(new ApiResponse(
            200,
            req.user,
            "User fetched successfully"
        ))
})

export {
    registerAdmin,
    loginAdmin,
    checkPassword,
    getCurrentAdmin
};

