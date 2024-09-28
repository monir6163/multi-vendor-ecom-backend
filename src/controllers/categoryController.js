import expressAsyncHandler from "express-async-handler";
import { appError } from "../middlewares/errorHandler.js";
import { Category } from "../models/categoryModel.js";
//@desc create a new category
//@route POST /api/v1/categories
//@access private/admin
export const createCategory = expressAsyncHandler(async (req, res) => {
  try {
    const category = await Category.create(req.body);

    res.status(201).json({
      success: true,
      data: category,
    });
  } catch (error) {
    throw new appError(error.message, 500);
  }
});
