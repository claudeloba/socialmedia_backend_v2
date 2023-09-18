import Joi from "joi";

export const getRelationshipsSchema = Joi.object({
  followedUserId: Joi.string().required(),
});

export const addRelationshipSchema = Joi.object({
  userId: Joi.string().required(),
});

export const deleteRelationshipSchema = Joi.object({
  userId: Joi.string().required(),
});
