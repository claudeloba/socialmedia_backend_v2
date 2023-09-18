import express from "express";
import {
  getPosts,
  addPost,
  deletePost,
  editPost,
} from "../controllers/post.js";
import { sanitizeAddPost } from "../middleware/sanitizeInputs.js";
import authenticate from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", authenticate, getPosts);
router.post("/", authenticate, sanitizeAddPost, addPost);
router.delete("/:id", authenticate, deletePost);
router.put("/:id", authenticate, editPost);

export default router;
