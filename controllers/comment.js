import db from "../config/db.js";
import moment from "moment";
import asyncHandler from "express-async-handler";
import {
  getCommentsSchema,
  addCommentSchema,
  deleteCommentSchema,
} from "../validators/commentValidator.js";

export const getComments = asyncHandler(async (req, res) => {
  const { error } = getCommentsSchema.validate(req.query);
  if (error) {
    res.status(400);
    throw new Error(error.details[0].message);
  }

  const q = `SELECT c.*, u.id AS userId, name, profilePic FROM comments AS c JOIN users AS u ON (u.id = c.userId)
    WHERE c.postId = ? ORDER BY c.createdAt DESC
    `;

  const [rows] = await db.promise().query(q, [req.query.postId]);

  res.status(200).json(rows);
});

export const addComment = asyncHandler(async (req, res) => {
  const { error } = addCommentSchema.validate(req.body);
  if (error) {
    res.status(400);
    throw new Error(error.details[0].message);
  }

  const userInfo = req.user;

  const q =
    "INSERT INTO comments(`desc`, `createdAt`, `userId`, `postId`) VALUES (?)";
  const values = [
    req.body.desc,
    moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
    userInfo.id,
    req.body.postId,
  ];

  await db.promise().query(q, [values]);

  res.status(200).json("Comment has been created.");
});

export const deleteComment = asyncHandler(async (req, res) => {
  const { error } = deleteCommentSchema.validate(req.params);
  if (error) {
    res.status(400);
    throw new Error(error.details[0].message);
  }

  const userInfo = req.user;

  const commentId = req.params.id;
  const q = "DELETE FROM comments WHERE `id` = ? AND `userId` = ?";

  const [result] = await db.promise().query(q, [commentId, userInfo.id]);

  if (result.affectedRows > 0) {
    res.json("Comment has been deleted!");
  } else {
    res.status(403);
    throw new Error("You can delete only your comment!");
  }
});
