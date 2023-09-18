import express from "express";
import {
  getPosts,
  addPost,
  deletePost,
  editPost,
} from "../controllers/post.controller.js";
import authenticate from "../middleware/auth.middleware.js";

const router = express.Router();

router.get("/", authenticate, getPosts);
router.post("/", authenticate, addPost);
router.delete("/:id", authenticate, deletePost);
router.put("/:id", authenticate, editPost);

export default router;
