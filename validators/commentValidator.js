import Joi from "joi";

export const getCommentsSchema = Joi.object({
  postId: Joi.string().required(),
});

export const addCommentSchema = Joi.object({
  desc: Joi.string().min(1).max(1000).optional(),
  postId: Joi.string().required(),
  comment: Joi.string().min(1).max(1000).required().allow("").messages({
    "string.empty": "Comment cannot be empty",
  }),
});

export const deleteCommentSchema = Joi.object({
  _id: Joi.string().required(),
});
