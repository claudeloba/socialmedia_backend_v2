import mongoose from "mongoose";
import { CommentSchema } from "./Comment.model.js";
import { LikeSchema } from "./Like.model.js";

export const PostSchema = new mongoose.Schema(
  {
    title: {
      type: String,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    desc: {
      type: String,
      required: true,
    },
    content: {
      type: String,
    },
    img: {
      type: String,
    },
    comments: [CommentSchema],
    likes: [LikeSchema],
  },
  { timestamps: true }
);

const Post = mongoose.model("Post", PostSchema);

export default Post;
