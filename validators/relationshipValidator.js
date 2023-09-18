import Joi from "joi";

export const getRelationshipsSchema = Joi.object({
  followedUserId: Joi.number().integer().positive().required(),
});

export const addRelationshipSchema = Joi.object({
  userId: Joi.number().integer().positive().required(),
});

export const deleteRelationshipSchema = Joi.object({
  userId: Joi.number().integer().positive().required(),
});
