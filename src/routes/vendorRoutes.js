import { Router } from "express";
import {
  createVendor,
  deleteVendor,
  getVendor,
  getVendors,
  updateVendor,
} from "../controllers/vendorController.js";
import { protect } from "../middlewares/authMiddleware.js";

const router = Router();

router.route("/create").post(protect, createVendor);
router.route("/all").get(getVendors);
router.route("/single/:slug").get(getVendor);
router.route("/update/:id").put(protect, updateVendor);
router.route("/delete/:id").delete(protect, deleteVendor);

export default router;
