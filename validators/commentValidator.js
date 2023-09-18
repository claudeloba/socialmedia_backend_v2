import Joi from "joi";

export const getCommentsSchema = Joi.object({
  postId: Joi.number().integer().positive().required(),
});

export const addCommentSchema = Joi.object({
  desc: Joi.string().min(1).max(1000).required().allow("").messages({
    "string.empty": "Comment cannot be empty",
  }),
  postId: Joi.number().integer().positive().required(),
  comment: Joi.string().min(1).max(1000).required().allow("").messages({
    "string.empty": "Comment cannot be empty",
  }),
});

export const deleteCommentSchema = Joi.object({
  id: Joi.number().integer().positive().required(),
});
