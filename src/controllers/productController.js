import expressAsyncHandler from "express-async-handler";
import { appError } from "../middlewares/errorHandler.js";
import { Product } from "../models/productModel.js";
//@desc create a new product
//@route POST /api/v1/products/create
//@access Private
export const createProduct = expressAsyncHandler(async (req, res) => {
  try {
    //validation in future
    const product = await Product.create(req.body);
    return res.status(201).json({
      success: true,
      message: "Product created successfully",
      data: product,
    });
  } catch (error) {
    throw new appError(error.message, 500);
  }
});

//@desc get all products
//@route GET /api/v1/products
//@access Public
export const getProducts = expressAsyncHandler(async (req, res) => {
  try {
    const products = await Product.find()
      .populate({ path: "vendor", select: "storeName storeSlug" })
      .exec();
    return res.status(200).json({
      success: true,
      message: "All products",
      data: products,
    });
  } catch (error) {
    throw new appError(error.message, 500);
  }
});
