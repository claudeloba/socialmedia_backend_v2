import express from "express";
import { getAllUsers } from "../controllers/add.controller.js";

const router = express.Router();

router.get("/", getAllUsers);

export default router;
