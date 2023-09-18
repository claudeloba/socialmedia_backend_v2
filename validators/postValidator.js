import Joi from "joi";

export const addPostSchema = Joi.object({
  desc: Joi.string().max(255).required(),
  img: Joi.string().allow("").optional(),
  title: Joi.string().min(1).max(1000).required().allow(""),
  content: Joi.string().min(1).max(1000).required().allow(""),
});

export const updatePostSchema = Joi.object({
  desc: Joi.string().max(255).required(),
  img: Joi.string().allow("").optional(),
});

export const postIdSchema = Joi.object({
  id: Joi.number().integer().positive().required(),
});
