import { Router } from "express";
import {
  allUserProfiles,
  loginUser,
  registerUser,
  updateUserProfile,
  userProfile,
} from "../controllers/userController.js";
import { authorize, protect } from "../middlewares/authMiddleware.js";

const router = Router();

router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/profile").get(protect, userProfile);
router.route("/update/profile").put(protect, updateUserProfile);
router.route("/all/profile").get(protect, authorize("admin"), allUserProfiles);

export default router;
