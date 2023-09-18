import express from "express";
import {
  getUser,
  updateUser,
  getAllUsers,
} from "../controllers/user.controller.js";
import authenticate from "../middleware/auth.middleware.js";

const router = express.Router();

router.get("/find/:userId", getUser);
router.put("/", authenticate, updateUser);
router.get("/all", getAllUsers);

export default router;
