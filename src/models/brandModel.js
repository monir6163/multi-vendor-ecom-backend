import mongoose from "mongoose";

const brandSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      unique: true,
      index: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      index: true,
      trim: true,
    },
    description: {
      type: String,
    },
    brandLogo: {
      public_id: String,
      url: String,
    },
  },
  { timestamps: true, versionKey: false }
);
export const Brand = mongoose.model("Brand", brandSchema);
