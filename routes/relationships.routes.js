import express from "express";
import {
  getRelationships,
  addRelationship,
  deleteRelationship,
} from "../controllers/relationship.controller.js";
import authenticate from "../middleware/auth.middleware.js";

const router = express.Router();

router.get("/", authenticate, getRelationships);
router.post("/", authenticate, addRelationship);
router.delete("/", authenticate, deleteRelationship);

export default router;
