import db from "../config/db.js";
import asyncHandler from "express-async-handler";

export const getAllUsers = asyncHandler(async (req, res) => {
  const q = "SELECT * FROM users";

  const [data] = await db.promise().query(q);
  res.status(200).json(data);
});
