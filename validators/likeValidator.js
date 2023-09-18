import Joi from "joi";

export const getLikesSchema = Joi.object({
  postId: Joi.string().required(),
});

export const addLikeSchema = Joi.object({
  postId: Joi.string().required(),
});

export const deleteLikeSchema = Joi.object({
  postId: Joi.string().required(),
});
