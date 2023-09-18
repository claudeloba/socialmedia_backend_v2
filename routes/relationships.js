import express from "express";
import {
  getRelationships,
  addRelationship,
  deleteRelationship,
} from "../controllers/relationship.js";
import authenticate from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", authenticate, getRelationships);
router.post("/", authenticate, addRelationship);
router.delete("/", authenticate, deleteRelationship);

export default router;
