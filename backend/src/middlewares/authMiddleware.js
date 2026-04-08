import jwt from "jsonwebtoken";
import User from "../models/User.js";

/**
 * Protect routes — require authentication.
 * Reads JWT from cookies, verifies it, and attaches user to req.user.
 */
export const protect = async (req, res, next) => {
  // console.log("COOKIES:", req.cookies);

  const token = req.cookies?.token;

  if (!token) {
    return res.status(401).json({
      success: false,
      message: "No token found",
    });
  }

  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  // console.log("DECODED:", decoded);

  const user = await User.findById(decoded.id).select("-password");

  if (!user) {
    return res.status(401).json({
      success: false,
      message: "User not found for this token",
    });
  }

  req.user = user;

  next();
};

/**
 * Role-based access control.
 * Usage: authorizeRoles("admin", "owner")
 */
export const authorizeRoles = (...roles) => {
  return (req, res, next) => {
    if (!req.user || !roles.includes(req.user.role)) {
      return res.status(403).json({
        success: false,
        message: `Access denied — requires one of: ${roles.join(", ")}`,
      });
    }
    next();
  };
};
