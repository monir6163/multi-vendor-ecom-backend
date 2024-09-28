import { Router } from "express";
import {
  createVendor,
  deleteVendor,
  getVendor,
  getVendors,
  updateVendor,
} from "../controllers/vendorController.js";
import { protect } from "../middlewares/authMiddleware.js";

const vendorRouter = Router();

vendorRouter.post("/create", protect, createVendor);
vendorRouter.get("/all", getVendors);
vendorRouter.get("/single/:slug", getVendor);
vendorRouter.put("/update/:id", protect, updateVendor);
vendorRouter.delete("/delete/:id", protect, deleteVendor);

export default vendorRouter;
