import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      index: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ["user", "vendor", "admin"],
      default: "user",
    },
    avatar: {
      public_id: String,
      url: String,
    },
    address: {
      city: String,
      street: String,
      postalCode: String,
      state: String,
      country: String,
    },
    phone: {
      type: String,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    refreshToken: {
      type: String,
    },
  },
  { timestamps: true, versionKey: false }
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  this.password = await bcrypt.hash(this.password, 10);
});

userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

userSchema.methods.createAccessToken = function () {
  return jwt.sign(
    {
      _id: this._id,
    },
    process.env.ACESS_SECRET,
    {
      expiresIn: process.env.ACCESS_SECRET_EXPIRES_IN,
    }
  );
};

userSchema.methods.createRefreshToken = function () {
  return jwt.sign(
    {
      _id: this._id,
    },
    process.env.REFRESH_SECRET,
    {
      expiresIn: process.env.REFRESH_SECRET_EXPIRES_IN,
    }
  );
};

export const User = mongoose.model("User", userSchema);
