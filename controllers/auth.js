import db from "../config/db.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { registerSchema, loginSchema } from "../validators/authValidator.js";
import dotenv from "dotenv";
import asyncHandler from "express-async-handler";

dotenv.config();

const jwtKey = process.env.JWT_KEY;

export const register = asyncHandler(async (req, res) => {
  const { error } = registerSchema.validate(req.body);
  if (error) {
    res.status(400);
    throw new Error(error.details[0].message);
  }

  const q = "SELECT * FROM users WHERE username = ?";
  const [rows] = await db.promise().query(q, [req.body.username]);

  if (rows.length) {
    res.status(409);
    throw new Error("User already exists!");
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(req.body.password, salt);

  const insertQuery =
    "INSERT INTO users (`username`, `email`, `password`, `name`, `profilePic`, `coverPic`) VALUES (?, ?, ?, ?, ?, ?)";

  const defaultProfilePic =
    "/depositphotos_133351928-stock-illustration-default-placeholder-man-and-woman.jpg";
  const defaultCoverPic = "/pexels-photo-1423600.jpeg";

  const values = [
    req.body.username,
    req.body.email,
    hashedPassword,
    req.body.name,
    defaultProfilePic,
    defaultCoverPic,
  ];

  await db.promise().query(insertQuery, values);

  res.status(200).json("User has been created.");
});

export const login = asyncHandler(async (req, res) => {
  const { error } = loginSchema.validate(req.body);
  if (error) {
    res.status(400);
    throw new Error(
      `Password must be at least 6 characters long: ${error.details[0].message}`
    );
  }

  const q = "SELECT * FROM users WHERE username = ?";
  const [rows] = await db.promise().query(q, [req.body.username]);

  if (!rows.length) {
    res.status(404);
    throw new Error("User not found!");
  }

  const checkPassword = await bcrypt.compare(
    req.body.password,
    rows[0].password
  );

  if (!checkPassword) {
    res.status(400);
    throw new Error("Wrong password or username!");
  }

  const token = jwt.sign({ id: rows[0].id }, jwtKey);

  const { password, ...others } = rows[0];

  res
    .cookie("accessToken", token, {
      httpOnly: true,
    })
    .status(200)
    .json(others);
});

export const logout = asyncHandler(async (req, res) => {
  res
    .clearCookie("accessToken", {
      secure: true,
      sameSite: "none",
    })
    .status(200)
    .json("User has been logged out.");
});
