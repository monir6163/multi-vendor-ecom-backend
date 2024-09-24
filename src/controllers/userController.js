//@desc Register a new user
//@route POST /api/v1/users/register
//@access Public
import expressAsyncHandler from "express-async-handler";
import { appError } from "../middlewares/errorHandler.js";
import { User } from "../models/userModel.js";
import { generateToken } from "../utils/JwtHelper.js";
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
  // Check if the user exists
  const user = await User.findOne({ email });
  if (!user) {
    throw new appError("Invalid credentials", 400);
  }
  // Check if the password is correct
  const isMatch = await user.matchPassword(password);
  if (!isMatch) {
    throw new appError("Invalid credentials", 400);
  }
  return res.status(200).json({
    success: true,
    message: "User logged in successfully",
    data: {
      id: user._id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
    },
  });
});
