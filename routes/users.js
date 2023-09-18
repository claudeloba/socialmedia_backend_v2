import express from "express";
import { getUser, updateUser, getAllUsers } from "../controllers/user.js";
import authenticate from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/find/:userId", getUser);
router.put("/", authenticate, updateUser);
router.get("/all", getAllUsers);

export default router;
