import Joi from "joi";

export const getUserSchema = Joi.object({
  userId: Joi.number().integer().positive().required(),
});

export const updateUserSchema = Joi.object({
  name: Joi.string().min(1).max(45).required(),
  city: Joi.string().allow("").optional().allow(null),
  website: Joi.string().allow("").optional().allow(null),
  profilePic: Joi.string().allow("").optional(),
  coverPic: Joi.string().allow("").optional(),
  email: Joi.string().min(1).max(1000).required().allow(""),
});
