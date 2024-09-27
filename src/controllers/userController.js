//@desc Register a new user
//@route POST /api/v1/users/register
//@access Public
import expressAsyncHandler from "express-async-handler";
import { appError } from "../middlewares/errorHandler.js";
import { User } from "../models/userModel.js";
import {
  accessAndRefreshToken,
  accessTokenOption,
  refreshTokenOption,
} from "../utils/JwtHelper.js";
import {
  loginUserValidation,
  registerUserValidation,
} from "../validation/userValidation.js";

export const registerUser = expressAsyncHandler(async (req, res) => {
  const { name, email, password } = registerUserValidation.parse(req.body);
  // Check if the user already exists
  const userExists = await User.findOne({ email });
  if (userExists) {
    throw new appError("User already exists", 400);
  }
  const user = new User({
    name,
    email,
    password,
  });
  await user.save();
  return res.status(201).json({
    success: true,
    message: "User registered successfully",
  });
});

//@desc Login a user
//@route POST /api/v1/users/login
//@access Public
export const loginUser = expressAsyncHandler(async (req, res) => {
  const { email, password } = loginUserValidation.parse(req.body);
  const user = await User.findOne({ email });
  if (!user) {
    throw new appError("Invalid credentials", 400);
  }
  const isMatch = await user.matchPassword(password);
  if (!isMatch) {
    throw new appError("Invalid credentials", 400);
  }
  const { accessToken, refreshToken } = await accessAndRefreshToken(user._id);
  res.cookie("refreshToken", refreshToken, refreshTokenOption);
  res.cookie("accessToken", accessToken, accessTokenOption);
  return res.status(200).json({
    success: true,
    message: "User logged in successfully",
    data: {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      accessToken: accessToken,
      refreshToken: refreshToken,
    },
  });
});

//@desc get user profile
//@route POST /api/v1/users/profile
//@access Private
export const userProfile = expressAsyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id).select(
    "-password -refreshToken"
  );
  if (!user) {
    throw new appError("User not found", 404);
  }
  return res.status(200).json({
    success: true,
    message: "User profile fetched successfully",
    data: user,
  });
});

//@desc get all users profile
//@route POST /api/v1/users/allprofiles
//@access Private Admin
export const allUserProfiles = expressAsyncHandler(async (req, res) => {
  const users = await User.find().select("-password -refreshToken");
  if (!users) {
    throw new appError("No users found", 404);
  }
  return res.status(200).json({
    success: true,
    message: "All users profile fetched successfully",
    data: users,
  });
});

//@desc update user profile
//@route PUT /api/v1/users/profile
//@access Private
export const updateUserProfile = expressAsyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id).select(
    "-password -refreshToken"
  );
  if (!user) {
    throw new appError("User not found", 404);
  }
  const { name, email, phone, address } = req.body;
  user.name = name || user.name;
  user.email = email || user.email;
  user.phone = phone || user.phone;
  user.address = address || user.address;
  await user.save();
  return res.status(200).json({
    success: true,
    message: "User profile updated successfully",
    data: user,
  });
});
