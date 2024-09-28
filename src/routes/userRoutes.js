import { Router } from "express";
import {
  allUserProfiles,
  loginUser,
  registerUser,
  updateUserProfile,
  userProfile,
} from "../controllers/userController.js";
import { authorize, protect } from "../middlewares/authMiddleware.js";

const userRouter = Router();

userRouter.post("/register", registerUser);
userRouter.post("/login", loginUser);
userRouter.get("/profile", protect, userProfile);
userRouter.put("/update/profile", protect, updateUserProfile);
userRouter.get("/all/profile", protect, authorize("admin"), allUserProfiles);

export default userRouter;
