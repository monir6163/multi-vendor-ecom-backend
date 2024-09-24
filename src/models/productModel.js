import mongoose from "mongoose";

const variationSchema = new mongoose.Schema({
  color: {
    type: String,
  },
  size: {
    type: String,
  },
  price: {
    type: Number,
    required: true,
  },
  stock: {
    type: Number,
    required: true,
  },
  quantity: {
    type: Number,
    min: 0,
    required: true,
  },
  image: {
    public_id: String,
    url: String,
  },
});
const productSchema = new mongoose.Schema(
  {
    vendorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Vendor",
      required: true,
    },
    categoryId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
    brandId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Brand",
      required: true,
    },
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
    price: {
      type: Number,
      required: true,
    },

    description: {
      type: String,
    },
    image: [
      {
        public_id: String,
        url: String,
      },
    ],
    variations: [variationSchema],
    ratingAvg: {
      type: Number,
      default: 0,
    },
    ratingCount: {
      type: Number,
      default: 0,
    },
    reviews: [{ type: mongoose.Schema.Types.ObjectId, ref: "Review" }],
  },
  { timestamps: true, versionKey: false }
);

export const Product = mongoose.model("Product", productSchema);
