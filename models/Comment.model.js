import mongoose from "mongoose";

export const CommentSchema = new mongoose.Schema(
  {
    desc: {
      type: String,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    postId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Post",
    },
  },
  { timestamps: true },
);

const Comment = mongoose.model("Comment", CommentSchema);

export default Comment;
