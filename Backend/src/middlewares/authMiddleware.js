import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import jwt from "jsonwebtoken";
import { Admin } from "../models/admin.model.js";

export const verifyJWT = asyncHandler(async (req, _, next) => {
  const rawAuth = req.headers.authorization;
  //console.log("Raw Auth Header:", rawAuth);

  const token = req.cookies?.accessToken || rawAuth?.split(" ")[1];
  //console.log("Extracted token:", token);

  if (!token) {
    //console.log("No token provided");
    throw new ApiError(401, "Unauthorized request");
  }

  try {
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    //console.log("Decoded JWT:", decoded);

    const user = await Admin.findById(decoded.id).select("-password -refreshToken");

    if (!user) {
      //console.log("User not found");
      throw new ApiError(401, "Invalid Access Token");
    }

    req.user = user;
    next();
  } catch (err) {
    //console.log("JWT Error:", err.message);
    throw new ApiError(401, "Invalid or expired token");
  }
});
