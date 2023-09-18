import mongoose from "mongoose";
import { RelationshipSchema } from "./Relationship.model.js";
import { PostSchema } from "./Post.model.js";

const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    coverPic: String,
    profilePic: String,
    city: String,
    website: String,
    relationships: [RelationshipSchema],
    posts: [PostSchema],
  },
  { timestamps: true }
);

const User = mongoose.model("User", UserSchema);

export default User;
