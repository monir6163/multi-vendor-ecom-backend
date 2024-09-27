import mongoose from "mongoose";
import slugify from "slugify";

const subscriptionSchema = new mongoose.Schema(
  {
    plan: {
      type: String,
      enum: ["free", "basic", "premium"],
      required: true,
    },
    startDate: {
      type: Date,
      required: true,
    },
    endDate: {
      type: Date,
      required: true,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { _id: false, timestamps: false, versionKey: false }
);
const vendorSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    storeName: {
      type: String,
      required: true,
      trim: true,
      unique: true,
      index: true,
    },
    storeSlug: {
      type: String,
      unique: true,
      trim: true,
    },
    storeLogo: {
      public_id: String,
      url: String,
    },
    storeBanner: {
      public_id: String,
      url: String,
    },
    storeDescription: {
      type: String,
    },
    isVarified: {
      type: Boolean,
      default: false,
    },
    products: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
      },
    ],
    subscription: subscriptionSchema,
  },
  { timestamps: true, versionKey: false }
);

vendorSchema.pre("save", function (next) {
  this.storeSlug = slugify(this.storeName, { lower: true });
  next();
});

export const Vendor = mongoose.model("Vendor", vendorSchema);
