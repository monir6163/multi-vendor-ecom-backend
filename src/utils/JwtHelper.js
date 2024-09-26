import { appError } from "../middlewares/errorHandler.js";
import { User } from "../models/userModel.js";

const refreshTokenOption = {
  httpOnly: true,
  secure: true,
  sameSite: "none",
};

const accessTokenOption = {
  httpOnly: true,
  secure: true,
  sameSite: "none",
};

const accessAndRefreshToken = async (userId) => {
  try {
    const user = await User.findById(userId);
    const accessToken = user.createAccessToken();
    const refreshToken = user.createRefreshToken();
    user.refreshToken = refreshToken;
    await user.save({ validateBeforeSave: false });
    return { accessToken, refreshToken };
  } catch (error) {
    console.log(error);
    throw new appError("Something went wrong", 500);
  }
};

export { accessAndRefreshToken, accessTokenOption, refreshTokenOption };
