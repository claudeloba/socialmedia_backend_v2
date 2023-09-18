import express from "express";
import {
  getComments,
  addComment,
  deleteComment,
} from "../controllers/comment.controller.js";
import { sanitizeAddComment } from "../middleware/sanitizeInputs.js";
import authenticate from "../middleware/auth.middleware.js";

const router = express.Router();

router.get("/", getComments);
router.post("/", authenticate, sanitizeAddComment, addComment);
router.delete("/:id", authenticate, deleteComment);

export default router;
