import mongoose from "mongoose";

export const LikeSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
});

const Like = mongoose.model("Like", LikeSchema);

export default Like;
