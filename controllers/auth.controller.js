import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { registerSchema, loginSchema } from "../validators/authValidator.js";
import dotenv from "dotenv";
import asyncHandler from "express-async-handler";
import User from "../models/User.model.js";

dotenv.config();
const jwtKey = process.env.JWT_KEY;

export const register = asyncHandler(async (req, res) => {
  const { error } = registerSchema.validate(req.body);
  if (error) {
    res.status(400);
    throw new Error(error.details[0].message);
  }

  const existingUser = await User.findOne({ username: req.body.username });
  if (existingUser) {
    res.status(409);
    throw new Error("User already exists!");
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(req.body.password, salt);

  const defaultProfilePic =
    "/depositphotos_133351928-stock-illustration-default-placeholder-man-and-woman.jpg";
  const defaultCoverPic = "/pexels-photo-1423600.jpeg";

  const newUser = new User({
    username: req.body.username,
    email: req.body.email,
    password: hashedPassword,
    name: req.body.name,
    profilePic: defaultProfilePic,
    coverPic: defaultCoverPic,
  });

  await newUser.save();

  res.status(200).json("User has been created.");
});

export const login = asyncHandler(async (req, res) => {
  const { error } = loginSchema.validate(req.body);
  if (error) {
    res.status(400);
    throw new Error(error.details[0].message);
  }

  const user = await User.findOne({ username: req.body.username });

  if (!user) {
    res.status(404);
    throw new Error("User not found!");
  }

  const checkPassword = await bcrypt.compare(req.body.password, user.password);

  if (!checkPassword) {
    res.status(400);
    throw new Error("Wrong password or username!");
  }

  const token = jwt.sign({ id: user._id }, jwtKey);

  res
    .cookie("accessToken", token, {
      httpOnly: true,
    })
    .status(200)
    .json(user);
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
