import asyncHandler from "express-async-handler";
import {
  getLikesSchema,
  deleteLikeSchema,
} from "../validators/likeValidator.js";
import Post from "../models/Post.model.js";

export const getLikes = asyncHandler(async (req, res) => {
  const { error } = getLikesSchema.validate(req.query);
  if (error) {
    res.status(400);
    throw new Error(error.details[0].message);
  }
  const post = await Post.findById(req.query.postId).select("likes");

  const userIds = post.likes.map((like) => like.userId);

  res.status(200).json(userIds);
});

export const addLike = asyncHandler(async (req, res) => {
  const userInfo = req.user;

  await Post.updateOne(
    { _id: req.body.postId },
    { $push: { likes: { userId: userInfo.id } } },
  );

  res.status(200).json("Post has been liked.");
});

export const deleteLike = asyncHandler(async (req, res) => {
  const { error } = deleteLikeSchema.validate(req.query);
  if (error) {
    res.status(400);
    throw new Error(error.details[0].message);
  }

  const userInfo = req.user;

  await Post.updateOne(
    { _id: req.query.postId },
    { $pull: { likes: { userId: userInfo.id } } },
  );

  res.status(200).json("Post has been disliked.");
});
