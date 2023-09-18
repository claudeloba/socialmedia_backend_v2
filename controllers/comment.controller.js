import asyncHandler from "express-async-handler";
import {
  getCommentsSchema,
  addCommentSchema,
  deleteCommentSchema,
} from "../validators/commentValidator.js";
import Comment from "../models/Comment.model.js";

export const getComments = asyncHandler(async (req, res) => {
  const { error } = getCommentsSchema.validate(req.query);
  if (error) {
    res.status(400);
    throw new Error(error.details[0].message);
  }

  const comments = await Comment.find({ postId: req.query.postId })
    .sort({ createdAt: "desc" })
    .populate({ path: "userId", select: "username profilePic" });

  res.status(200).json(comments);
});

export const addComment = asyncHandler(async (req, res) => {
  const userInfo = req.user;

  const newComment = new Comment({
    desc: req.body.desc,
    userId: userInfo.id,
    postId: req.body.postId,
  });

  await newComment.save();

  res.status(200).json("Comment has been created.");
});

export const deleteComment = asyncHandler(async (req, res) => {
  const { error } = deleteCommentSchema.validate(req.params);
  if (error) {
    res.status(400);
    throw new Error(error.details[0].message);
  }

  const userInfo = req.user;

  const result = await Comment.findOneAndDelete({
    _id: req.params.id,
    userId: userInfo.id,
  });

  if (result) {
    res.status(200).json("Comment has been deleted.");
  } else {
    res.status(403);
    throw new Error("You can delete only your comment!");
  }
});
