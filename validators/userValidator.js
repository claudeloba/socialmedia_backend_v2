import Joi from "joi";

export const getUserSchema = Joi.object({
  _id: Joi.string().optional(),
  userId: Joi.string().optional(),
});

export const updateUserSchema = Joi.object({
  username: Joi.string().min(1).max(45).optional(),
  city: Joi.string().allow("").optional().allow(null),
  website: Joi.string().allow("").optional().allow(null),
  profilePic: Joi.string().allow("").optional().allow(null),
  coverPic: Joi.string().allow("").optional().allow(null),
  email: Joi.string().min(1).max(1000).optional().allow(""),
});
