import expressAsyncHandler from "express-async-handler";
import { appError } from "../middlewares/errorHandler.js";
import { Category } from "../models/categoryModel.js";
import { cloudinaryUpload } from "../utils/cloudinary.js";
//@desc create a new category
//@route POST /api/v1/categories
//@access private/admin
export const createCategory = expressAsyncHandler(async (req, res) => {
  try {
    const { name, description } = req.body;
    const catImgPath = req.file?.path;
    if (!catImgPath) {
      throw new appError("Category image is required", 400);
    }
    const catImg = await cloudinaryUpload(catImgPath, "ecom/category");
    if (!catImg) {
      throw new appError("Failed to upload image", 500);
    }

    const category = new Category({
      name,
      description,
      categoryImage: {
        public_id: catImg[0]?.public_id,
        url: catImg[0]?.secure_url,
      },
    });
    await category.save();
    res.status(201).json({
      success: true,
      data: category,
    });
  } catch (error) {
    throw new appError(error.message, 500);
  }
});

//@desc get all categories
//@route GET /api/v1/categories
//@access public
export const getCategories = expressAsyncHandler(async (_req, res) => {
  try {
    const categories = await Category.find();
    res.status(200).json({
      success: true,
      data: categories,
    });
  } catch (error) {
    throw new appError(error.message, 500);
  }
});
