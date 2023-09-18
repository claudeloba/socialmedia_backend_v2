import db from "../config/db.js";
import moment from "moment";
import {
  addPostSchema,
  postIdSchema,
  updatePostSchema,
} from "../validators/postValidator.js";
import asyncHandler from "express-async-handler";

export const getPosts = asyncHandler(async (req, res) => {
  const userId = req.query.userId;
  const userInfo = req.user;

  const q =
    userId !== "undefined"
      ? `SELECT p.*, u.id AS userId, name, profilePic FROM posts AS p JOIN users AS u ON (u.id = p.userId) WHERE p.userId = ? ORDER BY p.createdAt DESC`
      : `SELECT DISTINCT p.*, u.id AS userId, name, profilePic FROM posts AS p JOIN users AS u ON (u.id = p.userId)
LEFT JOIN relationships AS r ON (p.userId = r.followedUserId) WHERE r.followerUserId= ? OR p.userId =?
ORDER BY p.createdAt DESC`;

  const values = userId !== "undefined" ? [userId] : [userInfo.id, userInfo.id];

  const [data] = await db.promise().query(q, values);
  res.status(200).json(data);
});

export const addPost = asyncHandler(async (req, res) => {
  const userInfo = req.user;

  const { error } = addPostSchema.validate(req.body);
  if (error) {
    console.log("Validation error:", error.details[0].message);
    return res.status(400).json(error.details[0].message);
  }

  const q =
    "INSERT INTO posts(`desc`, `img`, `createdAt`, `userId`) VALUES (?)";
  const values = [
    req.body.desc,
    req.body.img,
    moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
    userInfo.id,
  ];

  await db.promise().query(q, [values]);
  res.status(200).json("Post has been created.");
});

export const deletePost = asyncHandler(async (req, res) => {
  const userInfo = req.user;

  const { error } = postIdSchema.validate(req.params);
  if (error) {
    console.log("Validation error:", error.details[0].message);
    return res.status(400).json(error.details[0].message);
  }

  const post = await db
    .promise()
    .query("SELECT * FROM posts WHERE `id`=? AND `userId` = ?", [
      req.params.id,
      userInfo.id,
    ]);
  if (post[0].length === 0) {
    return res.status(403).json("You are not the owner of this post");
  }

  await db
    .promise()
    .query("DELETE FROM posts WHERE `id`=? AND `userId` = ?", [
      req.params.id,
      userInfo.id,
    ]);
  return res.status(200).json("Post has been deleted.");
});

export const editPost = asyncHandler(async (req, res) => {
  const userInfo = req.user;

  const { error } = postIdSchema.validate(req.params);
  if (error) {
    console.log("Validation error:", error.details[0].message);
    return res.status(400).json(error.details[0].message);
  }

  const { error: validationError } = updatePostSchema.validate(req.body);
  if (validationError) {
    console.log("Validation error:", validationError.details[0].message);
    return res.status(400).json(validationError.details[0].message);
  }

  const post = await db
    .promise()
    .query("SELECT * FROM posts WHERE `id`=? AND `userId`=?", [
      req.params.id,
      userInfo.id,
    ]);
  if (post[0].length === 0) {
    return res.status(403).json("You are not the owner of this post");
  }

  await db
    .promise()
    .query("UPDATE posts SET `desc`=? WHERE `id`=? AND `userId`=?", [
      req.body.desc,
      req.params.id,
      userInfo.id,
    ]);
  return res.status(200).json("Post has been updated.");
});
