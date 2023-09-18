import express from "express";
import { getAllUsers } from "../controllers/add.js";

const router = express.Router();

router.get("/", getAllUsers);

export default router;
