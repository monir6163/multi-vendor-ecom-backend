import expressAsyncHandler from "express-async-handler";
import jwt from "jsonwebtoken";
import { User } from "../models/userModel.js";
import { appError } from "./errorHandler.js";

export const protect = expressAsyncHandler(async (req, res, next) => {
  let token;
  if (
    (req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")) ||
    req.cookies?.accessToken ||
    req.body?.refreshToken
  ) {
    token =
      req.cookies?.accessToken ||
      req.headers?.authorization?.split(" ")[1] ||
      req.body?.refreshToken;
  }
  if (!token) {
    throw new appError("Not authorized to access", 401);
  }
  try {
    const decoded = jwt.verify(token, process.env.ACESS_SECRET);
    const user = await User.findById(decoded._id).select(
      "-password -refreshToken"
    );
    if (!user) {
      throw new appError("No user found", 404);
    }
    req.user = user;
    next();
  } catch (error) {
    throw new appError("Not authorized", 401);
  }
});

export const authorize = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      throw new appError("You don't have permission", 403);
    }
    next();
  };
};
