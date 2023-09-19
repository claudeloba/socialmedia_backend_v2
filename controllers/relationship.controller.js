import asyncHandler from "express-async-handler";
import {
  getRelationshipsSchema,
  addRelationshipSchema,
  deleteRelationshipSchema,
} from "../validators/relationshipValidator.js";
import Relationship from "../models/Relationship.model.js";

export const getRelationships = asyncHandler(async (req, res) => {
  const { error } = getRelationshipsSchema.validate(req.query);
  if (error) {
    return res.status(400).json(error.details[0].message);
  }

  const relationships = await Relationship.find({
    followedUserId: req.query.followedUserId,
  });
  res.status(200).json(relationships.map((r) => r.followerUserId));
});

export const addRelationship = asyncHandler(async (req, res) => {
  const userInfo = req.user;

  const { error } = addRelationshipSchema.validate(req.body);
  if (error) {
    return res.status(400).json(error.details[0].message);
  }

  const newRelationship = new Relationship({
    followerUserId: userInfo.id,
    followedUserId: req.body.userId,
  });
  await newRelationship.save();
  res.status(200).json("Following");
});

export const deleteRelationship = asyncHandler(async (req, res) => {
  const userInfo = req.user;

  const { error } = deleteRelationshipSchema.validate(req.query);
  if (error) {
    return res.status(400).json(error.details[0].message);
  }

  const result = await Relationship.findOneAndDelete({
    followerUserId: userInfo.id,
    followedUserId: req.query.userId,
  });

  if (!result) {
    return res.status(404).json("Relationship not found");
  }

  res.status(200).json("Unfollow");
});
