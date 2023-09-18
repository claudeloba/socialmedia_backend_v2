import express from "express";
import {
  getLikes,
  addLike,
  deleteLike,
} from "../controllers/like.controller.js";
import authenticate from "../middleware/auth.middleware.js";

const router = express.Router();

router.get("/", getLikes);
router.post("/", authenticate, addLike);
router.delete("/", authenticate, deleteLike);

export default router;
