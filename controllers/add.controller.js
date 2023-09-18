import asyncHandler from "express-async-handler";
import User from "../models/User.model.js";

export const getAllUsers = asyncHandler(async (req, res) => {
  try {
    const users = await User.find({});
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: "Error fetching users", error: error });
  }
});
