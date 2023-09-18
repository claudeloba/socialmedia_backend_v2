import express from "express";
import { getLikes, addLike, deleteLike } from "../controllers/like.js";
import authenticate from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", getLikes);
router.post("/", authenticate, addLike);
router.delete("/", authenticate, deleteLike);

export default router;
