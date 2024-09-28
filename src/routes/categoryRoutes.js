import { Router } from "express";
import { createCategory } from "../controllers/categoryController.js";
import { authorize, protect } from "../middlewares/authMiddleware.js";

const categoryRouter = Router();

categoryRouter.post("/create", protect, authorize("user"), createCategory);

export default categoryRouter;
