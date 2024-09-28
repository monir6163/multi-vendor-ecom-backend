import { Router } from "express";
import { createProduct } from "../controllers/productController.js";
import { authorize, protect } from "../middlewares/authMiddleware.js";

const productRouter = Router();

productRouter.post("/create", protect, authorize("vendor"), createProduct);

export default productRouter;
