import Post from "../models/Post.model.js";
import Relationship from "../models/Relationship.model.js";
import asyncHandler from "express-async-handler";
import {
  addPostSchema,
  postIdSchema,
  updatePostSchema,
} from "../validators/postValidator.js";

export const getPosts = asyncHandler(async (req, res) => {
  const userId = req.query.userId;
  const userInfo = req.user;

  try {
    let posts = [];
    if (userId !== "undefined") {
      posts = await Post.find({ userId: userId })
        .populate("userId", "username profilePic")
        .sort({ createdAt: -1 });
    } else {
      const relationships = await Relationship.find({
        followerUserId: userInfo.id,
      });
      const followedUserIds = relationships.map((rel) => rel.followedUserId);
      followedUserIds.push(userInfo.id);

      posts = await Post.find({ userId: { $in: followedUserIds } })
        .populate("userId", "username profilePic")
        .sort({ createdAt: -1 });
    }
    res.status(200).json(posts);
  } catch (error) {
    console.log("Error:", error);
    res.status(500).json(error);
  }
});

export const addPost = asyncHandler(async (req, res) => {
  const userInfo = req.user;
  console.log(req.user);

  const { error } = addPostSchema.validate(req.body);
  if (error) {
    console.log("Validation error:", error.details[0].message);
    return res.status(400).json(error.details[0].message);
  }

  const newPost = new Post({
    desc: req.body.desc,
    img: req.body.img,
    userId: userInfo.id,
  });

  await newPost.save();
  res.status(200).json("Post has been created.");
});

export const deletePost = asyncHandler(async (req, res) => {
  const userInfo = req.user;

  const { error } = postIdSchema.validate(req.params);
  if (error) {
    console.log("Validation error:", error.details[0].message);
    return res.status(400).json(error.details[0].message);
  }

  const post = await Post.findOne({ _id: req.params.id, userId: userInfo.id });
  if (!post) {
    return res.status(403).json("You are not the owner of this post.");
  }

  await Post.findByIdAndDelete(req.params.id);
  res.status(200).json("Post has been deleted.");
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

  const post = await Post.findOneAndUpdate(
    { _id: req.params.id, userId: userInfo.id },
    { desc: req.body.desc },
    { new: true }
  );

  if (!post) {
    return res.status(403).json("You are not the owner of this post.");
  }

  res.status(200).json("Post has been updated.");
});
