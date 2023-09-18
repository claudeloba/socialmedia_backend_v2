import mongoose from "mongoose";

export const RelationshipSchema = new mongoose.Schema({
  followerUserId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
  followedUserId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
});

const Relationship = mongoose.model("Relationship", RelationshipSchema);

export default Relationship;
