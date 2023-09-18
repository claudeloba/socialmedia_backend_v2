import express from "express";
import { login, register, logout } from "../controllers/auth.js";
import { sanitizeRegister } from "../middleware/sanitizeInputs.js";

const router = express.Router();

router.post("/login", login);
router.post("/register", sanitizeRegister, register);
router.post("/logout", logout);

export default router;
