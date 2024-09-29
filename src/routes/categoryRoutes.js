import { Router } from "express";
import {
  createCategory,
  getCategories,
} from "../controllers/categoryController.js";
import { authorize, protect } from "../middlewares/authMiddleware.js";
import { upload } from "../middlewares/multer.middleware.js";

const categoryRouter = Router();

categoryRouter.post(
  "/create",
  protect,
  authorize("user"),
  upload.single("categoryImage"),
  createCategory
);

categoryRouter.get("/all", getCategories);

export default categoryRouter;
