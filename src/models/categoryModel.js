import mongoose from "mongoose";

const categorySchema = new mongoose.Schema(
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
    categoryImage: {
      public_id: String,
      url: String,
    },

    parentCategories: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
    },
    subCategories: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category",
      },
    ],
  },
  { timestamps: true, versionKey: false }
);
export const Category = mongoose.model("Category", categorySchema);
