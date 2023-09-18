import db from "../config/db.js";
import asyncHandler from "express-async-handler";
import {
  getRelationshipsSchema,
  addRelationshipSchema,
  deleteRelationshipSchema,
} from "../validators/relationshipValidator.js";

export const getRelationships = asyncHandler(async (req, res) => {
  const { error } = getRelationshipsSchema.validate(req.query);
  if (error) {
    console.log("Validation error:", error.details[0].message);
    return res.status(400).json(error.details[0].message);
  }

  const q = "SELECT followerUserId FROM relationships WHERE followedUserId = ?";

  db.query(q, [req.query.followedUserId], (err, data) => {
    if (err) return res.status(500).json(err);
    return res
      .status(200)
      .json(data.map((relationship) => relationship.followerUserId));
  });
});

export const addRelationship = asyncHandler(async (req, res) => {
  const userInfo = req.user;

  const { error } = addRelationshipSchema.validate(req.body);
  if (error) {
    console.log("Validation error:", error.details[0].message);
    return res.status(400).json(error.details[0].message);
  }

  const q =
    "INSERT INTO relationships (`followerUserId`,`followedUserId`) VALUES (?)";
  const values = [userInfo.id, req.body.userId];

  db.query(q, [values], (err, data) => {
    if (err) return res.status(500).json(err);
    return res.status(200).json("Following");
  });
});

export const deleteRelationship = asyncHandler(async (req, res) => {
  const userInfo = req.user;

  const { error } = deleteRelationshipSchema.validate(req.query);
  if (error) {
    console.log("Validation error:", error.details[0].message);
    return res.status(400).json(error.details[0].message);
  }

  const q =
    "DELETE FROM relationships WHERE `followerUserId` = ? AND `followedUserId` = ?";

  db.query(q, [userInfo.id, req.query.userId], (err, data) => {
    if (err) return res.status(500).json(err);
    return res.status(200).json("Unfollow");
  });
});
