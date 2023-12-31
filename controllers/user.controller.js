import User from "../models/User.model.js";
import asyncHandler from "express-async-handler";
import {
  getUserSchema,
  updateUserSchema,
} from "../validators/userValidator.js";

export const getAllUsers = asyncHandler(async (req, res) => {
  try {
    const users = await User.find({});
    return res.status(200).json(users);
  } catch (err) {
    return res.status(500).json(err);
  }
});

export const getUser = asyncHandler(async (req, res) => {
  const { error } = getUserSchema.validate(req.params);
  if (error) {
    return res.status(400).json(error.details[0].message);
  }

  try {
    const user = await User.findById(req.params.userId);
    if (!user) return res.status(404).json("User not found");

    // eslint-disable-next-line no-unused-vars
    const { password, ...info } = user.toObject();
    return res.status(200).json(info);
  } catch (err) {
    return res.status(500).json(err);
  }
});

export const updateUser = asyncHandler(async (req, res) => {
  const { error } = updateUserSchema.validate(req.body);
  if (error) {
    return res.status(400).json(error.details[0].message);
  }

  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.user.id,
      {
        $set: {
          username: req.body.username,
          city: req.body.city,
          website: req.body.website,
          profilePic: req.body.profilePic,
          coverPic: req.body.coverPic,
        },
      },
      { new: true, runValidators: true },
    );
    if (!updatedUser) {
      return res.status(403).json("You are not the owner of this profile.");
    }

    return res.status(200).json("Updated successfully");
  } catch (err) {
    return res.status(500).json(err);
  }
});
