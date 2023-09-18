import db from "../config/db.js";
import asyncHandler from "express-async-handler";
import {
  getUserSchema,
  updateUserSchema,
} from "../validators/userValidator.js";

export const getAllUsers = asyncHandler(async (req, res) => {
  const q = "SELECT * FROM users";
  const data = await db.promise().query(q);
  return res.status(200).json(data[0]);
});

export const getUser = asyncHandler(async (req, res) => {
  const { error } = getUserSchema.validate(req.params);
  if (error) {
    console.log("Validation error:", error.details[0].message);
    return res.status(400).json(error.details[0].message);
  }

  const userId = req.params.userId;
  const q = "SELECT * FROM users WHERE id=?";
  const data = await db.promise().query(q, [userId]);
  const { password, ...info } = data[0][0];
  return res.json(info);
});

export const updateUser = asyncHandler(async (req, res) => {
  const userInfo = req.user;

  const { error } = updateUserSchema.validate(req.body);
  if (error) {
    console.log("Validation error:", error.details[0].message);
    return res.status(400).json(error.details[0].message);
  }

  const q =
    "UPDATE users SET `name`=?,`city`=?,`website`=?,`profilePic`=?,`coverPic`=? WHERE id=? ";

  db.query(
    q,
    [
      req.body.name,
      req.body.city,
      req.body.website,
      req.body.profilePic,
      req.body.coverPic,
      userInfo.id,
    ],
    (err, data) => {
      if (err) res.status(500).json(err);
      if (data.affectedRows > 0) return res.json("Updated succesfully");
      return res.status(403).json("You are not the owner of this profile.");
    }
  );
});
