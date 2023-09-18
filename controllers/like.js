import db from "../config/db.js";
import asyncHandler from "express-async-handler";
import {
  getLikesSchema,
  addLikeSchema,
  deleteLikeSchema,
} from "../validators/likeValidator.js";

export const getLikes = asyncHandler(async (req, res) => {
  const { error } = getLikesSchema.validate(req.query);
  if (error) {
    res.status(400);
    throw new Error(error.details[0].message);
  }

  const q = "SELECT userId FROM likes WHERE postId = ?";

  const [rows] = await db.promise().query(q, [req.query.postId]);

  res.status(200).json(rows.map((like) => like.userId));
});

export const addLike = asyncHandler(async (req, res) => {
  const { error } = addLikeSchema.validate(req.body);
  if (error) {
    res.status(400);
    throw new Error(error.details[0].message);
  }

  const userInfo = req.user;

  const q = "INSERT INTO likes (`userId`,`postId`) VALUES (?)";
  const values = [userInfo.id, req.body.postId];

  await db.promise().query(q, [values]);

  res.status(200).json("Post has been liked.");
});

export const deleteLike = asyncHandler(async (req, res) => {
  const { error } = deleteLikeSchema.validate(req.query);
  if (error) {
    res.status(400);
    throw new Error(error.details[0].message);
  }

  const userInfo = req.user;

  const q = "DELETE FROM likes WHERE `userId` = ? AND `postId` = ?";

  await db.promise().query(q, [userInfo.id, req.query.postId]);

  res.status(200).json("Post has been disliked.");
});
