import Joi from "joi";

export const addPostSchema = Joi.object({
  desc: Joi.string().max(255).required(),
  img: Joi.string().allow("").optional(),
  title: Joi.string().min(1).max(1000).optional().allow(""),
  content: Joi.string().min(1).max(1000).optional().allow(""),
});

export const updatePostSchema = Joi.object({
  desc: Joi.string().max(255).required(),
  img: Joi.string().allow("").optional(),
});

export const postIdSchema = Joi.object({
  id: Joi.string().required(),
});
